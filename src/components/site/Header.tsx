import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ButtonArrow } from "./ArrowLink";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="surface-ink fixed inset-x-0 top-0 z-50 bg-transparent">
      <div
        className={cn(
          "absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-ink-border bg-ink/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="A2ZBOS home" className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-ink-border bg-ink-foreground/[0.03] p-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="block rounded-full px-4 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink-foreground"
                  activeProps={{ className: "bg-ink-foreground/10 !text-ink-foreground" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="signal" size="sm" className="hidden h-9 px-4 sm:inline-flex">
            <Link to="/contact" search={{}}>
              Get in Touch <ButtonArrow />
            </Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-ink-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "surface-ink fixed inset-x-0 top-16 bottom-0 origin-top overflow-y-auto border-t border-ink-border transition-[opacity,visibility] duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="px-5 pt-8 pb-12">
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li
                key={item.to}
                className={cn(
                  "transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="flex items-baseline justify-between border-b border-ink-border py-4 text-3xl font-semibold tracking-[-0.04em] text-ink-muted"
                  activeProps={{ className: "!text-ink-foreground" }}
                >
                  {item.label}
                  <span className="text-eyebrow text-ink-muted">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="signal" size="xl" className="mt-10 w-full">
            <Link to="/contact" search={{}}>
              Get in Touch <ButtonArrow />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
