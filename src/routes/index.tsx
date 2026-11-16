import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Briefcase, Store, Truck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedHeadline } from "@/components/site/AnimatedHeadline";
import { AreaGlyph } from "@/components/site/AreaGlyph";
import { ArrowLink, ButtonArrow } from "@/components/site/ArrowLink";
import { CtaBand } from "@/components/site/CtaBand";
import { HeroVisual } from "@/components/site/HeroVisual";
import { ProductFeature } from "@/components/site/ProductFeature";
import { Reveal } from "@/components/site/Reveal";
import { Container, Eyebrow, SectionIntro } from "@/components/site/Section";
import { products } from "@/data/products";
import { areaColor, solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

const TITLE = "A2ZBOS — Technology that moves your business forward";
const DESCRIPTION =
  "A2ZBOS, the software solutions division of AtoZ Computers, brings business software, customer management, digital solutions and automation to growing businesses.";

export const Route = createFileRoute("/")({
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
  component: HomePage,
});

const reasons = [
  {
    title: "Practical technology",
    body: "We recommend software that solves a real problem in your business today — not technology for its own sake.",
  },
  {
    title: "Business-first approach",
    body: "We start with how you work: your customers, your counter, your team. Then we find the tools that fit.",
  },
  {
    title: "Implementation assistance",
    body: "Choosing software is half the job. We help you set it up and get your people comfortable using it.",
  },
  {
    title: "Multiple solution areas",
    body: "Billing, customers, digital presence and automation — one partner who understands how they connect.",
  },
  {
    title: "Ongoing engagement",
    body: "We stay in touch as your business changes, so your technology can keep up with you.",
  },
];

const industries = [
  { name: "Retail", note: "Shops and stores that need fast billing and clear stock.", icon: Store },
  { name: "Wholesale & distribution", note: "High-volume billing, credit and inventory movement.", icon: Truck },
  { name: "Small & medium businesses", note: "Owners ready to move beyond registers and spreadsheets.", icon: Building2 },
  { name: "Professional services", note: "Firms managing clients, enquiries and communication.", icon: Briefcase },
  { name: "Growing enterprises", note: "Teams that need systems, portals and automation to scale.", icon: TrendingUp },
];

function HomePage() {
  const featured = products[0];

  return (
    <>
      {/* HERO */}
      <section className="surface-ink relative overflow-hidden pt-32 sm:pt-40">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="bg-hero-glow pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="mx-auto max-w-5xl text-center">
            <Link
              to="/about"
              className="group animate-rise inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-foreground/[0.04] py-1 pr-3 pl-1 text-xs text-ink-muted transition-colors hover:border-ink-foreground/25 hover:text-ink-foreground"
            >
              <span className="rounded-full bg-signal px-2 py-0.5 font-semibold text-signal-foreground">A2ZBOS</span>
              The software solutions division of AtoZ Computers
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <AnimatedHeadline
              text="Technology that moves your business forward."
              accent={["forward."]}
              baseDelay={120}
              className="text-display mt-8"
            />

            <p className="text-lede animate-rise mx-auto mt-7 max-w-2xl text-ink-muted" style={{ animationDelay: "600ms" }}>
              From business software to intelligent digital solutions, A2ZBOS helps businesses simplify
              operations, connect with customers, and build for what's next.
            </p>

            <div className="animate-rise mt-10 flex flex-wrap justify-center gap-3" style={{ animationDelay: "720ms" }}>
              <Button asChild variant="signal" size="xl">
                <Link to="/solutions">
                  Explore Solutions <ButtonArrow />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/contact" search={{}}>Talk to Our Team</Link>
              </Button>
            </div>
          </div>

          <div className="animate-rise mt-16 sm:mt-20" style={{ animationDelay: "850ms" }}>
            <HeroVisual />
          </div>
        </Container>

        {/* solution strip */}
        <div className="relative mt-20 border-t border-ink-border">
          <Container>
            <ul className="grid grid-cols-2 lg:grid-cols-4">
              {solutions.map((s, i) => (
                <li key={s.id} className={cn("border-ink-border", i % 2 === 0 && "border-r", i < 2 && "border-b lg:border-b-0", i === 1 && "lg:border-r", i === 2 && "lg:border-r")}>
                  <Link to="/solutions" hash={s.id} className="group flex h-full items-center gap-3 px-2 py-6 sm:px-6">
                    <span className={cn("size-2 rounded-sm", areaColor[s.key])} />
                    <span>
                      <span className="block text-sm font-medium text-ink-foreground">{s.name}</span>
                      <span className="block text-xs text-ink-muted">{s.short}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* SOLUTION OVERVIEW */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionIntro
              eyebrow="Solution areas"
              title={
                <>
                  One partner. Four ways to <span className="font-accent">run a better</span> business.
                </>
              }
              lede="A2ZBOS works across four connected solution areas. Start with the one that matters most today — add the rest as you grow."
            />
            <Reveal delay={100}>
              <ArrowLink to="/solutions">See all solutions</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-16 grid overflow-hidden rounded-xl border bg-card md:grid-cols-2">
            {solutions.map((s, i) => (
              <Reveal
                key={s.id}
                delay={i * 80}
                className={cn("border-border", i % 2 === 0 && "md:border-r", i < 2 && "border-b", i === 2 && "border-b md:border-b-0")}
              >
                <Link
                  to="/solutions"
                  hash={s.id}
                  className="group relative flex h-full flex-col p-7 transition-colors duration-500 hover:bg-foreground/[0.02] sm:p-10"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100",
                      areaColor[s.key],
                    )}
                  />
                  <div className="flex items-start justify-between">
                    <span className="flex items-center gap-3">
                      <span className={cn("flex size-10 items-center justify-center rounded-md", areaColor[s.key])}>
                        <s.icon className="size-5 text-signal-foreground" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{s.index}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-muted-foreground transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                    />
                  </div>
                  <AreaGlyph area={s.key} className="my-6 text-foreground" />
                  <h3 className="text-title">{s.name}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{s.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {s.offerings.map((o) => (
                      <li key={o} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                        {o}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                    <span className={cn("h-px w-6 transition-all duration-500 group-hover:w-10", areaColor[s.key])} />
                    Explore {s.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED PRODUCT */}
      {featured ? (
        <section className="relative overflow-hidden border-y bg-secondary/60 py-24 sm:py-32">
          <div aria-hidden="true" className="bg-grid-light pointer-events-none absolute inset-0" />
          <Container className="relative">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <Reveal className="max-w-2xl">
                <Eyebrow>Featured product</Eyebrow>
                <p className="text-lede mt-5 text-muted-foreground">
                  Alongside our own services, A2ZBOS distributes carefully chosen third-party software.
                  We help customers access it, get started, and use it well.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <ArrowLink to="/products">All products</ArrowLink>
              </Reveal>
            </div>
            <ProductFeature product={featured} headingLevel="h2" />
          </Container>
        </section>
      ) : null}

      {/* WHY A2ZBOS */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionIntro
                eyebrow="Why A2ZBOS"
                title={
                  <>
                    Technology, <span className="font-accent">chosen</span> for the way you work.
                  </>
                }
                lede="We are not here to sell you software you don't need. We help you find, adopt and get value from technology that makes a real difference."
              />
              <Reveal delay={150} className="mt-10">
                <Button asChild variant="ink" size="xl">
                  <Link to="/about">
                    About A2ZBOS <ButtonArrow />
                  </Link>
                </Button>
              </Reveal>
            </div>
          </div>
          <ol className="lg:col-span-7">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 60} className="group grid grid-cols-[3rem_1fr] gap-4 border-t py-8 sm:grid-cols-[5rem_1fr] sm:py-10">
                  <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-title transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                      {r.title}
                    </h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">{r.body}</p>
                  </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section className="surface-ink relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden="true" className="bg-hero-glow pointer-events-none absolute inset-0 opacity-60" />
        <Container className="relative">
          <SectionIntro
            eyebrow="Industries we can serve"
            title={
              <>
                Built for businesses that <span className="font-accent text-signal">keep moving.</span>
              </>
            }
            lede="Our solution areas are designed with these kinds of businesses in mind."
          />
          <ul className="mt-16 border-b border-ink-border">
            {industries.map((ind, i) => (
              <Reveal as="li" key={ind.name} delay={i * 60} className="group relative grid grid-cols-[auto_1fr] items-center gap-5 border-t border-ink-border py-7 sm:grid-cols-[auto_1fr_1fr] sm:gap-8">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 bg-ink-foreground/[0.03] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                  />
                  <span className="relative flex size-11 items-center justify-center rounded-md border border-ink-border text-ink-muted transition-colors group-hover:border-signal/50 group-hover:text-signal">
                    <ind.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="relative text-2xl font-semibold tracking-[-0.04em] sm:text-4xl">{ind.name}</h3>
                  <p className="relative col-span-2 text-ink-muted sm:col-span-1 sm:text-right">{ind.note}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Let's find the right technology <span className="font-accent text-signal">for your business.</span>
          </>
        }
        lede="Tell us how your business runs today. We'll help you figure out what would make the biggest difference."
      />
    </>
  );
}
