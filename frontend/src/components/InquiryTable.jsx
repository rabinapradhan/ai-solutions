import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  X,
  ChevronDown,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const STATUS_CONFIG = {
  new: {
    label: "New",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    icon: AlertCircle,
  },
  "in-progress": {
    label: "In Progress",
    color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    icon: Clock,
  },
  closed: {
    label: "Closed",
    color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "text-red-400 bg-red-400/10 border-red-400/20",
    icon: XCircle,
  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["new"];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}
    >
      <Icon size={11} />
      {cfg.label}
    </span>
  );
}

function InquiryModal({ inquiry, onClose, onStatusChange }) {
  const [status, setStatus] = useState(inquiry.status || "new");
  const [saving, setSaving] = useState(false);
  const { token } = useAuth();

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch(
        `${API}/api/inquiries/${inquiry.id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      onStatusChange(inquiry.id, status);
      onClose();
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {inquiry.full_name}
            </h3>
            <p className="text-slate-400 text-sm">Inquiry #{inquiry.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3">
          {[
            ["Email", inquiry.email],
            ["Phone", inquiry.phone],
            ["Company", inquiry.company_name],
            ["Country", inquiry.country],
            ["Job Title", inquiry.job_title],

            ["Submitted", new Date(inquiry.created_at).toLocaleString()],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-3">
              <span className="text-slate-500 text-sm w-24 flex-shrink-0">
                {label}
              </span>
              <span className="text-slate-200 text-sm">{value || "—"}</span>
            </div>
          ))}

          {inquiry.job_details && (
            <div className="mt-3 p-3 bg-slate-800 rounded-lg">
              <p className="text-slate-500 text-xs mb-1">Message</p>
              <p className="text-slate-300 text-sm">{inquiry.job_details}</p>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800">
            <label className="text-slate-400 text-sm block mb-2">
              Update Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
            >
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <option key={key} value={key}>
                  {cfg.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-slate-800">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InquiryTable({ embedded = false }) {
  const { token } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setInquiries(res.data);
      setFiltered(res.data);
    } catch {
      setError("Failed to fetch inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  // Filter logic
  useEffect(() => {
    let data = [...inquiries];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (i) =>
          i.full_name?.toLowerCase().includes(q) ||
          i.email?.toLowerCase().includes(q) ||
          i.company_name?.toLowerCase().includes(q),
      );
    }
    if (statusFilter !== "all")
      data = data.filter((i) => i.status === statusFilter);
    if (countryFilter !== "all")
      data = data.filter((i) => i.country === countryFilter);
    setFiltered(data);
  }, [search, statusFilter, countryFilter, inquiries]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      setDeleteConfirm(null);
    } catch {
      alert("Failed to delete inquiry.");
    }
  };

  const handleStatusChange = (id, status) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i)),
    );
  };

  const countries = [
    ...new Set(inquiries.map((i) => i.country).filter(Boolean)),
  ];
  const displayData = embedded ? filtered.slice(0, 5) : filtered;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl">
      {/* Table header */}
      <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-base font-semibold text-white">
            {embedded ? "Recent Inquiries" : "All Inquiries"}
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>
        </div>

        {!embedded && (
          <div className="flex flex-wrap gap-2">
            {/* Search */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search name, email, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg pl-8 pr-3 py-2 w-56 focus:outline-none focus:border-teal-500 placeholder-slate-500"
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-teal-500"
              >
                <option value="all">All Status</option>
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <option key={key} value={key}>
                    {cfg.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>

            {/* Country filter */}
            <div className="relative">
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-teal-500"
              >
                <option value="all">All Countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-teal-400" size={24} />
        </div>
      ) : error ? (
        <p className="text-red-400 text-sm p-5">{error}</p>
      ) : displayData.length === 0 ? (
        <p className="text-slate-500 text-sm p-5 text-center">
          No inquiries found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3">ID</th>
                <th className="text-left px-5 py-3">Name</th>

                <th className="text-left px-5 py-3 hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">
                  Company
                </th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">
                  Country
                </th>
                <th className="text-left px-5 py-3 hidden xl:table-cell">
                  Job Title
                </th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">
                  Date
                </th>
                <th className="text-left px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((inq, i) => (
                <tr
                  key={inq.id}
                  className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${
                    i === displayData.length - 1 ? "border-0" : ""
                  }`}
                >
                  <td className="px-5 py-3 text-slate-500">#{inq.id}</td>
                  <td className="px-5 py-3 text-white font-medium">
                    {inq.full_name}
                  </td>
                  {/* <td className="px-5 py-3 text-slate-300 hidden md:table-cell">
                    {inq.phone}
                  </td> */}
                  <td className="px-5 py-3 text-slate-300 hidden md:table-cell">
                    {inq.email}
                  </td>
                  <td className="px-5 py-3 text-slate-300 hidden lg:table-cell">
                    {inq.company_name}
                  </td>
                  <td className="px-5 py-3 text-slate-300 hidden lg:table-cell">
                    {inq.country}
                  </td>
                  <td className="px-5 py-3 text-slate-300 hidden xl:table-cell">
                    {inq.job_title}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={inq.status || "new"} />
                  </td>
                  <td className="px-5 py-3 text-slate-400 hidden md:table-cell">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-teal-400/10 transition-all"
                        title="View"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(inq.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail modal */}
      {selectedInquiry && (
        <InquiryModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-white font-semibold mb-2">Delete Inquiry</h3>
            <p className="text-slate-400 text-sm mb-5">
              Are you sure you want to delete this inquiry? This action cannot
              be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
