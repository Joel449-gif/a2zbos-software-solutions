import { createElement, type CSSProperties, type ReactNode } from "react";
import { useReveal } from "@/hooks/use-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  as?: "div" | "li" | "section" | "article";
}

export function Reveal({ children, className, delay = 0, id, as = "div" }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      id,
      "data-reveal": "",
      className,
      style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
