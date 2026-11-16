import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/site/ArrowLink";
import { CtaBand } from "@/components/site/CtaBand";
import { ProductFeature } from "@/components/site/ProductFeature";
import { Reveal } from "@/components/site/Reveal";
import { Container, PageHero, SectionIntro } from "@/components/site/Section";
import { exploringAreas, products } from "@/data/products";
import { areaColor, solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

const TITLE = "Products — Software distributed by A2ZBOS";
const DESCRIPTION =
  "Browse software products available through A2ZBOS, starting with myBillBook for GST billing, inventory and payment collection.";

export const Route = createFileRoute("/products/")({
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
  component: ProductsPage,
});

function ProductsPage() {
  const [featured, ...rest] = products.filter((p) => p.status === "available");
  const areaName = (key: string) => solutions.find((s) => s.key === key)?.name ?? "";

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Software we can <span className="font-accent text-signal">put to work</span> for you.
          </>
        }
        lede="A growing portfolio of business software available through A2ZBOS — each one chosen because it solves a real problem well."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-eyebrow text-muted-foreground">
              {products.filter((p) => p.status === "available").length} available ·{" "}
              {products.filter((p) => p.ownership === "third-party").length} third-party
            </p>
            <p className="text-sm text-muted-foreground">
              Third-party products are owned by their respective companies and distributed by A2ZBOS.
            </p>
          </div>
          {featured ? <ProductFeature product={featured} headingLevel="h2" /> : null}

          {rest.length > 0 ? (
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {rest.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="group flex h-full flex-col rounded-xl border bg-card p-8 transition-shadow hover:shadow-soft"
                  >
                    <span className="flex items-center justify-between text-eyebrow text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <span className={cn("size-2 rounded-sm", areaColor[p.area])} />
                        {p.category}
                      </span>
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{p.name}</span>
                    <span className="mt-3 text-muted-foreground">{p.description}</span>
                    <span className="mt-4 text-xs text-muted-foreground">{areaName(p.area)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>

      <section className="border-t py-20 sm:py-28">
        <Container>
          <SectionIntro
            eyebrow="On the roadmap"
            title={
              <>
                More products, <span className="font-accent">as they're ready.</span>
              </>
            }
            lede="A2ZBOS plans to expand its portfolio into these areas. They are not launched products and no dates have been announced — but if one matters to you, tell us."
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-3">
            {exploringAreas.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 80} className="group relative bg-background p-8">
                <div className="flex items-center justify-between">
                  <span className={cn("size-2 rounded-sm", areaColor[a.area])} />
                  <span className="rounded-full border border-dashed px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-muted-foreground">
                    Planned area
                  </span>
                </div>
                <h3 className="text-title mt-10">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.note}</p>
                <div className="mt-8 space-y-2" aria-hidden="true">
                  <span className="block h-1.5 w-3/4 rounded-full bg-foreground/[0.06]" />
                  <span className="block h-1.5 w-1/2 rounded-full bg-foreground/[0.06]" />
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200} className="mt-10">
            <Button asChild variant="line" size="xl">
              <Link to="/contact" search={{ interest: "other" }}>
                Suggest a product you need <ButtonArrow />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Not sure which product fits? <span className="font-accent text-signal">Ask us.</span>
          </>
        }
      />
    </>
  );
}
