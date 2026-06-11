import { Link } from "react-router-dom";
import heroImg from "../assets/hero-bg.jpg";
const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <img
        alt=""
        className=" absolute  size-full object-cover opacity-40"
        src={heroImg}
      ></img>
      <div class="absolute inset-0 bg-linear-to-b from-primary-foreground/40 via-primary-foreground/70 to-primary-foreground"></div>
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 md:pt-32">
        <div className="max-w-3xl">
          <h1 class="font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            Innovating the Future of Work with AI.
          </h1>
          <p class="my-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            AI‑Solutions, based in Sunderland, leverages AI‑powered assistants
            and affordable prototyping to help industries proactively resolve
            digital employee challenges — speeding up design, engineering, and
            innovation.
          </p>
          <span>
            Our vision is to support people at work and make a worldwide impact.
          </span>
          <div class="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              class="inline-flex items-center gap-2 rounded-xl bg-primary md:px-7 px-4 py-4 text-sm font-bold text-primary-foreground transition hover:scale-[1.02]"
            >
              Start your project{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-right size-4"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
            <Link
              to="/services"
              class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface px-7 py-4 text-sm font-bold transition hover:bg-[#141b26]"
            >
              Explore solutions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
