import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { MaybeLink } from "./ui";

const HeroScene = lazy(() => import("./HeroScene"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

function Fallback() {
  return (
    <div className="flex h-full items-center justify-center" aria-hidden="true">
      <div className="relative h-64 w-64">
        <div className="absolute inset-0 rounded-full border border-burgundy/30" />
        <div className="absolute inset-8 rounded-full bg-primary/90 shadow-soft" />
        <div className="absolute right-4 top-6 h-14 w-14 rounded-full bg-beige" />
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = !!useReducedMotion();
  const [gl, setGl] = useState<null | boolean>(null);
  const [mobile, setMobile] = useState(false);
  useEffect(() => { setGl(hasWebGL()); setMobile(window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4); }, []);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 160]);
  const scale = useTransform(scrollY, [0, 700], [1, reduce ? 1 : 0.88]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const line = { hidden: { y: "110%" }, show: (i: number) => ({ y: 0, transition: { duration: 1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const } }) };

  return (
    <section id="top" className="grain relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y, opacity, scale }} className="pointer-events-auto absolute inset-0 opacity-60 md:left-[46%] md:opacity-100">
        {gl === null ? null : gl ? <Suspense fallback={<Fallback />}><HeroScene reduced={reduce} mobile={mobile} /></Suspense> : <Fallback />}
      </motion.div>

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs text-foreground backdrop-blur">
          <span className="relative flex h-2 w-2"><span className="absolute inset-0 rounded-full bg-primary animate-pulse-dot" /><span className="relative h-2 w-2 rounded-full bg-primary" /></span>
          Open to Opportunities
        </motion.div>

        <h1 className="max-w-4xl text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.92] text-foreground">
          {["Hi, I'm", "Shruti Sharma."].map((t, i) => (
            <span key={t} className="block overflow-hidden pb-2">
              <motion.span custom={i} variants={line} initial={reduce ? false : "hidden"} animate="show" className={i === 1 ? "block italic text-primary" : "block"}>{t}</motion.span>
            </span>
          ))}
        </h1>

        <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-8 max-w-xl">
          <p className="font-serif text-2xl leading-snug text-foreground md:text-3xl">Building Digital Experiences at the Intersection of Technology &amp; Creativity.</p>
          <p className="eyebrow mt-6 leading-loose">Full-Stack Developer <span className="text-grey">|</span> AI/ML Enthusiast <span className="text-grey">|</span> Computer Science Engineer</p>
        </motion.div>

        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
          <a href="#projects" className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm text-primary-foreground shadow-soft transition-colors hover:bg-accent">
            Explore My Work <ArrowDownRight className="h-4 w-4 transition-transform group-hover:rotate-[-45deg]" />
          </a>
          <a href="#contact" className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-4 text-sm text-foreground transition-colors hover:border-primary hover:text-primary">
            Let's Connect <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <div className="ml-2 flex items-center gap-3 text-muted-foreground">
            <MaybeLink href={profile.github} label="GitHub" className="rounded-full p-2 transition-colors hover:text-primary"><GithubIcon className="h-5 w-5" /></MaybeLink>
            <MaybeLink href={profile.linkedin} label="LinkedIn" className="rounded-full p-2 transition-colors hover:text-primary"><LinkedinIcon className="h-5 w-5" /></MaybeLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
