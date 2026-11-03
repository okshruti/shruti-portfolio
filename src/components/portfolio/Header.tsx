import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-primary" />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-border/70 bg-background/85 py-3 backdrop-blur-md" : "py-6",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <a href="#top" className="font-serif text-2xl italic text-primary">Shruti<span className="not-italic text-foreground">.</span></a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={cn("relative px-4 py-2 text-sm transition-colors", active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                {n.label}
                {active === n.id && <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-px bg-primary" />}
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden rounded-full border border-primary px-5 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-flex">Let's Connect</a>
          <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-6 w-6" /></button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex flex-col bg-primary px-8 py-6 text-primary-foreground md:hidden">
            <button className="self-end" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-7 w-7" /></button>
            <nav className="mt-12 flex flex-col gap-4">
              {nav.map((n, i) => (
                <motion.a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 * i }} className="font-serif text-5xl">
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
