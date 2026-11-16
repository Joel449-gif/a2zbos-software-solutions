import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaGlyph } from "@/components/site/AreaGlyph";
import { ButtonArrow } from "@/components/site/ArrowLink";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/site/Reveal";
import { Container, PageHero } from "@/components/site/Section";
import { areaColor, solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

const TITLE = "Solutions — Business Software, CRM, Digital & Automation | A2ZBOS";
const DESCRIPTION =
  "Explore A2ZBOS solution areas: business software, customer management, digital solutions, and business automation & AI — and find the right fit for your business.";

export const Route = createFileRoute("/solutions")({
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
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Solutions built around how your business <span className="font-accent text-signal">actually runs.</span>
          </>
        }
        lede="Four connected solution areas. Pick the challenge closest to yours and see how A2ZBOS can help."
      >
        <p className="text-eyebrow mb-4 text-ink-muted">Find your fit</p>
        <ul className="grid gap-px overflow-hidden rounded-xl border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <li key={s.id} className="bg-ink">
              <a
                href={`#${s.id}`}
                className="group flex h-full flex-col justify-between gap-8 p-5 transition-colors hover:bg-ink-raised"
              >
                <span className="flex items-center justify-between">
                  <span className={cn("size-2 rounded-sm", areaColor[s.key])} />
                  <ArrowDownRight className="size-4 text-ink-muted transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-ink-foreground" />
                </span>
                <span>
                  <span className="block text-[0.95rem] font-medium leading-snug text-ink-foreground">"{s.intent}"</span>
                  <span className="mt-1.5 block text-xs text-ink-muted">{s.name}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="divide-y">
        {solutions.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="py-24 sm:py-32">
            <Container className="grid gap-14 lg:grid-cols-12">
              <Reveal className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
                <div className="lg:sticky lg:top-28">
                  <p className="text-eyebrow flex items-center gap-3 text-muted-foreground">
                    <span className={cn("size-2 rounded-sm", areaColor[s.key])} />
                    {s.index} — {s.name}
                  </p>
                  <h2 id={`${s.id}-title`} className="text-headline mt-5">
                    {s.headline}
                  </h2>
                  <p className="text-lede mt-6 text-muted-foreground">{s.description}</p>
                  <div className="group mt-10 overflow-hidden rounded-xl border bg-card">
                    <AreaGlyph area={s.key} className="h-44 text-foreground" />
                  </div>
                  <Button asChild variant="ink" size="xl" className="mt-10">
                    <Link to="/contact" search={{ interest: s.interest }}>
                      Discuss {s.name} <ButtonArrow />
                    </Link>
                  </Button>
                </div>
              </Reveal>

              <div className={cn("space-y-6 lg:col-span-6", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
                <Reveal delay={80} className="rounded-xl border bg-card p-7 sm:p-9">
                  <h3 className="text-eyebrow text-muted-foreground">What's included</h3>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.offerings.map((o) => (
                      <li key={o} className="flex items-start gap-3">
                        <span className={cn("mt-1 flex size-4 shrink-0 items-center justify-center rounded-sm", areaColor[s.key])}>
                          <Check className="size-3 text-signal-foreground" aria-hidden="true" />
                        </span>
                        <span className="font-medium">{o}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={140} className="rounded-xl border bg-card p-7 sm:p-9">
                  <h3 className="text-eyebrow text-muted-foreground">Problems it addresses</h3>
                  <ul className="mt-6 divide-y">
                    {s.problems.map((p) => (
                      <li key={p} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                        <Minus className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={200} className="surface-ink relative overflow-hidden rounded-xl p-7 sm:p-9">
                  <div aria-hidden="true" className={cn("absolute -top-20 -right-20 size-56 rounded-full opacity-20 blur-3xl", areaColor[s.key])} />
                  <h3 className="text-eyebrow relative text-ink-muted">Example use cases</h3>
                  <ul className="relative mt-6 space-y-4">
                    {s.useCases.map((u, n) => (
                      <li key={u} className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-ink-muted">0{n + 1}</span>
                        <span className="text-lg font-medium tracking-[-0.02em]">{u}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section className="border-t bg-secondary/60 py-14">
        <Container>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">A note on availability.</span> These are A2ZBOS's
            solution areas. Specific products and services within each area vary — get in touch and we'll tell
            you honestly what's available for your needs today.
          </p>
        </Container>
      </section>

      <CtaBand
        eyebrow="Not sure where to start?"
        title={
          <>
            Tell us the problem. <span className="font-accent text-signal">We'll map the solution.</span>
          </>
        }
      />
    </>
  );
}
