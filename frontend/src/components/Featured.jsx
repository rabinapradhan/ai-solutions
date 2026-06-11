import { Link } from "react-router-dom";
import { LiaRobotSolid } from "react-icons/lia";
import { IoIosRocket } from "react-icons/io";
import { FaCogs } from "react-icons/fa";
import { MdInsights } from "react-icons/md";

const Featured = () => {
  return (
    <section class="mx-auto max-w-7xl px-6 py-24">
      <div class="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p class="mb-2 text-xs font-bold uppercase tracking-widest text-[#00d6bb]">
            What we build
          </p>
          <h2 class="font-display text-3xl font-bold md:text-4xl">
            Featured AI solutions
          </h2>
        </div>
        <Link to="/services" class="text-sm font-medium text-[#00d6bb] ">
          View all services →
        </Link>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div class="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border-[#00d6bb]/40 hover:bg-card/80">
          <div class="mb-5 grid size-11 place-items-center rounded-xl bg-[#00d6bb]/10 ring-1 ring-[#00d6bb]/20">
            <LiaRobotSolid size={20} className="text-[#00d6bb] " />
          </div>
          <h3 class="font-display text-lg font-semibold">Virtual Assistants</h3>
          <p class="mt-2 text-sm leading-relaxed text-[#95a0ab]">
            AI‑powered assistants that respond instantly to employee inquiries,
            reducing friction in digital workflows.
          </p>
        </div>
        <div class="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border-[#00d6bb]/40 hover:bg-card/80">
          <div class="mb-5 grid size-11 place-items-center rounded-xl bg-[#00d6bb]/10 ring-1 ring-[#00d6bb]/20">
            <IoIosRocket size={20} className="text-[#00d6bb] " />
          </div>
          <h3 class="font-display text-lg font-semibold">Rapid Prototyping</h3>
          <p class="mt-2 text-sm leading-relaxed text-[#95a0ab]">
            Affordable, high‑fidelity prototypes delivered in days, helping
            enterprises innovate faster.
          </p>
        </div>
        <div class="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border-[#00d6bb]/40 hover:bg-card/80">
          <div class="mb-5 grid size-11 place-items-center rounded-xl bg-[#00d6bb]/10 ring-1 ring-[#00d6bb]/20">
            <FaCogs size={20} className="text-[#00d6bb]" />
          </div>
          <h3 class="font-display text-lg font-semibold">Industry Solutions</h3>
          <p class="mt-2 text-sm leading-relaxed text-[#95a0ab]">
            Sector‑specific AI tooling for logistics, healthcare, fintech, and
            manufacturing.
          </p>
        </div>
        <div class="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border[#00d6bb]/40 hover:bg-card/80">
          <div class="mb-5 grid size-11 place-items-center rounded-xl bg-[#00d6bb]/10 ring-1 ring[#00d6bb]/20">
            <MdInsights size={20} className="text-[#00d6bb]" />
          </div>
          <h3 class="font-display text-lg font-semibold">
            Proactive Optimization
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-[#95a0ab]">
            Predictive intelligence that identifies bottlenecks before they
            impact productivity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Featured;
