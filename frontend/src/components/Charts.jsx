import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PIE_COLORS = [
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

export default function Charts() {
  const { token } = useAuth();
  const [monthlyData, setMonthlyData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchAndProcess = async () => {
      try {
        const res = await axios.get(`${API}/api/inquiries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const inquiries = res.data;

        // Monthly data — last 6 months
        const monthCounts = {};
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = d.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          });
          monthCounts[key] = 0;
        }
        inquiries.forEach((inq) => {
          const d = new Date(inq.created_at);
          const key = d.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          });
          if (key in monthCounts) monthCounts[key]++;
        });
        setMonthlyData(
          Object.entries(monthCounts).map(([month, inquiries]) => ({
            month,
            inquiries,
          })),
        );

        // Country distribution (top 6)
        const countryCounts = {};
        inquiries.forEach((inq) => {
          if (inq.country) {
            countryCounts[inq.country] = (countryCounts[inq.country] || 0) + 1;
          }
        });
        const sortedCountries = Object.entries(countryCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([country, value]) => ({ country, value }));
        setCountryData(sortedCountries);

        // Service/job demand (top 5)
        const jobCounts = {};
        inquiries.forEach((inq) => {
          if (inq.job_title) {
            const key =
              inq.job_title.length > 20
                ? inq.job_title.slice(0, 20) + "…"
                : inq.job_title;
            jobCounts[key] = (jobCounts[key] || 0) + 1;
          }
        });
        const sortedJobs = Object.entries(jobCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({ name, count }));
        setServiceData(sortedJobs);
      } catch (err) {
        console.error("Chart data error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAndProcess();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin text-teal-400" size={28} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      {/* Line chart — monthly trend */}
      <div className="xl:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <h2 className="text-base font-semibold text-white mb-1">
          Monthly Inquiry Trend
        </h2>
        <p className="text-slate-500 text-xs mb-4">Last 6 months</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="inquiries"
              stroke="#14b8a6"
              strokeWidth={2.5}
              dot={{ fill: "#14b8a6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart — country */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <h2 className="text-base font-semibold text-white mb-1">
          Country Distribution
        </h2>
        <p className="text-slate-500 text-xs mb-2">Top countries</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={countryData}
              dataKey="value"
              nameKey="country"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={3}
            >
              {countryData.map((_, index) => (
                <Cell
                  key={index}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#94a3b8", fontSize: 11 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart — service demand */}
      <div className="xl:col-span-3 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <h2 className="text-base font-semibold text-white mb-1">
          Service Demand by Job Title
        </h2>
        <p className="text-slate-500 text-xs mb-4">
          Top 5 roles submitting inquiries
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={serviceData} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={130}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
