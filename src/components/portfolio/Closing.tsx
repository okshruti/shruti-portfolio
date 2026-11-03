import { useMemo, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUp, Check, Copy, Mail, Phone, Send } from "lucide-react";
import { aiPractice, aiTopics, nav, profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { MaybeLink, Reveal } from "./ui";

function NeuralNet() {
  const reduce = useReducedMotion();
  const layers = [4, 6, 6, 3];
  const nodes = useMemo(() => layers.flatMap((n, li) => Array.from({ length: n }, (_, i) => ({ x: 60 + li * 160, y: 40 + ((i + 0.5) * 320) / n, li }))), []);
  const edges = nodes.flatMap((a) => nodes.filter((b) => b.li === a.li + 1).map((b) => [a, b] as const));
  return (
    <svg viewBox="0 0 600 400" className="h-full w-full" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <motion.line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--beige)" strokeWidth={0.6}
          initial={{ opacity: 0.08 }} animate={reduce ? {} : { opacity: [0.08, 0.5, 0.08] }}
          transition={{ duration: 3, repeat: Infinity, delay: (i % 17) * 0.18 }} />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={6} fill="var(--maroon)" stroke="var(--beige)" strokeWidth={1.2}
          animate={reduce ? {} : { scale: [1, 1.25, 1] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.12 }} />
      ))}
    </svg>
  );
}

export function AIInterest() {
  return (
    <section className="section-pad overflow-hidden bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center md:px-10">
        <Reveal>
          <p className="eyebrow mb-5 !text-beige">06 — Curiosity</p>
          <h2 className="text-5xl leading-[0.95] md:text-7xl">Beyond Development: <em className="text-beige">Exploring Intelligence.</em></h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ivory/70">
            I'm fascinated by the possibilities of Artificial Intelligence and how intelligent systems can transform everyday experiences. My interests include Machine Learning, Deep Learning, Generative AI, Agentic AI and Retrieval-Augmented Generation (RAG).
          </p>
        </Reveal>
        <Reveal delay={0.15} className="aspect-[3/2]"><NeuralNet /></Reveal>
      </div>
      <div className="mx-auto mt-16 grid max-w-7xl gap-10 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <p className="eyebrow mb-5 !text-beige">Learning Interests</p>
          <dl className="grid gap-4 sm:grid-cols-2">
            {aiTopics.map((t) => (
              <div key={t.name} className="rounded-sm border border-ivory/15 p-5">
                <dt className="font-serif text-2xl text-beige">{t.name}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ivory/70">{t.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="md:col-span-5">
          <p className="eyebrow mb-5 !text-beige">Practical Experience</p>
          <ul className="space-y-4">{aiPractice.map((a) => <li key={a} className="flex gap-3 text-ivory/85"><span className="mt-2.5 h-px w-4 shrink-0 bg-beige" />{a}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
  };
  type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opened" | "error">("idle");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const next: Errors = {};
    if (v("name").length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) next.email = "Please enter a valid email address.";
    if (v("subject").length < 3) next.subject = "Please add a short subject.";
    if (v("message").length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) { setStatus("idle"); return; }
    try {
      const body = `${v("message")}\n\n— ${v("name")} (${v("email")})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(v("subject"))}&body=${encodeURIComponent(body)}`;
      setStatus("opened");
    } catch { setStatus("error"); }
  };
  const err = (k: keyof Errors) => errors[k] ? <span className="mt-1 block text-xs text-destructive" role="alert">{errors[k]}</span> : null;
  const field = "w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors placeholder:text-grey focus:border-primary";
  return (
    <section id="contact" className="section-pad mx-auto max-w-7xl px-6 md:px-10">
      <Reveal>
        <p className="eyebrow mb-5">07 — Contact</p>
        <h2 className="max-w-4xl text-5xl leading-[0.95] md:text-8xl">Have an idea? <em className="text-primary">Let's build something meaningful.</em></h2>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">I'm always interested in connecting with people, exploring opportunities and discussing technology.</p>
      </Reveal>
      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <Reveal className="space-y-8 md:col-span-5">
          <div>
            <p className="eyebrow mb-2">Email</p>
            <div className="flex items-center gap-3">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 font-serif text-2xl hover:text-primary md:text-3xl"><Mail className="h-5 w-5 text-primary" />{profile.email}</a>
              <button onClick={copy} aria-label="Copy email" className="rounded-full border border-border p-2 transition-colors hover:border-primary hover:text-primary">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</button>
            </div>
            <p className="mt-1 h-5 text-sm text-primary" aria-live="polite">{copied ? "Email copied to clipboard" : ""}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Phone</p>
            <a href={profile.phoneHref} className="flex items-center gap-3 font-serif text-2xl hover:text-primary md:text-3xl"><Phone className="h-5 w-5 text-primary" />{profile.phone}</a>
          </div>
          <div className="flex gap-3">
            <MaybeLink href={profile.github} label="GitHub" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary"><GithubIcon className="h-4 w-4" />GitHub</MaybeLink>
            <MaybeLink href={profile.linkedin} label="LinkedIn" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary"><LinkedinIcon className="h-4 w-4" />LinkedIn</MaybeLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7">
          <form noValidate onSubmit={submit} className="grid gap-6 rounded-sm border border-border bg-card p-8 md:grid-cols-2 md:p-10">
            <label className="block"><span className="eyebrow">Name</span><input name="name" required maxLength={100} className={field} placeholder="Your name" aria-invalid={!!errors.name} />{err("name")}</label>
            <label className="block"><span className="eyebrow">Email</span><input name="email" type="email" required maxLength={255} className={field} placeholder="you@example.com" aria-invalid={!!errors.email} />{err("email")}</label>
            <label className="block md:col-span-2"><span className="eyebrow">Subject</span><input name="subject" required maxLength={150} className={field} placeholder="What's this about?" aria-invalid={!!errors.subject} />{err("subject")}</label>
            <label className="block md:col-span-2"><span className="eyebrow">Message</span><textarea name="message" required maxLength={2000} rows={5} className={`${field} resize-none`} placeholder="Tell me about your idea..." aria-invalid={!!errors.message} />{err("message")}</label>
            <button type="submit" className="group inline-flex w-fit items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm text-primary-foreground transition-colors hover:bg-accent md:col-span-2">
              Send Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-sm md:col-span-2" aria-live="polite">
              {status === "opened" && <span className="text-primary">Your email app should now open with the message ready — press send there to deliver it. If nothing opened, email {profile.email} directly.</span>}
              {status === "error" && <span className="text-destructive">Couldn't open your email app. Please email {profile.email} directly.</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-serif text-xl">Designed &amp; Built with curiosity by <em className="text-primary">Shruti Sharma</em>.</p>
        <nav className="flex flex-wrap gap-5 text-sm text-muted-foreground" aria-label="Footer">
          {nav.map((n) => <a key={n.id} href={`#${n.id}`} className="hover:text-primary">{n.label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <MaybeLink href={profile.github} label="GitHub" className="p-2 hover:text-primary"><GithubIcon className="h-5 w-5" /></MaybeLink>
          <MaybeLink href={profile.linkedin} label="LinkedIn" className="p-2 hover:text-primary"><LinkedinIcon className="h-5 w-5" /></MaybeLink>
          <a href="#top" aria-label="Back to top" className="ml-2 rounded-full bg-primary p-3 text-primary-foreground transition-transform hover:-translate-y-1"><ArrowUp className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
