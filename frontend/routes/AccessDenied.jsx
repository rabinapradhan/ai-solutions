import { useEffect, useState } from "react";
import { Zap, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center relative overflow-hidden p-6 font-sans">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,206,214,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,206,214,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "-120px",
          right: "-120px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(15,206,214,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className={`relative z-10 w-full max-w-100 text-center rounded-2xl border border-white/[0.07] bg-[rgba(18,24,36,0.92)] backdrop-blur-xl px-11 py-10 transition-all duration-[450ms] ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center mb-4">
            <Zap size={22} className="text-teal-400" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            AI Solutions
          </h1>
          <p className="text-slate-500 text-sm mt-1">Admin Portal</p>
        </div>

        <div className="border-t border-slate-800 mb-6" />

        <div className="text-white text-[22px] font-bold tracking-tight mb-2.5">
          Access Denied
        </div>

        <div className="text-[#6b7280] text-sm w-full leading-[1.65] mb-7">
          You must be authenticated to access this admin area. Please sign in
          with your credentials to continue.
        </div>

        <Link
          to="/admin/login"
          className="inline-flex items-center justify-center gap-2 w-full bg-teal-500 hover:bg-teal-600 text-[#0a1628] font-semibold text-sm px-6 py-[13px] rounded-lg cursor-pointer no-underline transition-opacity duration-200 hover:opacity-90"
        >
          <LogIn size={20} />
          Sign In to Admin Portal
        </Link>
      </div>

      <p className="relative z-10 mt-7 text-[#374151] text-xs tracking-[0.02em]">
        Protected area — authorized personnel only
      </p>
    </div>
  );
}
