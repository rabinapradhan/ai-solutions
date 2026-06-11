import { FaArrowRight } from "react-icons/fa";

const CTA = () => {
  return (
    <section class="mx-auto max-w-7xl px-6 pb-24">
      <div class="relative overflow-hidden rounded-3xl border border-[#00d6bb]/20 bg-LINEAR-to-br from-[#00d6bb]/10 via-[#0b121d] to-[#04070f] p-10 text-center md:p-16">
        <h2 class="font-display text-3xl font-bold md:text-5xl">
          Ready to optimize your workforce?
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-[#95a0ab]">
          Share your project requirements and our Sunderland team will respond
          within 24 hours.
        </p>
        <a
          href="/contact"
          class="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-[#04070f]"
        >
          Submit an inquiry <FaArrowRight size={16} />
        </a>
      </div>
    </section>
  );
};

export default CTA;
