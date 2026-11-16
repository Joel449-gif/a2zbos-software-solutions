import type { CSSProperties } from "react";
import { MessageCircle, PackageSearch } from "lucide-react";
import { useParallax, useScrollProgress } from "@/hooks/use-motion";

const bars = [38, 52, 44, 66, 58, 72, 61, 80, 70, 88, 76, 94];

const modules = [
  { label: "Billing", dot: "bg-area-business", active: true },
  { label: "Customers", dot: "bg-area-customer" },
  { label: "Web", dot: "bg-area-digital" },
  { label: "Automations", dot: "bg-area-automation" },
];

function Skeleton({ w, className = "" }: { w: string; className?: string }) {
  return <span className={`block h-1.5 rounded-full bg-ink-foreground/10 ${className}`} style={{ width: w }} />;
}

function PanelTitle({ children, dot }: { children: string; dot: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-[0.7rem] font-medium text-ink-foreground/80">
        <span className={`size-1.5 rounded-full ${dot}`} />
        {children}
      </span>
      <span className="flex gap-0.5">
        <span className="size-1 rounded-full bg-ink-foreground/20" />
        <span className="size-1 rounded-full bg-ink-foreground/20" />
        <span className="size-1 rounded-full bg-ink-foreground/20" />
      </span>
    </div>
  );
}

/**
 * Abstract "connected business system" composition. Illustrative only — no real
 * data, numbers or customer names are shown.
 */
export function HeroVisual() {
  const stage = useScrollProgress<HTMLDivElement>(0.4);
  const floatA = useParallax<HTMLDivElement>(0.06);
  const floatB = useParallax<HTMLDivElement>(-0.05);

  return (
    <div
      ref={stage}
      className="relative mx-auto w-full max-w-6xl [perspective:2200px]"
      style={{ "--p": 0 } as CSSProperties}
      aria-hidden="true"
    >
      {/* glow under the window */}
      <div className="absolute -inset-x-10 top-10 -bottom-10 rounded-[50%] bg-signal/10 blur-3xl" />

      <div
        className="relative origin-top overflow-hidden rounded-xl border border-ink-border bg-ink-raised shadow-window will-change-transform"
        style={{
          transform: "rotateX(calc(16deg * (1 - var(--p)))) scale(calc(0.94 + 0.06 * var(--p)))",
        }}
      >
        {/* window chrome */}
        <div className="flex h-10 items-center justify-between border-b border-ink-border px-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-ink-foreground/15" />
            <span className="size-2.5 rounded-full bg-ink-foreground/15" />
            <span className="size-2.5 rounded-full bg-ink-foreground/15" />
          </div>
          <span className="font-mono text-[0.65rem] tracking-wider text-ink-muted">a2zbos / workspace</span>
          <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-ink-muted">
            <span className="size-1.5 rounded-full bg-signal animate-pulse-dot" />
            Connected
          </span>
        </div>

        <div className="flex">
          {/* sidebar */}
          <div className="hidden w-48 shrink-0 border-r border-ink-border p-4 sm:block">
            <Skeleton w="60%" className="mb-5 h-2 bg-ink-foreground/15" />
            <ul className="space-y-1">
              {modules.map((m) => (
                <li
                  key={m.label}
                  className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[0.72rem] ${m.active ? "bg-ink-foreground/[0.07] text-ink-foreground" : "text-ink-muted"}`}
                >
                  <span className={`size-2 rounded-sm ${m.dot}`} />
                  {m.label}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-2.5">
              <Skeleton w="80%" />
              <Skeleton w="55%" />
              <Skeleton w="70%" />
            </div>
          </div>

          {/* main canvas */}
          <div className="grid flex-1 grid-cols-6 gap-3 p-3 sm:p-4">
            {/* Sales overview */}
            <div className="col-span-6 rounded-lg border border-ink-border bg-ink/60 p-4 lg:col-span-4">
              <PanelTitle dot="bg-area-business">Sales overview</PanelTitle>
              <div className="mt-3 flex items-end gap-2">
                <Skeleton w="22%" className="h-3 bg-ink-foreground/20" />
                <Skeleton w="10%" className="h-2 bg-area-business/40" />
              </div>
              <div className="mt-4 flex h-28 items-end gap-1.5 sm:h-36">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="animate-grow flex-1 rounded-t-sm bg-gradient-to-t from-area-business/25 to-area-business/80"
                    style={{ height: `${h}%`, animationDelay: `${500 + i * 60}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Automation flow */}
            <div className="col-span-6 rounded-lg border border-ink-border bg-ink/60 p-4 sm:col-span-3 lg:col-span-2">
              <PanelTitle dot="bg-area-automation">Automation</PanelTitle>
              <svg viewBox="0 0 160 120" className="mt-3 h-32 w-full">
                <path d="M30 22 C 30 60, 130 40, 130 66" className="stroke-area-automation/60 animate-dash" fill="none" strokeWidth="1.2" />
                <path d="M130 66 C 130 96, 30 80, 30 104" className="stroke-area-automation/60 animate-dash" fill="none" strokeWidth="1.2" />
                {[
                  [30, 22, "Invoice created"],
                  [130, 66, "Send reminder"],
                  [30, 104, "Update customer"],
                ].map(([x, y, label]) => (
                  <g key={label as string}>
                    <circle cx={x as number} cy={y as number} r="5" className="fill-ink stroke-area-automation" strokeWidth="1.5" />
                    <text
                      x={(x as number) === 30 ? 42 : 118}
                      y={(y as number) + 3}
                      textAnchor={(x as number) === 30 ? "start" : "end"}
                      className="fill-ink-muted font-mono text-[7px]"
                    >
                      {label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Pipeline */}
            <div className="col-span-6 rounded-lg border border-ink-border bg-ink/60 p-4 sm:col-span-3 lg:col-span-3">
              <PanelTitle dot="bg-area-customer">Customer pipeline</PanelTitle>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["New", "Follow-up", "Won"].map((col, c) => (
                  <div key={col} className="space-y-1.5">
                    <span className="font-mono text-[0.58rem] uppercase tracking-wider text-ink-muted">{col}</span>
                    {Array.from({ length: 3 - c + (c === 2 ? 1 : 0) }).map((_, i) => (
                      <div key={i} className="rounded-md border border-ink-border bg-ink-raised p-2">
                        <div className="flex items-center gap-1.5">
                          <span className="size-3 rounded-full bg-area-customer/40" />
                          <Skeleton w="60%" />
                        </div>
                        <Skeleton w="85%" className="mt-1.5 h-1" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Website */}
            <div className="col-span-6 hidden rounded-lg border border-ink-border bg-ink/60 p-4 sm:block lg:col-span-3">
              <PanelTitle dot="bg-area-digital">Website</PanelTitle>
              <div className="mt-4 overflow-hidden rounded-md border border-ink-border">
                <div className="flex items-center gap-1 border-b border-ink-border bg-ink-raised px-2 py-1.5">
                  <span className="size-1.5 rounded-full bg-ink-foreground/20" />
                  <Skeleton w="40%" className="ml-2 h-1.5" />
                </div>
                <div className="relative grid grid-cols-3 gap-2 overflow-hidden p-3">
                  <div className="col-span-2 space-y-1.5">
                    <Skeleton w="90%" className="h-2.5 bg-ink-foreground/20" />
                    <Skeleton w="65%" className="h-2.5 bg-ink-foreground/20" />
                    <Skeleton w="45%" className="mt-2 h-3 bg-area-digital/60" />
                  </div>
                  <div className="rounded-sm bg-gradient-to-br from-area-digital/50 to-area-digital/10" />
                  <div className="col-span-3 mt-1 grid grid-cols-3 gap-2">
                    <div className="h-8 rounded-sm bg-ink-foreground/[0.06]" />
                    <div className="h-8 rounded-sm bg-ink-foreground/[0.06]" />
                    <div className="h-8 rounded-sm bg-ink-foreground/[0.06]" />
                  </div>
                  <div className="animate-scan pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-ink-foreground/[0.05] to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating notifications */}
      <div ref={floatA} className="absolute -left-6 top-1/3 hidden lg:block">
        <div className="animate-drift flex items-center gap-3 rounded-lg border border-ink-border bg-ink-raised/90 px-4 py-3 shadow-window backdrop-blur">
          <span className="flex size-8 items-center justify-center rounded-md bg-area-customer/15 text-area-customer">
            <MessageCircle className="size-4" />
          </span>
          <span>
            <span className="block text-xs font-medium text-ink-foreground">WhatsApp follow-up</span>
            <span className="block font-mono text-[0.6rem] text-ink-muted">Queued automatically</span>
          </span>
        </div>
      </div>
      <div ref={floatB} className="absolute -right-6 bottom-16 hidden lg:block">
        <div className="animate-drift flex items-center gap-3 rounded-lg border border-ink-border bg-ink-raised/90 px-4 py-3 shadow-window backdrop-blur" style={{ animationDelay: "-3s" }}>
          <span className="flex size-8 items-center justify-center rounded-md bg-area-business/15 text-area-business">
            <PackageSearch className="size-4" />
          </span>
          <span>
            <span className="block text-xs font-medium text-ink-foreground">Low-stock alert</span>
            <span className="block font-mono text-[0.6rem] text-ink-muted">Reorder suggested</span>
          </span>
        </div>
      </div>
    </div>
  );
}
