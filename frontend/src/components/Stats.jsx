const Stats = () => {
  const stats = [
    { label: " Inquiries Resolved for Clients", value: "1,284" },
    { label: "Average Prototype Delivery", value: "14 Days" },
    { label: "Efficiency Gain Across Teams", value: "92%" },
    { label: " Countries Served Worldwide", value: "14" },
  ];
  return (
    <section className="border-y border-white/5 bg-[#0b121d]/40">
      <div class="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div class="font-display text-3xl font-bold text-primary md:text-4xl">
              {s.value}
            </div>
            <div class="mt-1 text-xs uppercase tracking-wider text-[#95a0ab]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
