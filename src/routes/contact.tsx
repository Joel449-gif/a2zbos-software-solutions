import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Check, Copy, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/site/ArrowLink";
import { Reveal } from "@/components/site/Reveal";
import { Container, PageHero } from "@/components/site/Section";
import { isPlaceholder, site, whatsappConfigured, whatsappLink } from "@/config/site";
import {
  ENQUIRY_DELIVERY_CONNECTED,
  enquirySchema,
  formatEnquiry,
  interestOptions,
  isInterest,
  submitEnquiry,
  type Enquiry,
  type InterestValue,
} from "@/lib/enquiry";
import { cn } from "@/lib/utils";

interface ContactSearch {
  interest?: InterestValue;
  product?: string;
}

const TITLE = "Contact A2ZBOS — Talk to our team";
const DESCRIPTION =
  "Tell A2ZBOS about your business. Enquire about business software, CRM, websites and applications, or automation and AI.";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    interest: isInterest(search.interest) ? search.interest : undefined,
    product:
      typeof search.product === "string" && search.product.length <= 60 ? search.product : undefined,
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const fieldBase =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-[0.95rem] text-foreground transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 hover:border-foreground/30 focus:border-foreground focus:outline-none focus:ring-4 focus:ring-foreground/[0.06] aria-[invalid=true]:border-destructive";

function Field({
  label,
  optional,
  error,
  children,
  htmlFor,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  htmlFor: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-sm font-medium">
        {label}
        {optional ? <span className="text-xs font-normal text-muted-foreground">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ContactPage() {
  const search = Route.useSearch();
  const id = useId();
  const [outcome, setOutcome] = useState<{ enquiry: Enquiry; sent: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      interest: search.interest,
      message: search.product ? `I'd like to know more about ${search.product}.` : "",
    },
  });

  const onSubmit = async (values: Enquiry) => {
    const result = await submitEnquiry(values);
    setOutcome({ enquiry: values, sent: result.status === "sent" });
  };

  const describedBy = (name: keyof Enquiry) => (errors[name] ? `${id}-${name}-error` : undefined);

  const copyEnquiry = async () => {
    if (!outcome) return;
    try {
      await navigator.clipboard.writeText(formatEnquiry(outcome.enquiry));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const contactRows = [
    { icon: Mail, label: "Email", value: site.contact.email },
    { icon: Phone, label: "Phone", value: site.contact.phone },
    { icon: MapPin, label: "Office", value: site.contact.address },
  ];

  const waGeneral = whatsappLink("Hello A2ZBOS, I'd like to know more about your solutions.");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's talk about <span className="font-accent text-signal">your business.</span>
          </>
        }
        lede="Share a few details and what you're looking for. There's no obligation — just a conversation about what could help."
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          {/* FORM */}
          <Reveal className="lg:col-span-7">
            <div className="rounded-xl border bg-card p-6 shadow-soft sm:p-10">
              {outcome ? (
                <div role="status" aria-live="polite">
                  {outcome.sent ? (
                    <>
                      <span className="flex size-12 items-center justify-center rounded-full bg-signal">
                        <Check className="size-6 text-signal-foreground" />
                      </span>
                      <h2 className="text-title mt-6">Thank you, {outcome.enquiry.name.split(" ")[0]}.</h2>
                      <p className="mt-3 text-muted-foreground">Your enquiry has been received.</p>
                    </>
                  ) : (
                    <>
                      <span className="flex size-12 items-center justify-center rounded-full bg-area-business/25">
                        <AlertTriangle className="size-6" />
                      </span>
                      <h2 className="text-title mt-6">Your enquiry wasn't sent.</h2>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        Online enquiries aren't connected yet, so nothing was delivered. Please send your details
                        another way — your message is ready to copy below.
                      </p>
                      <pre className="mt-6 max-h-56 overflow-auto rounded-md border bg-secondary p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                        {formatEnquiry(outcome.enquiry)}
                      </pre>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button type="button" variant="ink" size="xl" onClick={copyEnquiry}>
                          {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy enquiry"}
                        </Button>
                        {whatsappLink(formatEnquiry(outcome.enquiry)) ? (
                          <Button asChild variant="line" size="xl">
                            <a href={whatsappLink(formatEnquiry(outcome.enquiry)) ?? undefined} target="_blank" rel="noopener noreferrer">
                              <MessageCircle /> Send on WhatsApp
                            </a>
                          </Button>
                        ) : null}
                      </div>
                    </>
                  )}
                  <button
                    type="button"
                    className="link-underline mt-8 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      setOutcome(null);
                      if (outcome.sent) reset();
                    }}
                  >
                    {outcome.sent ? "Send another enquiry" : "Back to the form"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  <div>
                    <h2 className="text-title">Send an enquiry</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Fields marked optional can be left blank.</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Name" htmlFor={`${id}-name`} error={errors.name?.message}>
                      <input id={`${id}-name`} autoComplete="name" className={fieldBase} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} {...register("name")} />
                    </Field>
                    <Field label="Business name" optional htmlFor={`${id}-businessName`} error={errors.businessName?.message}>
                      <input id={`${id}-businessName`} autoComplete="organization" className={fieldBase} aria-invalid={!!errors.businessName} aria-describedby={describedBy("businessName")} {...register("businessName")} />
                    </Field>
                    <Field label="Email" htmlFor={`${id}-email`} error={errors.email?.message}>
                      <input id={`${id}-email`} type="email" autoComplete="email" className={fieldBase} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} {...register("email")} />
                    </Field>
                    <Field label="Phone number" htmlFor={`${id}-phone`} error={errors.phone?.message}>
                      <input id={`${id}-phone`} type="tel" autoComplete="tel" inputMode="tel" className={fieldBase} aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} {...register("phone")} />
                    </Field>
                  </div>

                  <fieldset>
                    <legend className="mb-3 text-sm font-medium">Area of interest</legend>
                    <div className="flex flex-wrap gap-2" aria-describedby={describedBy("interest")}>
                      {interestOptions.map((o) => (
                        <label key={o.value} className="cursor-pointer">
                          <input type="radio" value={o.value} className="peer sr-only" {...register("interest")} />
                          <span className="block rounded-full border border-input px-4 py-2 text-sm transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-2 peer-focus-visible:ring-signal hover:border-foreground/40">
                            {o.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.interest ? (
                      <p id={`${id}-interest-error`} role="alert" className="mt-2 text-xs text-destructive">
                        {errors.interest.message}
                      </p>
                    ) : null}
                  </fieldset>

                  <Field label="Message" htmlFor={`${id}-message`} error={errors.message?.message}>
                    <textarea id={`${id}-message`} rows={5} className={cn(fieldBase, "resize-y")} placeholder="Tell us about your business and what you're looking for." aria-invalid={!!errors.message} aria-describedby={describedBy("message")} {...register("message")} />
                  </Field>

                  {!ENQUIRY_DELIVERY_CONNECTED ? (
                    <p className="flex items-start gap-2 rounded-md border border-dashed border-area-business bg-area-business/10 p-3 text-xs leading-relaxed">
                      <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold">Setup pending:</strong> online delivery for this form
                        isn't connected yet. Submitting checks your details and prepares your message to send another way.
                      </span>
                    </p>
                  ) : null}

                  <Button type="submit" variant="ink" size="xl" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin" /> : null}
                    Start a Conversation <ButtonArrow />
                  </Button>
                </form>
              )}
            </div>
          </Reveal>

          {/* SIDE PANEL */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal delay={100} className="surface-ink relative overflow-hidden rounded-xl p-8">
              <div aria-hidden="true" className="absolute -top-24 -right-24 size-64 rounded-full bg-signal/15 blur-3xl" />
              <span className="relative flex size-11 items-center justify-center rounded-md bg-signal">
                <MessageCircle className="size-5 text-signal-foreground" />
              </span>
              <h2 className="text-title relative mt-6">Prefer WhatsApp?</h2>
              <p className="relative mt-3 text-ink-muted">Message our team directly for a quick conversation.</p>
              {waGeneral ? (
                <Button asChild variant="signal" size="xl" className="relative mt-8 w-full">
                  <a href={waGeneral} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp <ButtonArrow />
                  </a>
                </Button>
              ) : (
                <>
                  <Button type="button" variant="glass" size="xl" className="relative mt-8 w-full" disabled>
                    Chat on WhatsApp
                  </Button>
                  <p className="relative mt-3 font-mono text-[0.68rem] text-ink-muted">
                    [WhatsApp number to be added]
                  </p>
                </>
              )}
            </Reveal>

            <Reveal delay={160} className="rounded-xl border bg-card p-8">
              <h2 className="text-eyebrow text-muted-foreground">Contact details</h2>
              <ul className="mt-6 space-y-5">
                {contactRows.map((row) => (
                  <li key={row.label} className="flex items-start gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md border">
                      <row.icon className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">{row.label}</span>
                      <span className={cn("block", isPlaceholder(row.value) ? "font-mono text-sm text-muted-foreground" : "font-medium")}>
                        {row.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={220} className="rounded-xl border bg-card p-8">
              <h2 className="text-eyebrow text-muted-foreground">What happens next</h2>
              <ol className="mt-6 space-y-4 text-sm">
                {[
                  "We review your enquiry and the area you're interested in.",
                  "Our team gets in touch to understand your needs.",
                  "We suggest practical options and next steps.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

// Re-exported for tests that check WhatsApp gating without rendering.
export { whatsappConfigured };
