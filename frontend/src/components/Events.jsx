import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
const Events = () => {
  return (
    <section class="mx-auto max-w-7xl px-6 py-24">
      <div class="mb-12 flex items-end justify-between">
        <h2 class="font-display text-3xl font-bold md:text-4xl">
          Upcoming events
        </h2>
        <Link
          to="/events"
          class="text-sm font-medium text-primary hover:underline"
        >
          All events →
        </Link>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        <article class="rounded-2xl border border-white/10 bg-card p-6">
          <div class="mb-3 inline-flex items-center gap-2 text-xs font-medium text-primary">
            <Calendar size={15} />
            30 June 2026
          </div>
          <h3 class="font-display text-lg font-semibold">
            Open House: Meet the Engineers
          </h3>
          <p class="mt-2 text-sm text-muted-foreground">
            AI-Solutions HQ, Sunderland
          </p>
        </article>
        <article class="rounded-2xl border border-white/10 bg-card p-6">
          <div class="mb-3 inline-flex items-center gap-2 text-xs font-medium text-primary">
            <Calendar size={15} />
            22 July 2026
          </div>
          <h3 class="font-display text-lg font-semibold">
            Prototype Lab: Live Workshop
          </h3>
          <p class="mt-2 text-sm text-muted-foreground">
            AI-Solutions HQ, Sunderland
          </p>
        </article>
        <article class="rounded-2xl border border-white/10 bg-card p-6">
          <div class="mb-3 inline-flex items-center gap-2 text-xs font-medium text-primary">
            <Calendar size={15} />8 August 2026
          </div>
          <h3 class="font-display text-lg font-semibold">
            Enterprise AI Roundtable
          </h3>
          <p class="mt-2 text-sm text-muted-foreground">
            The Beacon, Newcastle
          </p>
        </article>
      </div>
    </section>
  );
};

export default Events;
