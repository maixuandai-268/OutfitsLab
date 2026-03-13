"use client";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import Sidebar from "@/components/admin/layout/sidebar";
import Topbar from "@/components/admin/layout/topbar";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import UserProfile from "@/components/admin/userProfile/UserProfile"; 
import SettingsPage from "@/components/admin/settings/SettingsPage";
import ReportPage from "@/components/admin/report/ReportPage";
import SellerApplicationPage from "@/components/admin/sellerApplication/SellerApplicationPage";
import AdminAccountsPage from "@/components/admin/adminAccounts/AdminAccountsPage";


export const ThemeCtx = createContext<{
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
}>({ dark: true, setDark: () => {} });

export default function App() {
  const [dark, setDark]               = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

 
  const [expandedNav, setExpandedNav] = useState<string | null>(null);

  const [activeNav, setActiveNav]     = useState<string | null>("Dashboard");

 
  const renderContent = () => {
    switch (activeNav) {
      case "Bảng điều khiển":
        return <DashboardPage dark={dark} />; 
      case "Người dùng":
        return <UserProfile dark={dark} />;     
      case "Cài đặt":
        return <SettingsPage dark={dark} />;  
      case "Báo cáo":
        return <ReportPage dark={dark} />;      
      case "Đơn đăng ký người bán":
        return <SellerApplicationPage dark={dark} />;
      case "Team":
        return <AdminAccountsPage dark={dark} />;
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