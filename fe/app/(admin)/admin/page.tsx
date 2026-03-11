"use client";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import Sidebar from "@/components/admin/layout/sidebar";
import Topbar from "@/components/admin/layout/topbar";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import UserProfile from "@/components/admin/userProfile/UserProfile"; // nếu có trang Users
import SettingsPage from "@/components/admin/settings/SettingsPage";

// Khai báo đúng kiểu ThemeCtx (đủ type cho setDark)
export const ThemeCtx = createContext<{
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
}>({ dark: true, setDark: () => {} });

export default function App() {
  const [dark, setDark]               = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Nếu hiện tại bạn không dùng submenu, có thể bỏ expandedNav:
  const [expandedNav, setExpandedNav] = useState<string | null>(null);

  const [activeNav, setActiveNav]     = useState<string | null>("Dashboard");

  // ⬇️ Tạo hàm/chuyển thành biến để quyết định page và TRUYỀN props cho page
  const renderContent = () => {
    switch (activeNav) {
      case "Dashboard":
        return <DashboardPage dark={dark} />;  // truyền prop dark
      case "Users":
        return <UserProfile dark={dark} />;      // ví dụ trang Users
      case "Settings":
        return <SettingsPage dark={dark} />;     // ví dụ trang Settings
      default:
        return (
          <div
            className={`flex items-center justify-center h-full ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {activeNav}
          </div>
        );
    }
  };

  return (
    <ThemeCtx.Provider value={{ dark, setDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
      `}</style>

      <div
        className={`flex min-h-screen ${dark ? "bg-gray-900" : "bg-slate-100"}`}
        style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
      >
        <Sidebar
          dark={dark}
          open={sidebarOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          expandedNav={expandedNav}
          setExpandedNav={setExpandedNav}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <Topbar dark={dark} setDark={setDark} onMenuToggle={() => setSidebarOpen(p => !p)} />
          {renderContent()}
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}