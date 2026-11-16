import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { LogoMark } from "@/components/site/Logo";
import { Reveal } from "@/components/site/Reveal";
import { Container, Eyebrow, PageHero, SectionIntro } from "@/components/site/Section";
import { areaColor, solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

const TITLE = "About A2ZBOS — The software solutions division of AtoZ Computers";
const DESCRIPTION =
  "A2ZBOS is the software solutions division of AtoZ Computers, focused on making practical technology accessible to businesses.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

const principles = [
  { title: "Useful over impressive", body: "Technology earns its place by making work easier, faster or clearer." },
  { title: "Honest guidance", body: "If a tool isn't right for you, we'll say so — even if it's one we offer." },
  { title: "Adoption matters", body: "Software only helps once people use it. We help teams get there." },
  { title: "In it for the long run", body: "Businesses change. We stay engaged so your tools can change with them." },
];

const steps = [
  { name: "Understand", body: "We learn how your business runs today and where time or money is being lost." },
  { name: "Recommend", body: "We suggest practical options — products, services or a mix — that fit your needs." },
  { name: "Implement", body: "We help you set up, configure and roll out the chosen solution." },
  { name: "Support", body: "We stay in touch as you settle in and as your requirements grow." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About A2ZBOS"
        title={
          <>
            Making practical technology <span className="font-accent text-signal">accessible</span> to businesses.
          </>
        }
        lede="A2ZBOS is the software solutions division of AtoZ Computers. We help businesses find, adopt and get real value from software and digital solutions."
      />

      {/* Relationship */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow="Who we are"
              title="A focused division with a broader purpose."
              lede="A2ZBOS brings a dedicated software focus to AtoZ Computers. Software shapes how a business works — how it bills, sells, serves customers and grows — and we help businesses get that part right."
            />
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-xl border bg-card p-6 sm:p-10" aria-label="How A2ZBOS relates to AtoZ Computers">
              <div aria-hidden="true" className="bg-grid-light pointer-events-none absolute inset-0" />
              <div className="relative flex flex-col items-center">
                <div className="rounded-lg border bg-background px-5 py-3 text-center shadow-soft">
                  <p className="text-eyebrow text-muted-foreground">Parent company</p>
                  <p className="mt-1 font-semibold tracking-[-0.03em]">AtoZ Computers</p>
                </div>
                <span aria-hidden="true" className="h-10 w-px bg-border" />
                <div className="surface-ink flex items-center gap-3 rounded-lg px-5 py-4 shadow-window">
                  <LogoMark />
                  <div>
                    <p className="font-semibold tracking-[-0.03em]">A2ZBOS</p>
                    <p className="text-xs text-ink-muted">Software solutions division</p>
                  </div>
                </div>
                <span aria-hidden="true" className="h-10 w-px bg-border" />
                <div className="relative grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
                  <span aria-hidden="true" className="absolute -top-px left-[12.5%] right-[12.5%] hidden h-px bg-border sm:block" />
                  {solutions.map((s) => (
                    <div key={s.id} className="rounded-lg border bg-background p-3 text-center">
                      <span className={cn("mx-auto block size-2 rounded-sm", areaColor[s.key])} />
                      <p className="mt-2 text-xs font-medium leading-tight">{s.name}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Delivered through A2ZBOS services and selected third-party products.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Vision */}
      <section className="surface-ink relative overflow-hidden py-24 sm:py-36">
        <div aria-hidden="true" className="bg-cta-glow pointer-events-none absolute inset-0 opacity-70" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-4xl text-center">
            <Eyebrow className="justify-center">Our vision</Eyebrow>
            <p className="text-headline mt-8">
              Making practical technology <span className="font-accent text-signal">accessible to businesses.</span>
            </p>
            <p className="text-lede mx-auto mt-8 max-w-2xl text-ink-muted">
              We focus on helping businesses adopt useful software and digital solutions — technology that fits
              how they work and makes a visible difference to their day.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionIntro eyebrow="What guides us" title="Four principles behind every recommendation." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70} className="group bg-card p-8 transition-colors hover:bg-background">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <h3 className="text-title mt-10">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* How we work */}
      <section className="border-t bg-secondary/60 py-24 sm:py-32">
        <Container>
          <SectionIntro eyebrow="How we work" title="From first conversation to everyday use." />
          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden="true" className="absolute top-5 right-0 left-0 hidden h-px bg-border md:block" />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 90} className="relative">
                <span className="relative flex size-10 items-center justify-center rounded-full border bg-background font-mono text-sm">
                  {i + 1}
                </span>
                <h3 className="text-title mt-6">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Let's find the right technology <span className="font-accent text-signal">for your business.</span>
          </>
        }
      />
    </>
  );
}
