export type FieldError = { field: string; message: string };
export type ValidationResult<T> = { ok: true; data: T } | { ok: false; errors: FieldError[] };

type Rule =
  | { type: "string"; min?: number; max?: number; pattern?: RegExp; required?: boolean }
  | { type: "email"; required?: boolean }
  | { type: "phone"; required?: boolean }
  | { type: "number"; min?: number; max?: number; required?: boolean }
  | { type: "enum"; values: readonly string[]; required?: boolean }
  | { type: "date"; required?: boolean; futureOnly?: boolean }
  | { type: "boolean"; required?: boolean };

export type Schema = Record<string, Rule>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,20}$/;

export function validate<T extends Record<string, unknown>>(input: Record<string, unknown>, schema: Schema): ValidationResult<T> {
  const errors: FieldError[] = [];
  const data: Record<string, unknown> = {};

  for (const [field, rule] of Object.entries(schema)) {
    const raw = input[field];
    const isEmpty = raw === undefined || raw === null || raw === "";

    if (isEmpty) {
      if ("required" in rule && rule.required) errors.push({ field, message: `${field} is required` });
      continue;
    }

    switch (rule.type) {
      case "string": {
        const v = String(raw).trim();
        if (rule.min !== undefined && v.length < rule.min) errors.push({ field, message: `Must be at least ${rule.min} characters` });
        else if (rule.max !== undefined && v.length > rule.max) errors.push({ field, message: `Must be at most ${rule.max} characters` });
        else if (rule.pattern && !rule.pattern.test(v)) errors.push({ field, message: `Invalid format` });
        else data[field] = v;
        break;
      }
      case "email": {
        const v = String(raw).trim().toLowerCase();
        if (!EMAIL_RE.test(v)) errors.push({ field, message: "Invalid email address" });
        else data[field] = v;
        break;
      }
      case "phone": {
        const v = String(raw).trim();
        if (!PHONE_RE.test(v)) errors.push({ field, message: "Invalid phone number" });
        else data[field] = v;
        break;
      }
      case "number": {
        const n = Number(raw);
        if (Number.isNaN(n)) errors.push({ field, message: "Must be a number" });
        else if (rule.min !== undefined && n < rule.min) errors.push({ field, message: `Must be at least ${rule.min}` });
        else if (rule.max !== undefined && n > rule.max) errors.push({ field, message: `Must be at most ${rule.max}` });
        else data[field] = n;
        break;
      }
      case "enum": {
        const v = String(raw);
        if (!rule.values.includes(v)) errors.push({ field, message: `Must be one of: ${rule.values.join(", ")}` });
        else data[field] = v;
        break;
      }
      case "date": {
        const v = String(raw);
        const d = new Date(v);
        if (Number.isNaN(d.getTime())) errors.push({ field, message: "Invalid date" });
        else if (rule.futureOnly) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (d < today) errors.push({ field, message: "Date must be in the future" });
          else data[field] = v;
        } else data[field] = v;
        break;
      }
      case "boolean": {
        data[field] = raw === true || raw === "true" || raw === "on";
        break;
      }
    }
  }

  if (errors.length) return { ok: false, errors };
  return { ok: true, data: data as T };
}

// Reusable schemas

export const contactSchema: Schema = {
  name: { type: "string", required: true, min: 2, max: 80 },
  email: { type: "email", required: true },
  subject: { type: "string", min: 2, max: 120 },
  message: { type: "string", required: true, min: 10, max: 4000 },
};

export const newsletterSchema: Schema = {
  email: { type: "email", required: true },
};

export const reservationSchema: Schema = {
  name: { type: "string", required: true, min: 2, max: 80 },
  email: { type: "email", required: true },
  phone: { type: "phone", required: true },
  date: { type: "date", required: true, futureOnly: true },
  time: { type: "string", required: true, min: 4, max: 8 },
  partySize: { type: "number", required: true, min: 1, max: 12 },
  occasion: { type: "string", max: 80 },
  requests: { type: "string", max: 1000 },
};

export const bookingSchema: Schema = {
  name: { type: "string", required: true, min: 2, max: 80 },
  email: { type: "email", required: true },
  phone: { type: "phone", required: true },
  pickup: { type: "string", required: true, min: 2, max: 200 },
  destination: { type: "string", required: true, min: 2, max: 200 },
  date: { type: "date", required: true, futureOnly: true },
  time: { type: "string", required: true },
  vehicle: { type: "string", max: 80 },
  passengers: { type: "number", min: 1, max: 12 },
  notes: { type: "string", max: 1000 },
};

export const checkoutSchema: Schema = {
  name: { type: "string", required: true, min: 2, max: 80 },
  email: { type: "email", required: true },
  address: { type: "string", required: true, min: 5, max: 200 },
  city: { type: "string", required: true, min: 2, max: 80 },
  postcode: { type: "string", required: true, min: 3, max: 12 },
  country: { type: "string", required: true, min: 2, max: 80 },
};

export type ActionResult<T = void> =
  | { status: "idle" }
  | { status: "success"; data?: T; message?: string }
  | { status: "error"; errors?: FieldError[]; message?: string };
