import { FiTarget } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
const About = () => {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
          About AI-Solutions
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
          Delivering AI solutions that accelerate design, engineering, and
          innovation
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          AI‑Solutions is a Sunderland‑based startup leveraging AI to help
          industries proactively resolve issues impacting the digital employee
          experience. Our unique focus on an AI‑powered virtual assistant and
          affordable prototyping sets us apart from competitors.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#09101a] p-8">
            <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <FiTarget size={24} className=" text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold"> Mission</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Innovate, promote, and deliver the future of the digital employee
              experience — supporting people at work.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#09101a] p-8">
            <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <MdOutlineRemoveRedEye size={24} className=" text-primary" />
            </div>

            <h2 className="font-display text-xl font-semibold">Vision</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A world where AI empowers people by removing friction from digital
              workflows, enabling faster innovation and global collaboration.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#09101a] p-8">
            <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <FaRegHeart size={22} className=" text-primary" />
            </div>
            <h2 class="font-display text-xl font-semibold">Values</h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Curiosity, craft, collaboration, and customer obsession — values
              that drive every solution we deliver
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#09101a] p-8">
            <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <LuUsers size={22} className=" text-primary" />
            </div>
            <h2 class="font-display text-xl font-semibold">Team</h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Our Sunderland‑based team of engineers, designers, and researchers
              collaborates globally to deliver AI solutions that improve
              employee experiences across industries.
            </p>
          </div>
        </div>
      </section>
      <section className="border-t border-white/5 bg-surface/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <h2 class="font-display text-3xl font-bold">Our story</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Founded in Sunderland in 2023, AI‑Solutions began with a simple
              observation: workplace software often creates friction instead of
              removing it. We set out to build AI software that proactively
              resolves these challenges, with a unique focus on virtual
              assistants and affordable prototyping.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Today, we partner with clients across logistics, healthcare,
              fintech, and manufacturing, while staying rooted in our North East
              home.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#09101a] p-6">
              <div class="font-display text-3xl font-bold text-primary">
                2023
              </div>
              <div class="mt-1 text-sm text-muted-foreground">
                Founded in Sunderland
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#09101a] p-6">
              <div class="font-display text-3xl font-bold text-primary">
                40+
              </div>
              <div class="mt-1 text-sm text-muted-foreground">
                Engineers & Researchers
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#09101a] p-6">
              <div class="font-display text-3xl font-bold text-primary">14</div>
              <div class="mt-1 text-sm text-muted-foreground">
                Countries Served
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#09101a] p-6">
              <div class="font-display text-3xl font-bold text-primary">
                100%
              </div>
              <div class="mt-1 text-sm text-muted-foreground">
                Client Retention (2025)
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
