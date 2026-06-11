import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TopBar({ sidebarOpen, setSidebarOpen }) {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-[#080d1a]/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-400 hover:text-white transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="h-4 w-px bg-slate-700 lg:hidden" />
        <span className="text-slate-400 text-sm hidden sm:block">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Admin info */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-700">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-teal-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
            {admin?.username?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white leading-tight">
              {admin?.username || "Admin"}
            </p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
        >
          <LogOut size={15} />

          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
}
