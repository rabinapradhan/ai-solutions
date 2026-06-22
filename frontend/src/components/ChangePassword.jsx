import { useState } from "react";
import axios from "axios";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [show, setShow] = useState({
    cur: false,
    newp: false,
    conf: false,
  });

  const toggleShow = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (newPassword.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API}/api/admin/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(res.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change password.");
    }
  };

  const inputClass =
    "w-full bg-[#0a0f1e] border border-slate-700 rounded-lg pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition";

  const fields = [
    {
      id: "cur",
      label: "Current Password",
      value: currentPassword,
      set: setCurrentPassword,
      showKey: "cur",
    },
    {
      id: "newp",
      label: "New Password",
      value: newPassword,
      set: setNewPassword,
      showKey: "newp",
    },
    {
      id: "conf",
      label: "Confirm New Password",
      value: confirmPassword,
      set: setConfirmPassword,
      showKey: "conf",
    },
  ];

  return (
    <div className="max-w-xl">
      {" "}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-8">
        {" "}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-800">
          {" "}
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            {" "}
            <ShieldCheck size={24} className="text-teal-400" />{" "}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Change Password
            </h2>

            <p className="text-sm text-slate-400">
              Update your administrator account password.
            </p>
          </div>
        </div>
        {message && (
          <div className="mb-5 p-3 rounded-lg border border-green-500/20 bg-green-500/10 text-green-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{message}</span>
            </div>
          </div>
        )}
        {error && (
          <div className="mb-5 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(({ id, label, value, set, showKey }) => (
            <div key={id}>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                {label}
              </label>

              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={show[showKey] ? "text" : "password"}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                  required
                />

                <button
                  type="button"
                  onClick={() => toggleShow(showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                >
                  {show[showKey] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-[#0a0f1e] font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>Update Password</span>
            <ShieldCheck size={16} />
          </button>
        </form>
        <p className="mt-6 text-xs text-slate-500 text-center">
          Protected administrator setting
        </p>
      </div>
    </div>
  );
}
