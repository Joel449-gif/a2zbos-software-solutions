import { Link } from "@tanstack/react-router";
import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { ArrowLink, ButtonArrow } from "./ArrowLink";
import { Reveal } from "./Reveal";

/**
 * Third-party product sheet. Uses the neutral "partner" surface so the
 * product reads as an offering distributed by A2ZBOS, not as A2ZBOS itself.
 */
export function ProductFeature({ product, headingLevel = "h3" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Reveal className="overflow-hidden rounded-xl border border-partner-border bg-partner text-partner-foreground shadow-soft">
      {/* label strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-partner-border px-6 py-3 sm:px-8">
        <span className="text-eyebrow flex items-center gap-2 text-muted-foreground">
          <span className="size-1.5 rounded-full bg-area-business" />
          Featured product · {product.category}
        </span>
        {product.ownership === "third-party" ? (
          <span className="rounded-full border border-partner-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            Third-party software{product.maker ? ` · by ${product.maker}` : ""}
          </span>
        ) : null}
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="p-6 sm:p-10 lg:col-span-5 lg:border-r lg:border-partner-border">
          <p className="text-2xl font-semibold tracking-[-0.04em]">{product.name}</p>
          <Heading className="text-headline mt-4">{product.tagline}</Heading>
          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <p className="text-eyebrow text-muted-foreground">Suited to</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {product.idealUsers.slice(0, 6).map((u) => (
                <li key={u} className="rounded-full border border-partner-border px-3 py-1 text-xs">
                  {u}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild variant="ink" size="xl">
              <Link to="/contact" search={{ interest: product.interest, product: product.name }}>
                Enquire about {product.name} <ButtonArrow />
              </Link>
            </Button>
            <ArrowLink to="/products/$slug" params={{ slug: product.slug }}>
              Product details
            </ArrowLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid sm:grid-cols-2">
            {product.capabilities.map((c, i) => (
              <li
                key={c.title}
                className="group border-t border-partner-border p-6 transition-colors hover:bg-foreground/[0.02] sm:p-8 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(-n+2)]:border-t-0"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-area-business/20 text-foreground transition-transform duration-500 group-hover:scale-110">
                    <Check className="size-3.5" />
                  </span>
                  <span className="font-mono text-[0.65rem] text-muted-foreground">0{i + 1}</span>
                </span>
                <p className="mt-4 font-semibold tracking-[-0.02em]">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.detail}</p>
              </li>
            ))}
          </ul>
          {product.sourceNote ? (
            <p className="flex items-start gap-2 border-t border-partner-border px-6 py-4 text-xs text-muted-foreground sm:px-8">
              <ExternalLink className="mt-0.5 size-3 shrink-0" />
              <span>
                {product.sourceNote}{" "}
                {product.officialUrl ? (
                  <a href={product.officialUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                    Official website
                  </a>
                ) : null}
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
