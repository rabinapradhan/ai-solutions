import { useState } from "react";
import { Search } from "lucide-react";
const categories = [
  "All",
  "Insights",
  "Engineering",
  "Industry",
  "Guide",
  "Case Study",
];
// Static article data
const articlesData = [
  {
    id: 1,
    title: "The Future of Digital Employee Experience",
    content: "How AI assistants are reshaping workflows.",
    author: "AI-Solutions Team",
    date: "25 May 2026",
    category: "Insights",
  },
  {
    id: 2,
    title: "Rapid AI Prototyping: Idea to Demo in 14 Days",
    content: "Our affordable prototyping framework explained.",
    author: "Marcus Lin",
    date: "25 May 2026",
    category: "Engineering",
  },
  {
    id: 3,
    title: "Why Sunderland is the UK’s Next AI Hub  ",
    content: "How talent and ambition are driving innovation here.",
    author: "Editorial",
    date: "25 May 2026",
    category: "Industry",
  },
  {
    id: 4,
    title: "Virtual Assistants vs Chatbots: A Practical Guide",
    content: "When intelligence beats scripts — and when it doesn’t.",
    author: "David Cho",
    date: "25 May 2026",
    category: "Guide",
  },
  {
    id: 5,
    title: "Building Trust in Enterprise AI",
    content: "Principles for deploying AI in regulated industries.",
    author: "Alex stanfield",
    date: "25 May 2026",
    category: "Industry",
  },
  {
    id: 6,
    title: "Case Study: 60% Support Load Reduction",
    content: "How our AI assistant transformed a logistics helpdesk.",
    author: "AI-Solutions Team",
    date: "25 May 2026",
    category: "Case Study",
  },
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Filter logic
  const filteredArticles = articlesData.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  return (
    <main className="flex-1">
      <section class="mx-auto max-w-4xl px-6 pb-12 pt-24">
        <p class="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
          Insights
        </p>
        <h1 class="font-display text-4xl font-bold md:text-6xl">
          Insights from AI‑Solutions.
        </h1>
        <p className="mt-8 text-lg text-muted-foreground">
          Articles and case studies on AI assistants, prototyping, and the
          future of digital employee experience.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="relative w-full md:max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              class="w-full rounded-xl border border-white/10 bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div class="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? " bg-primary text-primary-foreground"
                    : " border border-white/10 bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              class="group flex flex-col rounded-2xl border border-white/10 bg-card p-6 transition hover:border-primary/40"
            >
              <div class="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                {article.category}
              </div>
              <h3 class="font-display text-xl font-semibold leading-snug">
                {article.title}
              </h3>
              <p class="mt-3 flex-1 text-sm text-muted-foreground">
                {article.content}
              </p>
              <div class="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{article.author}</span>
                <span>{article.date}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;
