"use server";

import { headers } from "next/headers";
import {
  validate,
  reservationSchema,
  type ActionResult,
} from "@/lib/actions/validation";
import { rateLimit, getClientKey } from "@/lib/actions/rateLimit";
import { logSubmission } from "@/lib/actions/mockEmail";

type Reservation = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  occasion?: string;
  requests?: string;
};

export async function makeReservation(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const h = await headers();
  const limit = rateLimit(`reservation:${getClientKey(h)}`, 5, 60_000);
  if (!limit.ok) {
    return { status: "error", message: `Too many attempts. Try again in ${limit.retryAfter}s.` };
  }

  const raw = Object.fromEntries(formData.entries());
  const result = validate<Reservation>(raw, reservationSchema);
  if (!result.ok) return { status: "error", errors: result.errors };

  const confirmation = `LUM-${Date.now().toString(36).toUpperCase()}`;
  await logSubmission("reservation", { confirmation, ...result.data });

  return {
    status: "success",
    message: `Reservation confirmed for ${result.data.name}. Confirmation #${confirmation} — emailed shortly.`,
  };
}
