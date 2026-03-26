import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { DashboardTopBar } from "./DashboardTopBar";
import { FeedbackButton } from "@/components/FeedbackModal";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-950">
      {/* Subtle gradient orbs in background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden dark:block hidden">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <DashboardTopBar />
        <main className="flex flex-1 flex-col overflow-y-auto p-4 lg:p-6 scrollbar-thin">
          <Outlet />
        </main>
      </div>

      {/* Floating feedback button — visible on all dashboard pages */}
      <FeedbackButton />
    </div>
  );
}
