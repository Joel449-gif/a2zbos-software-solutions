import type { AreaKey } from "@/data/solutions";
import { cn } from "@/lib/utils";

/** Small, distinct illustration for each solution area. Decorative. */
export function AreaGlyph({ area, className }: { area: AreaKey; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative h-36 w-full overflow-hidden", className)}>
      {area === "business" && <BusinessGlyph />}
      {area === "customer" && <CustomerGlyph />}
      {area === "digital" && <DigitalGlyph />}
      {area === "automation" && <AutomationGlyph />}
    </div>
  );
}

const line = "block h-1.5 rounded-full bg-current opacity-15";

function BusinessGlyph() {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-4 pb-2">
      <div className="w-28 rounded-t-md border border-b-0 border-current/15 bg-background/60 p-3 shadow-soft transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
        <span className="mb-2 block h-2 w-10 rounded-full bg-area-business" />
        <span className={cn(line, "w-full")} />
        <span className={cn(line, "mt-1.5 w-3/4")} />
        <span className={cn(line, "mt-1.5 w-5/6")} />
        <div className="mt-3 flex justify-between border-t border-dashed border-current/20 pt-2">
          <span className={cn(line, "w-8")} />
          <span className="block h-1.5 w-6 rounded-full bg-area-business" />
        </div>
      </div>
      <div className="flex h-20 items-end gap-1.5">
        {[40, 65, 50, 85].map((h, i) => (
          <span
            key={i}
            className="w-3 origin-bottom rounded-t-sm bg-area-business/70 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-110"
            style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function CustomerGlyph() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-28 w-56">
        <div className="absolute left-0 top-2 flex items-center gap-2 rounded-lg rounded-bl-sm border border-current/15 bg-background/70 px-3 py-2 shadow-soft transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-x-1">
          <span className="size-5 rounded-full bg-area-customer/50" />
          <span className={cn(line, "w-16")} />
        </div>
        <div className="absolute right-0 top-11 flex items-center gap-2 rounded-lg rounded-br-sm bg-area-customer px-3 py-2 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
          <span className="block h-1.5 w-20 rounded-full bg-background/60" />
        </div>
        <div className="absolute bottom-0 left-6 flex -space-x-2">
          {[0.9, 0.6, 0.35].map((o, i) => (
            <span key={i} className="size-7 rounded-full border-2 border-background bg-area-customer" style={{ opacity: o }} />
          ))}
          <span className="flex size-7 items-center justify-center rounded-full border-2 border-background bg-foreground/10 font-mono text-[0.55rem]">+</span>
        </div>
      </div>
    </div>
  );
}

function DigitalGlyph() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-56 overflow-hidden rounded-md border border-current/15 bg-background/70 shadow-soft transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5">
        <div className="flex items-center gap-1 border-b border-current/10 px-2.5 py-1.5">
          <span className="size-1.5 rounded-full bg-current opacity-20" />
          <span className="size-1.5 rounded-full bg-current opacity-20" />
          <span className="ml-2 h-1.5 w-16 rounded-full bg-current opacity-10" />
        </div>
        <div className="grid grid-cols-5 gap-2 p-3">
          <div className="col-span-3 space-y-1.5">
            <span className={cn(line, "h-2 w-full opacity-25")} />
            <span className={cn(line, "h-2 w-2/3 opacity-25")} />
            <span className="mt-2 block h-3 w-12 rounded-sm bg-area-digital" />
          </div>
          <div className="col-span-2 rounded-sm bg-gradient-to-br from-area-digital/70 to-area-digital/15" />
          <div className="col-span-5 grid grid-cols-3 gap-1.5 pt-1">
            <span className="h-6 rounded-sm bg-current opacity-[0.07]" />
            <span className="h-6 rounded-sm bg-current opacity-[0.07]" />
            <span className="h-6 rounded-sm bg-current opacity-[0.07]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationGlyph() {
  return (
    <svg viewBox="0 0 240 140" className="absolute inset-0 h-full w-full">
      <path d="M40 70 H 100" className="stroke-current opacity-30 animate-dash" strokeWidth="1.5" fill="none" />
      <path d="M140 70 C 165 70, 165 35, 200 35" className="stroke-current opacity-30 animate-dash" strokeWidth="1.5" fill="none" />
      <path d="M140 70 C 165 70, 165 105, 200 105" className="stroke-current opacity-30 animate-dash" strokeWidth="1.5" fill="none" />
      <rect x="18" y="56" width="28" height="28" rx="6" className="fill-background stroke-current" strokeOpacity="0.25" />
      <rect x="100" y="50" width="40" height="40" rx="8" className="fill-area-automation transition-transform duration-700 [transform-box:fill-box] [transform-origin:center] group-hover:rotate-45" />
      <path d="M114 70 l4 4 l8 -8" className="stroke-signal-foreground" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="196" y="22" width="26" height="26" rx="6" className="fill-background stroke-current" strokeOpacity="0.25" />
      <rect x="196" y="92" width="26" height="26" rx="6" className="fill-background stroke-current" strokeOpacity="0.25" />
      <circle cx="32" cy="70" r="4" className="fill-area-automation" />
    </svg>
  );
}
