-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query → paste → Run).
-- Creates the subscriptions table used by /api/subscribe, /api/cron/charge,
-- /api/portone/webhook, and the /api/encourage rate-limit gate.

create table if not exists public.subscriptions (
  user_id              uuid primary key references auth.users(id) on delete cascade,
  billing_key          text not null,
  status               text not null check (status in ('active','canceling','cancelled','past_due')),
  current_period_start timestamptz not null,
  current_period_end   timestamptz not null,
  next_billing_date    date not null,
  last_payment_id      text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

drop policy if exists "users read own subscription" on public.subscriptions;
create policy "users read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create index if not exists subscriptions_next_billing_date_idx
  on public.subscriptions (next_billing_date)
  where status = 'active';
