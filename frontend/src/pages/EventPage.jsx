import { MapPin, Calendar } from "lucide-react";
const Events = () => {
  return (
    <main classNameName="flex-1">
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-24">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
          Events &amp; Gallery
        </p>
        <h1 className="font-display text-4xl font-bold md:text-6xl">
          Where you'll find us.
        </h1>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="mb-8 font-display text-2xl font-semibold">
          Upcoming events
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-card p-6">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-primary">
              <Calendar size={15} />
              30 June 2026
            </div>
            <h3 className="font-display text-lg font-semibold">
              Open House: Meet the Engineers
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Drop in, see demos, and chat with our team.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={15} />
              AI-Solutions HQ, Sunderland
            </div>
          </article>
          <article className="rounded-2xl border border-white/10 bg-card p-6">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-primary">
              <Calendar size={15} />
              22 July 2026
            </div>
            <h3 className="font-display text-lg font-semibold">
              Prototype Lab: Live Workshop
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Hands-on session building an AI virtual assistant in 90 minutes.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={15} />
              AI-Solutions HQ, Sunderland
            </div>
          </article>
          <article className="rounded-2xl border border-white/10 bg-card p-6">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-primary">
              <Calendar size={15} />8 August 2026
            </div>
            <h3 className="font-display text-lg font-semibold">
              Enterprise AI Roundtable
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Invitation-only discussion for CIOs and Heads of Digital.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={15} />
              The Beacon, Newcastle
            </div>
          </article>
          <article className="rounded-2xl border border-white/10 bg-card p-6">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-primary">
              <Calendar size={15} />
              15 September 2026
            </div>
            <h3 className="font-display text-lg font-semibold">
              AI North Summit 2026
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Annual gathering of AI builders and operators from across the
              North of England.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={15} />
              Sunderland Software City
            </div>
          </article>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-8 font-display text-2xl font-semibold">Gallery</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <figure className="group overflow-hidden rounded-xl border border-white/10 bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                alt="Prototype Lab"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&amp;q=80"
              />
            </div>
            <figcaption className="p-3 text-xs text-muted-foreground">
              Prototype Lab
            </figcaption>
          </figure>

          <figure className="group overflow-hidden rounded-xl border border-white/10 bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                alt="Team Offsite"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&amp;q=80"
              />
            </div>
            <figcaption className="p-3 text-xs text-muted-foreground">
              Team Offsite
            </figcaption>
          </figure>

          <figure className="group overflow-hidden rounded-xl border border-white/10 bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                alt="Innovation Awards"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
                src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&amp;q=80"
              />
            </div>
            <figcaption className="p-3 text-xs text-muted-foreground">
              Innovation Awards
            </figcaption>
          </figure>

          <figure className="group overflow-hidden rounded-xl border border-white/10 bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                alt="Sunderland HQ"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&amp;q=80"
              />
            </div>
            <figcaption className="p-3 text-xs text-muted-foreground">
              Sunderland HQ
            </figcaption>
          </figure>
          <figure className="group overflow-hidden rounded-xl border border-white/10 bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                alt="Workshop"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&amp;q=80"
              />
            </div>
            <figcaption className="p-3 text-xs text-muted-foreground">
              Workshop
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
};

export default Events;
