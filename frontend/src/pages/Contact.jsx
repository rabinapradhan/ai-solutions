import { useState } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    country: "",
    job_title: "",
    job_details: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simple SQL injection pattern check
  const containsSQLInjection = (input) => {
    const patterns = ["'", "--", ";", " OR ", " AND "];
    return patterns.some((p) => input.includes(p));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (containsSQLInjection(formData.job_details)) {
      setStatus("invalid");
      return;
    }

    try {
      await axios.post(`${API}/api/inquiries`, formData);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      console.log(err);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
            Contact
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Tell us about your project.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            AI‑Solutions, based in Sunderland, leverages AI assistants and
            affordable prototyping to help industries proactively resolve
            digital employee experience issues. Share your requirements and our
            engineering team will prepare a tailored AI strategy — we respond
            within 24 hours.
          </p>

          <div className="mt-10 space-y-5 text-sm">
            <div className="flex gap-3 items-center">
              <FaMapMarkerAlt className="text-primary size-5" />
              <span>AI-Solutions HQ, Sunderland, UK</span>
            </div>
            <div className="flex gap-3 items-center">
              <FaEnvelope className="text-primary size-5" />
              <span>hello@ai-solutions.example</span>
            </div>
            <div className="flex gap-3 items-center">
              <FaPhoneAlt className="text-primary size-5" />
              <span>+44 (0) 191 000 0000</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-card p-8 md:p-10"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Full Name *
              </label>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Company Name
              </label>
              <input
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Job Title
              </label>
              <input
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Project Details / Message *
              </label>
              <textarea
                name="job_details"
                rows="5"
                value={formData.job_details}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50 md:col-span-2"
            >
              Submit inquiry <FaArrowRight className="size-4" />
            </button>
          </div>

          {status === "success" && (
            <p className="mt-4 text-green-500">
              Inquiry submitted successfully!
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-500">Error submitting inquiry.</p>
          )}
          {status === "invalid" && (
            <p className="mt-4 text-red-500">Invalid input detected.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
