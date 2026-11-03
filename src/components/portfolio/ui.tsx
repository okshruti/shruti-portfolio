import { motion, useInView, useReducedMotion, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string | undefined }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, eyebrow, title, className }: { index: string; eyebrow: string; title: ReactNode; className?: string }) {
  return (
    <Reveal className={cn("mb-14 md:mb-20", className)}>
      <p className="eyebrow mb-5 flex items-center gap-4">
        <span>{index}</span>
        <span className="h-px w-12 bg-burgundy/50" />
        <span>{eyebrow}</span>
      </p>
      <h2 className="text-5xl leading-[0.95] text-foreground md:text-7xl">{title}</h2>
    </Reveal>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(to);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || reduce) return;
    const from = to > 1000 ? to - 30 : 0;
    const c = animate(from, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/** Shows a link when a URL exists; otherwise a non-clickable "coming soon" label (no dead links). */
export function MaybeLink({ href, children, className, label }: { href: string; children: ReactNode; className?: string; label: string }) {
  if (!href) {
    return (
      <span className={cn(className, "cursor-not-allowed opacity-50")} title={`${label} link coming soon`} aria-label={`${label} (link coming soon)`}>
        {children}
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  );
}
