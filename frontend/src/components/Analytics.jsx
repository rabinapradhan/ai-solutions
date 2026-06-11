import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const COLORS = [
  "#14b8a6",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#10b981",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm shadow-xl">
        <p className="text-slate-300 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const { token } = useAuth();
  const [data, setData] = useState({
    monthly: [],
    country: [],
    jobs: [],
    growth: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const process = async () => {
      try {
        const res = await axios.get(`${API}/api/inquiries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const inquiries = res.data;
        const now = new Date();

        // Monthly — last 12 months
        const monthMap = {};
        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = d.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          });
          monthMap[key] = 0;
        }
        inquiries.forEach((inq) => {
          const d = new Date(inq.created_at);
          const key = d.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          });
          if (key in monthMap) monthMap[key]++;
        });
        const monthly = Object.entries(monthMap).map(([month, count]) => ({
          month,
          count,
        }));

        // Cumulative growth
        let cum = 0;
        const growth = monthly.map(({ month, count }) => {
          cum += count;
          return { month, total: cum };
        });

        // Countries
        const cc = {};
        inquiries.forEach((i) => {
          if (i.country) cc[i.country] = (cc[i.country] || 0) + 1;
        });
        const country = Object.entries(cc)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([name, value]) => ({ name, value }));

        // Jobs
        const jc = {};
        inquiries.forEach((i) => {
          if (i.job_title) {
            const k =
              i.job_title.length > 18
                ? i.job_title.slice(0, 18) + "…"
                : i.job_title;
            jc[k] = (jc[k] || 0) + 1;
          }
        });
        const jobs = Object.entries(jc)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count }));

        setData({ monthly, country, jobs, growth });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    process();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin text-teal-400" size={28} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Area chart — monthly */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-1">
            Monthly Submissions
          </h2>
          <p className="text-slate-500 text-xs mb-4">
            Inquiries per month (last 12 months)
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data.monthly}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                name="Inquiries"
                stroke="#14b8a6"
                fill="url(#tealGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart — growth */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-1">
            Inquiry Growth
          </h2>
          <p className="text-slate-500 text-xs mb-4">
            Cumulative total over time
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data.growth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart — country */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-1">
            Country Breakdown
          </h2>
          <p className="text-slate-500 text-xs mb-4">
            Inquiries by country (top 8)
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.country}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Inquiries" radius={[4, 4, 0, 0]}>
                {data.country.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart — services */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-1">
            Service Demand
          </h2>
          <p className="text-slate-500 text-xs mb-4">
            Top job titles submitting inquiries
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data.jobs}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={45}
                paddingAngle={3}
              >
                {data.jobs.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(v) => (
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>{v}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
