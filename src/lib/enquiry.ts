import { z } from "zod";

export const interestOptions = [
  { value: "business-software", label: "Business Software" },
  { value: "crm", label: "CRM and Customer Management" },
  { value: "web-development", label: "Website and Application Development" },
  { value: "automation-ai", label: "Automation and AI" },
  { value: "other", label: "Other" },
] as const;

export type InterestValue = (typeof interestOptions)[number]["value"];

const interestValues = interestOptions.map((o) => o.value) as [InterestValue, ...InterestValue[]];

export const isInterest = (v: unknown): v is InterestValue =>
  typeof v === "string" && (interestValues as string[]).includes(v);

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name" })
    .max(100, { message: "Name must be under 100 characters" }),
  businessName: z
    .string()
    .trim()
    .max(120, { message: "Business name must be under 120 characters" })
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Enter a valid email address" })
    .max(255),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Please enter your phone number" })
    .regex(/^\+?[0-9\s-]{7,20}$/, { message: "Enter a valid phone number" }),
  interest: z.enum(interestValues, {
    errorMap: () => ({ message: "Choose an area of interest" }),
  }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Tell us a little more (at least 10 characters)" })
    .max(1500, { message: "Message must be under 1500 characters" }),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export const interestLabel = (v: InterestValue) =>
  interestOptions.find((o) => o.value === v)?.label ?? v;

/** Plain-text version of an enquiry, used for WhatsApp hand-off and copying. */
export function formatEnquiry(e: Enquiry): string {
  return [
    `New enquiry for A2ZBOS`,
    `Name: ${e.name}`,
    e.businessName ? `Business: ${e.businessName}` : null,
    `Email: ${e.email}`,
    `Phone: ${e.phone}`,
    `Interest: ${interestLabel(e.interest)}`,
    ``,
    e.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export type SubmitResult = { status: "sent" } | { status: "not_configured" };

/**
 * Delivery for the contact form.
 *
 * NOT CONNECTED YET: no backend is configured, so nothing is sent or stored and
 * the form tells the visitor so. To make it live, replace the body of this
 * function with a call to a real destination (e.g. stored submissions with
 * email notification), then return { status: "sent" } on success.
 */
export async function submitEnquiry(_enquiry: Enquiry): Promise<SubmitResult> {
  return { status: "not_configured" };
}

export const ENQUIRY_DELIVERY_CONNECTED = false;
