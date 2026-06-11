const Portfolio = () => {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
          Case Studies
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
          AI‑Solutions in Action. <br />
          {/* <span className="text-3xl">
            Transforming the Digital Employee Experience.
          </span> */}
        </h1>
        <p className="mt-8 text-lg text-muted-foreground">
          A selection of projects we’ve delivered across industries — each
          powered by AI assistants and affordable prototyping, improving how
          people work every day.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-primary/40">
            <div className="aspect-4/3 overflow-hidden bg-surface">
              <img
                alt="Smart Logistics Hub"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&amp;q=80"
              />
            </div>
            <div className="p-6">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                Logistics
              </div>
              <h3 className="font-display text-lg font-semibold">
                Smart Logistics Hub
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Predictive maintenance for a global shipping operator. Reduced
                unplanned downtime by 34% with AI‑powered monitoring.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
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
                  className="lucide lucide-trending-up size-3"
                  aria-hidden="true"
                >
                  <path d="M16 7h6v6"></path>
                  <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                </svg>
                ↓ 34% downtime
              </div>
            </div>
          </article>

          <article className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-primary/40">
            <div className="aspect-4/3 overflow-hidden bg-surface">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&amp;q=80"
                alt="BioSync Assistant"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                Healthcare
              </div>
              <h3 className="font-display text-lg font-semibold">
                BioSync Assistant
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                AI‑driven scheduling and shift balancing for a 1,200‑bed
                hospital network. Cut staff burnout by 30% using our virtual
                assistant.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
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
                  className="lucide lucide-trending-up size-3"
                  aria-hidden="true"
                >
                  <path d="M16 7h6v6"></path>
                  <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                </svg>
                ↓ 30% burnout
              </div>
            </div>
          </article>

          <article className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-primary/40">
            <div className="aspect-4/3 overflow-hidden bg-surface">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&amp;q=80"
                alt="ClearCapital AI"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                Fintech
              </div>
              <h3 className="font-display text-lg font-semibold">
                ClearCapital AI
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Real‑time fraud detection and compliance audits for a tier‑1
                European bank. Delivered 4.2× accuracy with affordable
                prototyping.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
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
                  className="lucide lucide-trending-up size-3"
                  aria-hidden="true"
                >
                  <path d="M16 7h6v6"></path>
                  <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                </svg>
                ↑ 4.2× accuracy
              </div>
            </div>
          </article>

          <article className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-primary/40">
            <div className="aspect-4/3 overflow-hidden bg-surface">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&amp;q=80"
                alt="Continental Predict"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                Manufacturing
              </div>
              <h3 className="font-display text-lg font-semibold">
                Continental Predict
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Edge AI on the factory floor flagging defects before they enter
                the supply chain. Reduced defect rate by 22%.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
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
                  className="lucide lucide-trending-up size-3"
                  aria-hidden="true"
                >
                  <path d="M16 7h6v6"></path>
                  <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                </svg>
                ↓ 22% defect rate
              </div>
            </div>
          </article>

          <article className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-primary/40">
            <div className="aspect-4/3 overflow-hidden bg-surface">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&amp;q=80"
                alt="Northern Retail Insights"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                Retail
              </div>
              <h3 className="font-display text-lg font-semibold">
                Northern Retail Insights
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Demand forecasting for 240 UK stores. Increased margins by 18%
                through predictive analytics.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
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
                  className="lucide lucide-trending-up size-3"
                  aria-hidden="true"
                >
                  <path d="M16 7h6v6"></path>
                  <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                </svg>
                ↑ 18% margin
              </div>
            </div>
          </article>

          <article className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-primary/40">
            <div className="aspect-4/3 overflow-hidden bg-surface">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&amp;q=80"
                alt="Civic Helpdesk AI"
                loading="lazy"
                className="size-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                Public Sector
              </div>
              <h3 className="font-display text-lg font-semibold">
                Civic Helpdesk AI
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Citizen inquiry assistant for a North East council. Cut response
                times from days to minutes — 92% faster support.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
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
                  className="lucide lucide-trending-up size-3"
                  aria-hidden="true"
                >
                  <path d="M16 7h6v6"></path>
                  <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                </svg>
                ↓ 92% response time
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
