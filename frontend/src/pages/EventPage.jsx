import { useEffect, useState } from "react";
import { MapPin, Calendar } from "lucide-react";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await res.json();

      setEvents(
        Array.isArray(data)
          ? data
          : Array.isArray(data.events)
            ? data.events
            : [],
      );
    } catch (err) {
      console.error("Fetch events error:", err);

      setError("Unable to load events.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
          Events & Gallery
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

        {loading ? (
          <p className="text-muted-foreground">Loading events...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : events.length === 0 ? (
          <p className="text-muted-foreground">No upcoming events.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="rounded-2xl border border-white/10 bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-primary">
                  <Calendar size={15} />

                  {formatDate(event.event_date)}
                </div>

                <h3 className="font-display text-lg font-semibold">
                  {event.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={15} />
                  {event.location || "Location unavailable"}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-8 font-display text-2xl font-semibold">Gallery</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            {
              title: "Prototype Lab",
              image:
                "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
            },
            {
              title: "Team Offsite",
              image:
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
            },
            {
              title: "Innovation Awards",
              image:
                "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=80",
            },
            {
              title: "Sunderland HQ",
              image:
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
            },
            {
              title: "Workshop",
              image:
                "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80",
            },
          ].map((item) => (
            <figure
              key={item.title}
              className="group overflow-hidden rounded-xl border border-white/10 bg-card"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width="1200"
                  height="1200"
                  className="size-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <figcaption className="p-3 text-xs text-muted-foreground">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
};

export default EventPage;
