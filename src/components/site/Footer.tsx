import { Link } from "@tanstack/react-router";
import { navItems, site, isPlaceholder, emailLink, phoneLink } from "@/config/site";
import { solutions } from "@/data/solutions";
import { Container } from "./Section";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();
  const contactRows = [
    { label: "Email", value: site.contact.email, href: emailLink() },
    { label: "Phone", value: site.contact.phone, href: phoneLink() },
    { label: "Head office", value: site.contact.headOffice },
    { label: "Branch", value: site.contact.branchOffice },
  ];

  return (
    <footer className="surface-ink relative overflow-hidden border-t border-ink-border">
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              The software solutions division of {site.parent}. Making practical technology
              accessible to businesses.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-eyebrow text-ink-muted">Company</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline text-ink-foreground/85 hover:text-ink-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-eyebrow text-ink-muted">Solutions</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {solutions.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/solutions"
                    hash={s.id}
                    className="link-underline text-ink-foreground/85 hover:text-ink-foreground"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-eyebrow text-ink-muted">Contact</h2>
            <dl className="mt-5 space-y-3 text-sm">
              {contactRows.map((row) => (
                <div key={row.label} className="flex gap-3">
                  <dt className="w-16 shrink-0 text-ink-muted">{row.label}</dt>
                  <dd
                    className={cn(
                      isPlaceholder(row.value)
                        ? "font-mono text-xs text-ink-muted/80"
                        : "text-ink-foreground/85",
                    )}
                  >
                    {row.href ? (
                      <a href={row.href} className="link-underline">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none mt-20 select-none text-center text-[clamp(5rem,22vw,20rem)] leading-[0.8] font-semibold tracking-[-0.07em] text-ink-foreground/[0.04]"
        >
          A2ZBOS
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ink-border pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · A division of {site.parent}.
          </p>
          <p>myBillBook is a third-party product and a trademark of its respective owner.</p>
        </div>
      </Container>
    </footer>
  );
}
