import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ExternalLink, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/site/ArrowLink";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/site/Reveal";
import { Container, Eyebrow } from "@/components/site/Section";
import { getProduct } from "@/data/products";
import { areaColor, solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found | A2ZBOS" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    const title = `${p.name} — ${p.category} | Available through A2ZBOS`;
    const description = `${p.name}: ${p.tagline} Learn what it does, who it suits, and enquire through A2ZBOS.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const area = solutions.find((s) => s.key === p.area);

  return (
    <>
      <section className="surface-ink relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="bg-hero-glow pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Link to="/products" className="group inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink-foreground">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> All products
          </Link>
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="animate-rise flex flex-wrap items-center gap-2">
                <span className="text-eyebrow flex items-center gap-2 rounded-full border border-ink-border px-3 py-1 text-ink-muted">
                  <span className={cn("size-1.5 rounded-full", areaColor[p.area])} />
                  {p.category}
                </span>
                {p.ownership === "third-party" ? (
                  <span className="text-eyebrow rounded-full border border-ink-border px-3 py-1 text-ink-muted">
                    Third-party software
                  </span>
                ) : null}
                <span className="text-eyebrow rounded-full bg-signal/15 px-3 py-1 text-signal">
                  {p.status === "available" ? "Available via A2ZBOS" : "Planned"}
                </span>
              </div>
              <h1 className="text-display mt-6 animate-rise" style={{ animationDelay: "80ms" }}>
                {p.name}
              </h1>
              <p className="text-title mt-4 font-normal text-ink-muted animate-rise" style={{ animationDelay: "160ms" }}>
                {p.tagline}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 animate-rise lg:col-span-4 lg:justify-end" style={{ animationDelay: "240ms" }}>
              <Button asChild variant="signal" size="xl">
                <Link to="/contact" search={{ interest: p.interest, product: p.name }}>
                  Enquire now <ButtonArrow />
                </Link>
              </Button>
              {p.officialUrl ? (
                <Button asChild variant="glass" size="xl">
                  <a href={p.officialUrl} target="_blank" rel="noopener noreferrer">
                    Official site <ExternalLink />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Overview</Eyebrow>
            <p className="text-lede mt-5">{p.description}</p>
            {p.ownership === "third-party" && p.maker ? (
              <p className="mt-6 rounded-lg border border-partner-border bg-partner p-4 text-sm leading-relaxed text-muted-foreground">
                {p.name} is owned and developed by {p.maker}. A2ZBOS is a distributor and is not the developer
                of this product.
              </p>
            ) : null}
            <dl className="mt-10 divide-y border-y text-sm">
              <div className="flex justify-between py-3">
                <dt className="text-muted-foreground">Category</dt>
                <dd className="font-medium">{p.category}</dd>
              </div>
              {area ? (
                <div className="flex justify-between py-3">
                  <dt className="text-muted-foreground">Solution area</dt>
                  <dd>
                    <Link to="/solutions" hash={area.id} className="link-underline font-medium">
                      {area.name}
                    </Link>
                  </dd>
                </div>
              ) : null}
              {p.platforms ? (
                <div className="flex justify-between py-3">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Monitor className="size-3.5" /> Platforms
                  </dt>
                  <dd className="font-medium">{p.platforms.join(" · ")}</dd>
                </div>
              ) : null}
            </dl>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <h2 className="text-title">Key capabilities</h2>
            </Reveal>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
              {p.capabilities.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 50} className="bg-card p-6">
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <h3 className="mt-3 font-semibold tracking-[-0.02em]">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.detail}</p>
                </Reveal>
              ))}
            </ul>
            {p.sourceNote ? <p className="mt-4 text-xs text-muted-foreground">{p.sourceNote}</p> : null}
          </div>
        </Container>
      </section>

      <section className="border-t bg-secondary/60 py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Ideal for</Eyebrow>
            <h2 className="text-headline mt-5">Who it suits</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {p.idealUsers.map((u) => (
                <li key={u} className="rounded-full border bg-background px-4 py-2 text-sm">
                  {u}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <Eyebrow>Through A2ZBOS</Eyebrow>
            <h2 className="text-headline mt-5">How we help</h2>
            <ol className="mt-8 space-y-4">
              {p.howWeHelp.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-signal">
                    <Check className="size-3 text-signal-foreground" aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted-foreground">
              Pricing and purchasing arrangements are discussed directly with our team.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow={p.name}
        title={
          <>
            Ready to try {p.name}? <span className="font-accent text-signal">Let's talk.</span>
          </>
        }
        cta={`Enquire about ${p.name}`}
      />
    </>
  );
}
