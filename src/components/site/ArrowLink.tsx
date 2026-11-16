import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArrowLinkProps = LinkProps & { children: ReactNode; className?: string };

export function ArrowLink({ children, className, ...props }: ArrowLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group/arrow inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/arrow:translate-x-1"
      />
    </Link>
  );
}

export function ButtonArrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
    />
  );
}
