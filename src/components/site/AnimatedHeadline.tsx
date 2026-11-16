import { cn } from "@/lib/utils";

/** Splits text into words that rise in sequence. `accent` words render in the serif italic. */
export function AnimatedHeadline({
  text,
  accent = [],
  className,
  baseDelay = 0,
}: {
  text: string;
  accent?: string[];
  className?: string;
  baseDelay?: number;
}) {
  const words = text.split(" ");
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span
            className={cn("inline-block animate-rise", accent.includes(word) && "font-accent pr-[0.06em] text-signal")}
            style={{ animationDelay: `${baseDelay + i * 70}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </h1>
  );
}
