import { useState } from "react";
import type React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Award, Download, GraduationCap, ImageIcon, Plus, Trophy, X } from "lucide-react";
import { GithubIcon } from "./Icons";
import { about, achievements, certifications, profile, summary, education, experience, projects, skills, stats, type Project } from "@/data/portfolio";
import { Counter, Reveal, SectionHeading } from "./ui";

const wrap = "mx-auto max-w-7xl px-6 md:px-10";

export function About() {
  return (
    <section id="about" className={`section-pad ${wrap}`}>
      <SectionHeading index="01" eyebrow="About" title={<>A Little <em className="text-primary">About Me</em></>} />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground md:col-span-7">
          <Reveal>
            <div className="rounded-sm border-l-2 border-primary bg-card p-6">
              <p className="eyebrow mb-2">Professional Summary</p>
              <p className="text-base text-foreground">{summary}</p>
            </div>
          </Reveal>
          {about.map((p, i) => <Reveal key={i} delay={i * 0.08}><p className={i === 0 ? "font-serif text-2xl leading-snug text-foreground md:text-3xl" : ""}>{p}</p></Reveal>)}
        </div>
        <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-sm border border-border bg-border md:col-span-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-card p-6 md:p-8">
              <div className="font-serif text-5xl text-primary md:text-6xl"><Counter to={s.value} suffix={s.suffix} /></div>
              <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
          <div className="col-span-2 bg-card p-6 md:p-8">
            {profile.resume ? (
              <a href={profile.resume} download className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-sm text-primary-foreground transition-colors hover:bg-accent">
                <Download className="h-4 w-4" /> Download Resume
              </a>
            ) : (
              <span aria-disabled="true" title="Resume coming soon" className="inline-flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-full bg-primary/60 px-6 py-4 text-sm text-primary-foreground">
                <Download className="h-4 w-4" /> Resume coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const spans = ["md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-4"];
  return (
    <section id="skills" className="section-pad bg-secondary">
      <div className={wrap}>
        <SectionHeading index="02" eyebrow="Toolkit" title={<>Technical <em className="text-primary">Skills</em></>} />
        <div className="grid gap-4 md:grid-cols-12">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className={spans[i]}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="group h-full rounded-sm border border-border bg-card p-7 transition-shadow hover:shadow-soft">
                <div className="mb-6 flex items-baseline justify-between">
                  <h3 className="text-3xl text-foreground transition-colors group-hover:text-primary">{s.title}</h3>
                  <span className="eyebrow">0{i + 1}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((it) => <li key={it} className="rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors group-hover:border-burgundy/40">{it}</li>)}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mockup({ kind, image, name }: { kind: Project["mock"]; image?: string; name?: string }) {
  if (image) return <img src={image} alt={`${name} screenshot`} loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />;
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-primary p-5" aria-hidden="true">
      <div className="flex h-full flex-col rounded-sm bg-ivory shadow-soft transition-transform duration-700 group-hover:scale-[1.03]">
        <div className="flex gap-1.5 border-b border-border p-2.5">{[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 rounded-full bg-beige" />)}</div>
        {kind === "learning" && (
          <div className="grid flex-1 grid-cols-3 gap-2 p-3">
            <div className="col-span-1 space-y-2">{[60, 80, 45, 70].map((w) => <div key={w} className="h-2 rounded bg-beige" style={{ width: `${w}%` }} />)}</div>
            <div className="col-span-2 space-y-2">
              <div className="h-3 w-1/2 rounded bg-charcoal/70" />
              <div className="h-2 w-full rounded-full bg-beige"><motion.div className="h-2 rounded-full bg-burgundy" initial={{ width: "10%" }} whileInView={{ width: "68%" }} transition={{ duration: 1.4 }} /></div>
              <div className="grid grid-cols-2 gap-2 pt-1">{[0, 1, 2, 3].map((k) => <div key={k} className="h-10 rounded bg-secondary" />)}</div>
            </div>
          </div>
        )}
        {kind === "store" && (
          <div className="grid flex-1 grid-cols-3 gap-2 p-3">
            {[0, 1, 2].map((k) => (
              <div key={k} className="flex flex-col gap-1.5">
                <motion.div className="flex-1 rounded bg-secondary" whileHover={{ scale: 1.05 }} style={{ background: k === 1 ? "var(--burgundy)" : undefined }} />
                <div className="h-1.5 w-3/4 rounded bg-charcoal/60" /><div className="h-1.5 w-1/3 rounded bg-burgundy/70" />
              </div>
            ))}
          </div>
        )}
        {kind === "ai" && (
          <div className="flex flex-1 items-center justify-around p-3">
            <div className="h-20 w-14 rounded bg-secondary" />
            <motion.div className="flex gap-1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>{[0, 1, 2].map((k) => <span key={k} className="h-1.5 w-1.5 rounded-full bg-burgundy" />)}</motion.div>
            <div className="grid grid-cols-2 gap-1.5">{[0, 1, 2, 3].map((k) => <div key={k} className={`h-9 w-9 rounded ${k % 3 === 0 ? "bg-primary" : "bg-beige"}`} />)}</div>
          </div>
        )}
      </div>
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-[11px] text-muted-foreground"><ImageIcon className="h-3 w-3" />Screenshot coming soon</span>
    </div>
  );
}

function Detail({ title, text }: { title: string; text: string }) {
  if (!text) return null;
  return <><h4 className="eyebrow mt-8 mb-3">{title}</h4><p className="text-foreground">{text}</p></>;
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <section id="projects" className={`section-pad ${wrap}`}>
      <SectionHeading index="03" eyebrow="Selected Work" title={<>Featured <em className="text-primary">Projects</em></>} />
      <div className="space-y-6">
        {projects.map((p, i) => (
          <Reveal key={p.no} delay={0.05 * i}>
            <button onClick={() => setOpen(p)} className="group grid w-full gap-8 rounded-sm border-t border-border py-10 text-left transition-colors hover:bg-card/60 focus-visible:outline-2 focus-visible:outline-primary md:grid-cols-12 md:items-center md:px-4">
              <div className="md:col-span-5"><Mockup kind={p.mock} image={p.image} name={p.name} /></div>
              <div className="md:col-span-7">
                <p className="eyebrow mb-3">Project {p.no}</p>
                <h3 className="break-words text-4xl text-foreground transition-colors group-hover:text-primary md:text-6xl">{p.name}</h3>
                <p className="mt-2 font-serif text-xl italic text-muted-foreground">{p.tagline}</p>
                <p className="mt-5 max-w-xl text-muted-foreground">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">{p.tech.map((t) => <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground">{t}</span>)}</div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-primary">View details <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" /></span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] flex items-end justify-center bg-charcoal/50 backdrop-blur-sm md:items-center md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div role="dialog" aria-modal="true" aria-label={open.name} onClick={(e) => e.stopPropagation()} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-sm bg-card p-8 md:rounded-sm md:p-12">
              <div className="mb-6 flex items-start justify-between">
                <div><p className="eyebrow">Project {open.no}</p><h3 className="mt-2 text-5xl text-primary">{open.name}</h3><p className="font-serif text-xl italic text-muted-foreground">{open.tagline}</p></div>
                <button onClick={() => setOpen(null)} aria-label="Close" className="rounded-full border border-border p-2 hover:border-primary hover:text-primary"><X className="h-5 w-5" /></button>
              </div>
              <Mockup kind={open.mock} image={open.image} name={open.name} />
              <Detail title="Problem Statement" text={open.problem || open.description} />
              <Detail title="Architecture" text={open.architecture} />
              <Detail title="My Contribution" text={open.contribution} />
              <Detail title="Challenges" text={open.challenges} />
              <h4 className="eyebrow mt-8 mb-4">Highlights</h4>
              <ul className="space-y-2">{open.highlights.map((h) => <li key={h} className="flex gap-3 text-foreground"><span className="mt-2.5 h-px w-4 shrink-0 bg-primary" />{h}</li>)}</ul>
              <h4 className="eyebrow mt-8 mb-4">Technologies</h4>
              <div className="flex flex-wrap gap-2">{open.tech.map((t) => <span key={t} className="rounded-full border border-border px-3 py-1 text-sm">{t}</span>)}</div>
              <div className="mt-10 flex flex-wrap gap-3">
                {open.link && <a href={open.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:bg-accent">Live demo <ArrowUpRight className="h-4 w-4" /></a>}
                {open.github && <a href={open.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:border-primary hover:text-primary"><GithubIcon className="h-4 w-4" />Source code</a>}
                {!open.link && !open.github && <span className="text-sm text-muted-foreground">Project links coming soon.</span>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section-pad bg-primary text-primary-foreground">
      <div className={wrap}>
        <Reveal className="mb-12">
          <p className="eyebrow mb-5 !text-beige">04 — Experience</p>
          <h2 className="text-5xl md:text-7xl">Where I've <em className="text-beige">Worked</em></h2>
        </Reveal>
        <ol className="relative border-l border-primary-foreground/20 md:ml-4">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.1} className="relative pb-10 pl-8 last:pb-0 md:pl-12">
              <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-beige bg-primary" />
              <li className="grid gap-4 md:grid-cols-12 md:gap-6">
                <div className="md:col-span-4">
                  <p className="inline-block rounded-full border border-beige/40 px-3 py-1 text-sm text-beige">{e.period}</p>
                  <p className="mt-2 text-sm text-primary-foreground/60">{e.place}</p>
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-3xl md:text-4xl">{e.company}</h3>
                  <p className="mt-1 font-serif text-xl italic text-beige">{e.role}</p>
                  <ul className="mt-4 space-y-1.5 text-primary-foreground/80">{e.points.map((p) => <li key={p} className="flex gap-3"><span className="mt-2.5 h-px w-4 shrink-0 bg-beige" />{p}</li>)}</ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className={`section-pad ${wrap}`}>
      <SectionHeading index="05" eyebrow="Learning" title={<>Education &amp; <em className="text-primary">Certifications</em></>} />
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="eyebrow mb-2">Academic Qualifications</h3>
          {education.map((ed, i) => (
            <Reveal key={ed.degree} delay={i * 0.1}>
              <div className="flex gap-6 rounded-sm border border-border bg-card p-7 transition-shadow hover:shadow-soft">
                <GraduationCap className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <p className="eyebrow">{ed.year}{ed.note && ` · ${ed.note}`}</p>
                  <h3 className="mt-2 text-3xl">{ed.school}</h3>
                  <p className="mt-1 text-muted-foreground">{ed.degree}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="space-y-12">
          <ListGroup title="Certifications" icon={<Award className="h-5 w-5 text-burgundy" />} items={certifications} />
          <ListGroup title="Achievements" icon={<Trophy className="h-5 w-5 text-burgundy" />} items={achievements} />
        </div>
      </div>
    </section>
  );
}

function ListGroup({ title, icon, items }: { title: string; icon: React.ReactNode; items: { title: string; year: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow mb-2">{title}</h3>
      <ul className="divide-y divide-border border-y border-border">
        {items.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <li className="group flex items-center justify-between gap-6 py-5">
              <div className="flex items-center gap-4">{icon}<span className="font-serif text-xl transition-colors group-hover:text-primary md:text-2xl">{c.title}</span></div>
              <span className="shrink-0 text-sm text-muted-foreground">{c.year}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
