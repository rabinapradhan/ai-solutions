import { useEffect, useState } from "react";
import { MapPin, Calendar } from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setEvents(data);
      } else if (Array.isArray(data.events)) {
        setEvents(data.events);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-24">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
          Events &amp; Gallery
        </p>

        <h1 className="font-display text-4xl font-bold md:text-6xl">
          Where you'll find us.
        </h1>
      </section>

      {/* EVENTS */}

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="mb-8 font-display text-2xl font-semibold">
          Upcoming Events
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.length === 0 ? (
            <p className="text-muted-foreground">No upcoming events.</p>
          ) : (
            events.map((event) => (
              <article
                key={event.id}
                className="rounded-2xl border border-white/10 bg-card p-6"
              >
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-primary">
                  <Calendar size={15} />

                  {new Date(event.event_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <h3 className="font-display text-lg font-semibold">
                  {event.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={15} />
                  {event.location}
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* GALLERY */}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-8 font-display text-2xl font-semibold">Gallery</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <figure className="group overflow-hidden rounded-xl border border-white/10 bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80"
                alt="Prototype Lab"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
              />
            </div>

            <figcaption className="p-3 text-xs text-muted-foreground">
              Prototype Lab
            </figcaption>
          </figure>

          <figure className="group overflow-hidden rounded-xl border border-white/10 bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt="Team Offsite"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
              />
            </div>

            <figcaption className="p-3 text-xs text-muted-foreground">
              Team Offsite
            </figcaption>
          </figure>

          <figure className="group overflow-hidden rounded-xl border border-white/10 bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=80"
                alt="Innovation Awards"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
              />
            </div>

            <figcaption className="p-3 text-xs text-muted-foreground">
              Innovation Awards
            </figcaption>
          </figure>

          <figure className="group overflow-hidden rounded-xl border border-white/10 bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                alt="Sunderland HQ"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
              />
            </div>

            <figcaption className="p-3 text-xs text-muted-foreground">
              Sunderland HQ
            </figcaption>
          </figure>

          <figure className="group overflow-hidden rounded-xl border border-white/10 bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80"
                alt="Workshop"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
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
