import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-eyebrow inline-flex items-center gap-2 text-muted-foreground", className)}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
      {children}
    </p>
  );
}

interface SectionIntroProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionIntro({ eyebrow, title, lede, align = "left", className }: SectionIntroProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center [&_p]:mx-auto",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-headline mt-5">{title}</h2>
      {lede ? <p className="text-lede mt-5 max-w-2xl text-muted-foreground">{lede}</p> : null}
    </Reveal>
  );
}

/** Large dark page opener used by every inner page. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="surface-ink relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="bg-hero-glow pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Eyebrow className="animate-rise">{eyebrow}</Eyebrow>
        <h1
          className="text-display mt-6 max-w-5xl animate-rise"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {lede ? (
          <p
            className="text-lede mt-7 max-w-2xl text-ink-muted animate-rise"
            style={{ animationDelay: "180ms" }}
          >
            {lede}
          </p>
        ) : null}
        {children ? (
          <div className="mt-10 animate-rise" style={{ animationDelay: "260ms" }}>
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
