import { useEffect, useState } from "react";

const PortfolioManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image_url: "",
    metric: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);

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
    } catch (error) {
      console.error(error);
      setMessage("Failed to load portfolio.");
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

  const handleEdit = (project) => {
    setEditingId(project.id);

    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      image_url: project.image_url,
      metric: project.metric,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      title: "",
      category: "",
      description: "",
      image_url: "",
      metric: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!token) {
      setMessage("You must be logged in.");
      return;
    }

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/api/portfolio/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/portfolio`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(
          editingId ? "Failed to update project" : "Failed to create project",
        );
      }

      setMessage(
        editingId
          ? "Project updated successfully."
          : "Project created successfully.",
      );

      resetForm();

      fetchPortfolio();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    if (!token) {
      setMessage("You must be logged in.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/portfolio/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      setMessage("Project deleted successfully.");

      fetchPortfolio();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create / Update Project */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-semibold">
          {editingId ? "Update Portfolio Project" : "Create Portfolio Project"}
        </h2>

        {message && (
          <div className="mb-4 rounded-lg bg-slate-800 p-3 text-sm text-slate-300">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none"
          />

          <input
            type="text"
            name="category"
            placeholder="Category (Healthcare, Logistics...)"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none"
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none"
          />

          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={formData.image_url}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none"
          />

          <input
            type="text"
            name="metric"
            placeholder="Metric (34% downtime reduction)"
            value={formData.metric}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none"
          />

          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="Preview"
              className="h-48 w-full rounded-lg object-cover"
            />
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
            >
              {editingId ? "Update Project" : "Create Project"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg bg-gray-600 px-5 py-3 hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Projects */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Existing Portfolio Projects
        </h2>

        {loading ? (
          <p className="text-slate-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-slate-400">No portfolio projects found.</p>
        ) : (
          <div className="space-y-5">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-24 w-36 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>

                    <p className="text-sm text-teal-400">{project.category}</p>

                    <p className="mt-2 max-w-xl text-sm text-slate-400">
                      {project.description}
                    </p>

                    <p className="mt-2 text-xs font-semibold text-primary">
                      {project.metric}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="rbg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-200 px-4 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioManagement;
