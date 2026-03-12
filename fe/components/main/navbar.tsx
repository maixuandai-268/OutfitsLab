'use client';

import Link from "next/link";
import {
  BellOutlined,
  HeartOutlined,
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Avatar, Dropdown } from "antd";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const menuItems = [
    {
      key: "profile",
      label: <Link href="/profile">Profile</Link>,
    },
  ];

  if (user?.role === "shop") {
    menuItems.push({
      key: "shop",
      label: <Link href="/seller/dashboard">Seller Dashboard</Link>,
    });
  }

  if (user?.role === "admin") {
    menuItems.push(
      {
        key: "admin",
        label: <Link href="/admin">Admin Dashboard</Link>,
      },
      {
        key: "manage-users",
        label: <Link href="/admin/users">Manage Users</Link>,
      }
    );
  }

  menuItems.push({
    key: "logout",
    label: (
      <span
        onClick={logout}
        className="text-red-500 font-medium"
      >
        Logout
      </span>
    ),
  });

  return (
    <header className="w-full bg-[#f4efe9]/95 border-b border-gray-100 fixed z-50 backdrop-blur-2xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-[28px] font-bold tracking-[-2px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
            Outfits
          </span>
          <span className="text-3xl font-bold text-rose-400 tracking-tight">
            Lab
          </span>
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-gray-700">
          <Link href="/">Home</Link>
          <Link href="product">Collections</Link>
          <Link href="try-on">Custom-Room</Link>
          <Link href="SellersList">Shops</Link>
          <Link href="blog">Community</Link>
          <Link href="/about">About</Link>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-8">

          {/* Icons */}
          <div className="flex items-center gap-7 text-2xl text-gray-600">
            <BellOutlined className="cursor-pointer hover:text-rose-500 transition" />
            <HeartOutlined className="cursor-pointer hover:text-rose-500 transition" />
          </div>

          {/* Auth UI */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/sign-up"
                className="px-6 py-2.5 font-semibold text-yellow-700 border-2 border-yellow-700 rounded-2xl"
              >
                Sign Up
              </Link>

              <Link
                href="/sign-in"
                className="px-7 py-2.5 font-semibold bg-yellow-700 text-white rounded-2xl"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Dropdown
              menu={{ items: menuItems }}
              placement="bottomRight"
            >
              <div className="flex items-center gap-3 cursor-pointer">

                <Avatar
                  size={40}
                  icon={<UserOutlined />}
                />

                <span className="font-medium text-gray-700">
                  {user.displayName}
                </span>

              </div>
            </Dropdown>
          )}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-3xl text-gray-700"
        >
          {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

      </div>
    </header>
  );
}