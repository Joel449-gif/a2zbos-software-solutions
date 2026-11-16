import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ButtonArrow } from "./ArrowLink";
import { Container, Eyebrow } from "./Section";
import { Reveal } from "./Reveal";

export function CtaBand({
  eyebrow = "Start here",
  title,
  lede,
  cta = "Start a Conversation",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  cta?: string;
}) {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div aria-hidden="true" className="bg-cta-glow pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative py-28 text-center sm:py-36">
        <Reveal>
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
          <h2 className="text-display mx-auto mt-6 max-w-4xl">{title}</h2>
          {lede ? <p className="text-lede mx-auto mt-6 max-w-xl text-ink-muted">{lede}</p> : null}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="signal" size="xl">
              <Link to="/contact" search={{}}>
                {cta} <ButtonArrow />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/solutions">Explore Solutions</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
