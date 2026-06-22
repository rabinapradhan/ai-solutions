import { useEffect, useState } from "react";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);

      const data = await res.json();

      setBlogs(data);
    } catch (error) {
      console.error(error);
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
        throw new Error("Failed to create blog");
      }

      setFormData({
        title: "",
        content: "",
        author: "",
        category: "",
      });

      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="text-xl font-semibold mb-4">Create Blog Post</h2>

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
            rows="5"
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

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="text-xl font-semibold mb-4">Existing Blog Posts</h2>

        <div className="space-y-4">
          {blogs.length === 0 ? (
            <p className="text-slate-400">No blog posts found.</p>
          ) : (
            blogs.map((blog) => (
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
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
