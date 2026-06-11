import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Marcus Thorne",
    company: "CTO, Wearside Logistics",
    text: "AI-Solutions delivered a virtual assistant that cut our support load by 60% in under a month. Truly transformative.",
    rating: 5,
  },
  {
    name: "Sarah Jenkins",
    company: "Head of Innovation, Innovate North East",
    text: "The prototyping speed is unmatched. We went from idea to working demo in 11 days.",
    rating: 5,
  },
  {
    name: "David Okafor",
    company: "VP Engineering, BrightSky Health",
    text: "Their proactive monitoring caught friction points our team had missed for months. Brilliant work.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#0b121d]/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Trusted by industry leaders
          </h2>
          <Link
            to="/testimonials"
            className="text-sm font-medium text-[#00d6bb] hover:underline"
          >
            All testimonials →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <figure
              key={index}
              className="rounded-2xl border border-white/10 bg-card p-6"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-[#ffc400]"
                    size={16}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-[#fcf7f8]/90">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-[#95a0ab]">{t.company}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
