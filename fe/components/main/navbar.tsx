'use client';

import Link from "next/link";
import {
  BellOutlined,
  HeartOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ShopOutlined,
  SettingOutlined,
  EditOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const getMenuItems = (): MenuProps["items"] => {
    const baseItems: MenuProps["items"] = [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: <Link href="/user_profile">Trang cá nhân</Link>,
      },
      {
        key: "write-blog",
        icon: <EditOutlined />,
        label: <Link href="/blog">Viết blog</Link>,
      },
      { type: "divider" },
      {
        key: "my-posts",
        icon: <BookOutlined />,
        label: <Link href="/user/posts">Bài viết của tôi</Link>,
      },
      {
        key: "saved-posts",
        icon: <BookOutlined />,
        label: <Link href="/user/saved">Outfit đã lưu</Link>,
      },
      { type: "divider" },
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: <Link href="/user_dashboard">Cài đặt</Link>,
      },
    ];

    if (user?.role === "shop") {
      baseItems.push({
        key: "shop",
        icon: <ShopOutlined />,
        label: <Link href="/seller/dashboard">Shop</Link>,
      });
    }

    if (user?.role === "admin") {
      baseItems.push(
        {
          key: "admin",
          icon: <DashboardOutlined />,
          label: <Link href="/admin">Dashboard</Link>,
        },
        {
          key: "manage-users",
          icon: <SettingOutlined />,
          label: <Link href="/admin/users">Quản lý người dùng</Link>,
        },
        { type: "divider" }
      );
    }

    baseItems.push({
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span className="text-red-600 font-medium">Đăng xuất</span>,
      onClick: logout,
    });

    return baseItems;
  };

  return (
    <header className="w-full bg-[#f4efe9]/95 border-b border-gray-100 fixed z-50 backdrop-blur-xl shadow-sm ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-f">
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-[80px] h-auto  flex items-center justify-center" >
            <img
              src="/images/logo.png"
              alt="OutfitsLab Logo"
              className="object-cover scale-200 transition-transform hover:scale-225"
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-base font-medium text-gray-700">
          <Link href="/" className="hover:text-rose-500 transition">Home</Link>
          <Link href="/product" className="hover:text-rose-500 transition">Collections</Link>
          <Link href="/try-on" className="hover:text-rose-500 transition">Custom-Room</Link>
          <Link href="/SellersList" className="hover:text-rose-500 transition">Shops</Link>
          <Link href="/blog" className="hover:text-rose-500 transition">Community</Link>
          <Link href="/about" className="hover:text-rose-500 transition">About</Link>
        </nav>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-7 text-2xl text-gray-600">
            <BellOutlined className="cursor-pointer hover:text-rose-500 transition-colors" />
            <HeartOutlined className="cursor-pointer hover:text-rose-500 transition-colors" />
          </div>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/sign-up"
                className="px-6 py-2.5 font-semibold text-yellow-700 border-2 border-yellow-700 rounded-xl hover:bg-yellow-50 transition"
              >
                Sign Up
              </Link>
              <Link
                href="/sign-in"
                className="px-7 py-2.5 font-semibold bg-yellow-700 text-white rounded-xl hover:bg-yellow-800 transition"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Dropdown
              menu={{ items: getMenuItems() }}
              placement="bottomRight"
              trigger={["click"]}
              arrow
            >
              <div className="flex items-center gap-3 cursor-pointer group">
                <Avatar
                  size={40}
                  icon={<UserOutlined />}
                />
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
}