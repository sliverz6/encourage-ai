export const PRO_AMOUNT = 1900;
export const PRO_ORDER_NAME = "Encourage AI 월간 구독";

export function nextBillingDateFrom(date: Date): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + 1);
  return next;
}

export function todayKstStartUtc(): Date {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const y = kst.getUTCFullYear();
  const m = kst.getUTCMonth();
  const d = kst.getUTCDate();
  return new Date(Date.UTC(y, m, d) - 9 * 60 * 60 * 1000);
}

export function todayKstISO(): string {
  const start = todayKstStartUtc();
  const kst = new Date(start.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export type PortOneChargeResult = {
  payment?: { id?: string; status?: string; amount?: { total?: number }; currency?: string };
};

export async function chargeWithBillingKey(args: {
  paymentId: string;
  billingKey: string;
  userId: string;
  userEmail: string;
}): Promise<PortOneChargeResult> {
  const res = await fetch(
    `https://api.portone.io/payments/${encodeURIComponent(args.paymentId)}/billing-key`,
    {
      method: "POST",
      headers: {
        Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        billingKey: args.billingKey,
        orderName: PRO_ORDER_NAME,
        customer: { id: args.userId, email: args.userEmail },
        amount: { total: PRO_AMOUNT },
        currency: "KRW",
      }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PortOne charge failed (${res.status}): ${text}`);
  }
  return res.json();
}
