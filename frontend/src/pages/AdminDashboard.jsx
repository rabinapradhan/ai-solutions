import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DashboardCards from "../components/DashboardCards";
import Charts from "../components/Charts";
import InquiryTable from "../components/InquiryTable";
import Analytics from "../components/Analytics";
import ChangePassword from "../components/ChangePassword";
import BlogManagement from "../components/blogManagement";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-white font-sans overflow-hidden">
      <Sidebar
        active={activeSection}
        setActive={setActiveSection}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {activeSection === "dashboard" && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Overview
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Welcome back. Here's what's happening.
                </p>
              </div>
              <DashboardCards />
              <Charts />
              <InquiryTable embedded />
            </>
          )}

          {activeSection === "inquiries" && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Inquiries
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Manage and respond to all incoming inquiries.
                </p>
              </div>
              <InquiryTable />
            </>
          )}

          {activeSection === "analytics" && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Analytics
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Deep dive into inquiry trends and patterns.
                </p>
              </div>
              <Analytics />
            </>
          )}

          {activeSection === "settings" && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Settings
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Manage administrator account settings.
                </p>
              </div>

              <ChangePassword />
            </>
          )}
          {activeSection === "blogs" && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Blog Management
                </h1>

                <p className="text-slate-400 text-sm mt-1">
                  Create and manage blog articles.
                </p>
              </div>

              <BlogManagement />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
