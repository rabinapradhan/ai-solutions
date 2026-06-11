import {
  Bot,
  Rocket,
  Cpu,
  Sparkles,
  ShieldCheck,
  ChartColumn,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
        <p class="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
          Services
        </p>
        <h1 class="font-display text-4xl font-bold leading-tight md:text-6xl">
          AI‑Solutions built for the way you work.
        </h1>
        <p class="mt-8 text-lg text-muted-foreground">
          From AI assistants to rapid prototyping, every solution is designed to
          improve the digital employee experience.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border-primary/40">
            <div class="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <Bot size={20} className="text-primary" />
            </div>
            <h3 class="font-display text-lg font-semibold">
              AI Virtual Assistants
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Smart assistants that answer employee questions, escalate when
              needed, and learn over time.
            </p>
          </div>

          {/**2nd */}
          <div class="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border-primary/40">
            <div class="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <Rocket size={20} className="text-primary " />
            </div>
            <h3 class="font-display text-lg font-semibold">
              Rapid Prototyping
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Affordable AI prototypes delivered in days, not months. From idea
              to demo in 14 days.
            </p>
          </div>
          {/**3rd */}
          <div class="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border-primary/40">
            <div class="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <Cpu size={20} className="text-primary" />
            </div>
            <h3 class="font-display text-lg font-semibold">
              Industry Solutions
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Tailored AI tools for logistics, healthcare, fintech, retail, and
              manufacturing.
            </p>
          </div>
          <div class="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border-primary/40">
            <div class="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <Sparkles size={20} className="text-primary" />
            </div>
            <h3 class="font-display text-lg font-semibold">
              AI Software Solutions
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Custom AI features added to your existing systems to make them
              smarter.
            </p>
          </div>
          <div class="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border-primary/40">
            <div class="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <ShieldCheck className="text-primary" size={20} />
            </div>
            <h3 class="font-display text-lg font-semibold">
              Enterprise Security
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Secure access, encryption, and compliance built into every
              solution.
            </p>
          </div>
          <div class="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border-primary/40">
            <div class="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <ChartColumn size={20} className="text-primary" />
            </div>
            <h3 class="font-display text-lg font-semibold">
              Analytics &amp; Optimization
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Continuous monitoring to spot friction points early and boost
              productivity.
            </p>
          </div>
        </div>
        <div class="mt-16 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-10 text-center">
          <h2 class="font-display text-3xl font-bold">
            Got a workplace challenge?
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-muted-foreground">
            Share it with us — our Sunderland team will respond within 24 hours.
          </p>
          <Link
            to="/contact"
            class="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
          >
            Request a consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
