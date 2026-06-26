import { useEffect, useState } from "react";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`);

      if (!res.ok) {
        throw new Error("Failed to fetch portfolio");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setProjects(data);
      } else if (Array.isArray(data.portfolio)) {
        setProjects(data.portfolio);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
          Case Studies
        </p>

        <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
          AI-Solutions in Action.
        </h1>

        <p className="mt-8 text-lg text-muted-foreground">
          A selection of projects we've delivered across industries — each
          powered by AI assistants and affordable prototyping.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.length === 0 ? (
            <p className="text-muted-foreground">
              No portfolio projects available.
            </p>
          ) : (
            projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-primary/40"
              >
                <div className="aspect-4/3 overflow-hidden bg-surface">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    loading="lazy"
                    className="size-full object-cover transition group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                    {project.category}
                  </div>

                  <h3 className="font-display text-lg font-semibold">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-3"
                    >
                      <path d="M16 7h6v6" />
                      <path d="m22 7-8.5 8.5-5-5L2 17" />
                    </svg>

                    {project.metric}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
