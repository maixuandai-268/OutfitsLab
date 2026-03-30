"use client";

import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  AreaChartOutlined,
  BankOutlined,

  ShoppingOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const navItems = [

  { icon: <DashboardOutlined />, label: "Bảng điều khiển" },
  { icon: <UserOutlined />, label: "Người dùng" },
  { icon: <AreaChartOutlined />, label: "Báo cáo" },
  { icon: <BankOutlined />, label: "Đơn đăng ký người bán" },
  { icon: <TeamOutlined />, label: "Team" },
  { icon: <DashboardOutlined />, label: "Blog" },
  { icon: <ShoppingOutlined />, label: "Sản phẩm" },
  { icon: <SettingOutlined />, label: "Cài đặt" },
];

interface SidebarProps {
  dark?: boolean;
  open: boolean;
  activeNav: string | null;
  setActiveNav: (label: string | null) => void;
}

export default function Sidebar({
  dark = false,
  open,
  activeNav,
  setActiveNav,
}: SidebarProps) {
  return (
    <aside
      style={{ width: open ? 260 : 72, transition: "width 0.25s ease" }}
      className={`flex flex-col min-h-screen flex-shrink-0 overflow-hidden z-10
        ${
          dark
            ? "bg-gray-800 border-r border-gray-700"
            : "bg-white border-r border-slate-200"
        }`}
    >
      <div
        className={`flex items-center justify-center h-16 border-b
          ${dark ? "border-gray-700" : "border-slate-100"}`}
      >
        <Link href="/" className="block">
          {open ? (
            <img
              src="/images/Logo.png"
              alt="OutfitsLab"
              className="h-8 w-auto object-contain"
            />
          ) : (
            <img
              src="/images/Logo-icon.png"
              alt="OutfitsLab Icon"
              className="h-18 w-18 object-contain"
            />
          )}
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {navItems.map((item) => {
          const isActive = activeNav === item.label;

          return (
            <div key={item.label}>
              <button
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 mb-1
                  rounded-xl text-sm font-medium transition-all duration-150
                  ${!open ? "justify-center" : ""}
                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md"
                      : dark
                      ? "text-gray-400 hover:bg-gray-700 hover:text-gray-100"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {open && (
                  <span className="flex-1 text-left whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}