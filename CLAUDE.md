# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # run eslint
```

## Stack

- **Next.js 16.2.4** with App Router (`src/app/`) — see `node_modules/next/dist/docs/` for current API
- **React 19**, **TypeScript**, **Tailwind CSS v4** (PostCSS plugin, no config file needed)
- **`@anthropic-ai/sdk` ^0.92.0** for Claude API calls
- **Supabase** (`@supabase/supabase-js` + `@supabase/ssr`) for auth and database

## Environment Variables

```
ANTHROPIC_API_KEY          # Anthropic SDK picks up automatically
NEXT_PUBLIC_SUPABASE_URL   # public, used in both browser and server clients
NEXT_PUBLIC_SUPABASE_ANON_KEY  # public anon key
SUPABASE_SERVICE_ROLE_KEY  # secret, server-only; used only in /api/account for admin.deleteUser()
```

## Architecture

Korean encouragement web app. Users must be logged in (middleware enforces this). All history is stored in Supabase with RLS (`auth.uid() = user_id`).

**Auth flow:**
- `src/middleware.ts` — runs on every request; calls `supabase.auth.getUser()` (network call) to refresh session cookies and redirects unauthenticated users to `/login`. API routes are excluded from redirect.
- `src/app/login/page.tsx` + `src/components/AuthForm.tsx` — email/password login and signup (no email verification required)

**Supabase clients:**
- `src/lib/supabase-browser.ts` — `createBrowserClient` for `"use client"` components
- `src/lib/supabase-server.ts` — async `createClient()` using `await cookies()` for server components and API routes

**Pages and components:**
- `src/app/page.tsx` — main page; renders `<EncouragementApp />`
- `src/components/EncouragementApp.tsx` — textarea input, card display above button with CSS grid height animation (`grid-rows-[0fr]→[1fr]`), loading spinner
- `src/app/history/page.tsx` + `src/components/HistoryList.tsx` — history list with edit/delete; edit navigates to `/?editId=&situation=&message=`
- `src/app/profile/page.tsx` — shows email, message count, password change (`PasswordChangeForm`), and account deletion (`DeleteAccountButton`)
- `src/components/Header.tsx` — server component; uses `getSession()` (local cookie read, no network) for display only since middleware already handles auth security
- `src/components/ProfileDropdown.tsx` — avatar button (border-only circle with email initial), dropdown with email, 프로필 link, and logout

**API routes:**
- `POST /api/encourage` — calls Anthropic `client.messages.create` with Korean system prompt; returns `{ message }`
- `GET /api/history` — returns user's history entries from Supabase
- `POST /api/history` — inserts new entry with `user_id`
- `PUT /api/history/[id]` — updates entry (RLS ensures ownership)
- `DELETE /api/history/[id]` — deletes entry (RLS ensures ownership)
- `DELETE /api/account` — deletes auth user via admin client with service role key

**History client:** `src/lib/history.ts` — thin fetch wrappers (`getHistory`, `addEntry`, `updateEntry`, `deleteEntry`) used by client components.

**CSS:** `src/app/globals.css` — Tailwind import + `@keyframes` for `.animate-fade-in` and `.animate-fade-up` (used on cards and history list items) and `.animate-scale-in` (used on dropdown and delete modal).
