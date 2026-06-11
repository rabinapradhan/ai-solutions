import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  TrendingUp,
  Globe,
  Briefcase,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function DashboardCards() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/api/inquiries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const inquiries = res.data;
        const now = new Date();

        // Current month inquiries
        const thisMonth = inquiries.filter((i) => {
          const d = new Date(i.created_at);
          return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        });

        // Previous month inquiries
        const lastMonth = inquiries.filter((i) => {
          const d = new Date(i.created_at);
          return (
            d.getMonth() === (now.getMonth() - 1 + 12) % 12 &&
            d.getFullYear() ===
              (now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear())
          );
        });

        // Calculate trend percentage
        const monthlyTrend =
          lastMonth.length === 0
            ? null
            : (
                ((thisMonth.length - lastMonth.length) / lastMonth.length) *
                100
              ).toFixed(1);

        const countries = [
          ...new Set(inquiries.map((i) => i.country).filter(Boolean)),
        ];
        const jobTitles = [
          ...new Set(inquiries.map((i) => i.job_title).filter(Boolean)),
        ];

        setStats({
          total: inquiries.length,
          monthly: thisMonth.length,
          monthlyTrend,
          countries: countries.length,
          services: jobTitles.length,
        });
      } catch {
        setStats({
          total: 0,
          monthly: 0,
          monthlyTrend: null,
          countries: 0,
          services: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  const cards = [
    {
      label: "Total Inquiries",
      value: stats?.total ?? "-",
      icon: MessageSquare,
      color: "teal",
      desc: "All time",
    },
    {
      label: "Monthly Inquiries",
      value: stats?.monthly ?? "-",
      icon: TrendingUp,
      color: "blue",
      trend: stats?.monthlyTrend ? `${stats.monthlyTrend}%` : "-",
      up: stats?.monthlyTrend >= 0,
      desc: "This month",
    },
    {
      label: "Countries Served",
      value: stats?.countries ?? "-",
      icon: Globe,
      color: "violet",
      desc: "Unique countries",
    },
    {
      label: "Service Demand",
      value: stats?.services ?? "-",
      icon: Briefcase,
      color: "amber",
      desc: "Job categories",
    },
  ];

  const colorMap = {
    teal: {
      bg: "bg-teal-500/10",
      border: "border-teal-500/20",
      icon: "text-teal-400",
      value: "text-teal-400",
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      icon: "text-blue-400",
      value: "text-blue-400",
    },
    violet: {
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      icon: "text-violet-400",
      value: "text-violet-400",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      icon: "text-amber-400",
      value: "text-amber-400",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const c = colorMap[card.color];
        return (
          <div
            key={card.label}
            className={`bg-slate-900/60 border ${c.border} rounded-xl p-5 flex flex-col gap-4 hover:bg-slate-900 transition-all`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded-lg ${c.bg}`}>
                <Icon size={18} className={c.icon} />
              </div>
              {card.trend !== undefined && (
                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    card.up ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {card.up ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}
                  {card.trend}
                </span>
              )}
            </div>

            <div>
              {loading ? (
                <Loader2 size={20} className="animate-spin text-slate-500" />
              ) : (
                <p className={`text-3xl font-bold tracking-tight ${c.value}`}>
                  {card.value}
                </p>
              )}
              <p className="text-slate-300 text-sm font-medium mt-0.5">
                {card.label}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">{card.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
