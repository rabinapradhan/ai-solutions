import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "The AI assistant cut our support load by 60% in under a month. It changed how our employees work.",
    name: "Marcus Thorne",
    role: "CTO, Wearside Logistics",
    rating: 5,
  },
  {
    quote:
      "Prototyping speed is unmatched. We went from idea to demo in 11 days — faster than anything we’ve tried.",
    name: "Sarah Jenkins",
    role: "Head of Innovation, Innovate North East",
    rating: 3.5,
  },
  {
    quote:
      "Their proactive monitoring spotted issues our team missed for months. It saved us serious time and cost.",
    name: "David Okafor",
    role: "VP Engineering, BrightSky Health",
    rating: 4,
  },
  {
    quote:
      "Reliable, sharp, and deeply technical. The Sunderland team feels like part of our own.",
    name: "Lin Zhao",
    role: "Operations Director, Pacific FinTech",
    rating: 4.5,
  },
  {
    quote:
      "From discovery to deployment, every step felt considered. Our employees love the new AI tools.",
    name: "Emma Hartley",
    role: "Product Lead, Northern Retail Group",
    rating: 5,
  },
  {
    quote:
      "Predictive AI that understands manufacturing. Saved us six figures in downtime.",
    name: "Rajeev Mehta",
    role: "CIO, Continental Manufacturing",
    rating: 5,
  },
];

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;

  // full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="size-4 text-[#ffc400] " />);
  }

  // half star
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="size-4 text-[#ffc400]" />);
  }

  // empty stars
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar
        key={`empty-${i}`}
        className="size-4 text-muted-foreground/30"
      />,
    );
  }

  return stars;
};

const TestimonialsPage = () => {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
          Testimonials
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
          What our clients say.
        </h1>
        <p className="mt-8 text-lg text-muted-foreground">
          {" "}
          Real feedback from industries using our AI assistants and prototyping
          solutions.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <figure
              key={idx}
              className="rounded-2xl border border-white/10 bg-card p-6"
            >
              <div className="mb-3 flex gap-0.5">
                {/* {Array(5)
                  .fill()
                  .map((_, i) => (
                    <FaStar
                      key={i}
                      className={`size-4 ${
                        i < t.rating
                          ? "text-[#ffc400]"
                          : "text-muted-foreground/30"
                      }`}
                      aria-hidden="true"
                    />
                  ))} */}
                {renderStars(t.rating)}
              </div>
              <blockquote className="text-sm leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TestimonialsPage;
