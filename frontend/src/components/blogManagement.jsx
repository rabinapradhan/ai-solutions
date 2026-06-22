import { useEffect, useState } from "react";

const blogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);

      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await res.json();

      // Handle either array response or { blogs: [] }
      if (Array.isArray(data)) {
        setBlogs(data);
      } else if (Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
      setMessage("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!token) {
      setMessage("You must be logged in.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));

        throw new Error(errorData.message || "Failed to create blog post");
      }

      setFormData({
        title: "",
        content: "",
        author: "",
        category: "",
      });

      setMessage("Blog post created successfully.");

      fetchBlogs();
    } catch (error) {
      console.error("Create blog error:", error);
      setMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;

    if (!token) {
      setMessage("You must be logged in.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete blog post");
      }

      setMessage("Blog post deleted successfully.");

      fetchBlogs();
    } catch (error) {
      console.error("Delete blog error:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Blog Form */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="text-xl font-semibold mb-4">Create Blog Post</h2>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-slate-800 text-sm text-slate-300">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-slate-800 p-3 outline-none border border-slate-700"
          />

          <textarea
            rows="6"
            name="content"
            placeholder="Blog Content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-slate-800 p-3 outline-none border border-slate-700"
          />

          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-slate-800 p-3 outline-none border border-slate-700"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-slate-800 p-3 outline-none border border-slate-700"
          >
            <option value="">Select Category</option>
            <option value="Insights">Insights</option>
            <option value="Engineering">Engineering</option>
            <option value="Industry">Industry</option>
            <option value="Guide">Guide</option>
            <option value="Case Study">Case Study</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-lg font-medium"
          >
            Create Blog
          </button>
        </form>
      </div>

      {/* Blog List */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="text-xl font-semibold mb-4">Existing Blog Posts</h2>

        {loading ? (
          <p className="text-slate-400">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-slate-400">No blog posts found.</p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex items-center justify-between bg-slate-800 p-4 rounded-xl"
              >
                <div>
                  <h3 className="font-semibold text-lg">{blog.title}</h3>

                  <p className="text-sm text-slate-400">
                    {blog.category} • {blog.author}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {blog.created_at
                      ? new Date(blog.created_at).toLocaleDateString()
                      : "No date"}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default blogManagement;
