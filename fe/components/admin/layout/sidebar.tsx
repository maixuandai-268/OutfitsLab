"use client";
import {
  DashboardOutlined,
  UserOutlined, TeamOutlined,
  SettingOutlined, LogoutOutlined,
  AreaChartOutlined,
  BankOutlined,
} from "@ant-design/icons";
import Link from "antd/es/typography/Link";

const navItems = [
  { icon: <DashboardOutlined />,    label: "Bảng điều khiển" },
  { icon: <UserOutlined />,         label: "Người dùng"},
  { icon: <AreaChartOutlined />,     label: "Báo cáo" },
  { icon: <BankOutlined />,     label: "Đơn đăng ký người bán" },
  { icon: <TeamOutlined />,         label: "Team" },
  { icon: <SettingOutlined />,      label: "Cài đặt" },
  { icon: <DashboardOutlined />,    label: "Blog" },
];
interface SidebarProps {
  dark?: boolean;
  open: boolean;
  activeNav: string | null;
  setActiveNav: (label: string | null) => void;
  expandedNav: string | null;
  setExpandedNav: (label: string | null) => void;
}

export default function Sidebar({ dark = false, 
                                  open = true, 
                                  activeNav = null,
                                  setActiveNav = () => {},
                                   }: SidebarProps) {
  return (
    <aside
      style={{ width: open ? 260 : 72, transition: "width 0.25s ease" }}
      className={`flex flex-col flex-shrink-0 min-h-screen z-10 overflow-hidden ${
        dark ? "bg-gray-800 border-r border-gray-700" : "bg-white border-r border-slate-200"
      }`}
    >
      <div className={`flex items-center gap-3 px-5 py-4 w-full h-[7%] border-b ${dark ? "border-gray-700" : "border-slate-100"}`}>
        <Link href="/admin">
          <img src="/images/logo.png" alt="Logo" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {navItems.map((item) => {
          const isActive   = activeNav === item.label;

          return (
            <div key={item.label}>
              <button
                onClick={() => {
                  setActiveNav(item.label);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all duration-150 cursor-pointer ${
                  !open ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md"
                    : dark
                    ? "text-gray-400 hover:bg-gray-700 hover:text-gray-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {open && (
                  <>
                    <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>
                  </>
                )}
              </button>

            </div>
          );
        })}
      </nav>
      {open && (
        <div className={`px-4 py-4 border-t ${dark ? "border-gray-700" : "border-slate-100"}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] font-semibold truncate ${dark ? "text-gray-100" : "text-gray-800"}`}>
                Alex Johnson
              </p>
              <p className="text-[11px] text-indigo-500">Admin</p>
            </div>
            <LogoutOutlined className="text-gray-400 cursor-pointer hover:text-red-400 transition-colors" />
          </div>
        </div>
      )}
    </aside>
  );
}
