import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "inquiries", label: "Inquiries", icon: FileText },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
  {
    id: "blogs",
    label: "Blog Management",
  },
];

export default function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 flex flex-col border-r border-slate-800 bg-[#080d1a] transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {open && (
          <span className="font-bold text-white tracking-tight text-lg whitespace-nowrap">
            AI Solutions
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
              active === id
                ? "bg-teal-500/15 text-teal-400 border border-teal-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Icon
              size={18}
              className={`flex-shrink-0 ${
                active === id
                  ? "text-teal-400"
                  : "text-slate-500 group-hover:text-white"
              }`}
            />
            {open && <span className="whitespace-nowrap">{label}</span>}
            {active === id && open && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400" />
            )}
          </button>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 pb-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 text-sm transition-all"
        >
          {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          {open && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
