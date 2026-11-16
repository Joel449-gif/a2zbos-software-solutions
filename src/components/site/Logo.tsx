import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7 shrink-0", className)}>
      <rect x="0" y="0" width="32" height="32" rx="7" className="fill-signal" />
      <path
        d="M9.5 10.5h13l-13 11h13"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-signal-foreground"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[1.05rem] font-semibold tracking-[-0.04em]">
        A2Z<span className="font-normal opacity-60">BOS</span>
      </span>
    </span>
  );
}
