import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const categories = [
  "All",
  "Insights",
  "Engineering",
  "Industry",
  "Guide",
  "Case Study",
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);

      const data = await res.json();

      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-1">
      {" "}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-24">
        {" "}
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
          Insights{" "}
        </p>
        <h1 className="font-display text-4xl font-bold md:text-6xl">
          Insights from AI-Solutions.
        </h1>
        <p className="mt-8 text-lg text-muted-foreground">
          Articles and case studies on AI assistants, prototyping, and the
          future of digital employee experience.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              className="w-full rounded-xl border border-white/10 bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "border border-white/10 bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No articles found.</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col rounded-2xl border border-white/10 bg-card p-6 transition hover:border-primary/40"
              >
                <div className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                  {article.category}
                </div>

                <h3 className="font-display text-xl font-semibold leading-snug">
                  {article.title}
                </h3>

                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {article.content}
                </p>

                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.author}</span>

                  <span>
                    {new Date(article.created_at).toLocaleDateString()}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
