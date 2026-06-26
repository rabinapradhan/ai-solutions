import { useEffect, useState } from "react";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setEvents(data);
      } else if (Array.isArray(data.events)) {
        setEvents(data.events);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to load events.");
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

  const handleEdit = (event) => {
    setEditingId(event.id);

    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      event_date: event.event_date ? event.event_date.split("T")[0] : "",
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
      description: "",
      location: "",
      event_date: "",
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
        ? `${import.meta.env.VITE_API_URL}/api/events/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/events`;

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
          editingId ? "Failed to update event" : "Failed to create event",
        );
      }

      setMessage(
        editingId
          ? "Event updated successfully."
          : "Event created successfully.",
      );

      resetForm();

      fetchEvents();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    if (!token) {
      setMessage("You must be logged in.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete event");
      }

      setMessage("Event deleted successfully.");

      fetchEvents();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create / Update Event */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Update Event" : "Create Event"}
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
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none"
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none"
          />

          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
            >
              {editingId ? "Update Event" : "Create Event"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg bg-gray-600 px-5 py-3 font-medium hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Event List */}

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="mb-4 text-xl font-semibold">Existing Events</h2>

        {loading ? (
          <p className="text-slate-400">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-slate-400">No events found.</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">{event.title}</h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {event.description}
                  </p>

                  <p className="mt-2 text-sm text-slate-300">
                    📍 {event.location}
                  </p>

                  <p className="text-xs text-slate-500">
                    📅 {new Date(event.event_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="rounded-lg bg-yellow-500 px-4 py-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event.id)}
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

export default EventManagement;
