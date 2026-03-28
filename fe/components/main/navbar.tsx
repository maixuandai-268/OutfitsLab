'use client';

import Image from 'next/image';
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
import { Avatar, Dropdown, MenuProps, List, Badge, Popover, Button, Spin } from "antd";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

// ─── Type ───────────────────────────────────────────────
interface Notification {
  id: number;
  title: string;
  desc: string;
  isRead: boolean;
  createdAt: string;
}

const API = "http://localhost:3000/api";

export default function Navbar() {
  const { user, logout, token } = useAuth();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // ─── Fetch notifications ────────────────────────────────
  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error("Lỗi fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch khi mount + lắng nghe event từ AddProduct
  useEffect(() => {
    fetchNotifications();

    const handleNewNotification = () => fetchNotifications();
    window.addEventListener("new-notification", handleNewNotification);
    return () => window.removeEventListener("new-notification", handleNewNotification);
  }, [fetchNotifications]);

  // ─── Đánh dấu 1 thông báo đã đọc ──────────────────────
  const handleMarkAsRead = async (id: number) => {
    if (!token) return;
    try {
      await fetch(`${API}/notifications/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Lỗi markAsRead:", err);
    }
  };

  // ─── Đánh dấu tất cả đã đọc ────────────────────────────
  const handleMarkAllAsRead = async () => {
    if (!token) return;
    try {
      await fetch(`${API}/notifications/read-all`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Lỗi markAllAsRead:", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // ─── Popover content ────────────────────────────────────
  const notificationContent = (
    <div className="w-full">
      {/* Header hành động */}
      {unreadCount > 0 && (
        <div className="flex justify-end mb-2">
          <Button
            type="link"
            size="small"
            className="text-rose-500 hover:text-rose-600 p-0 text-xs"
            onClick={handleMarkAllAsRead}
          >
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
      )}

      {/* Danh sách */}
      <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
        {loading ? (
          <div className="flex justify-center py-8">
            <Spin />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            Không có thông báo nào
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item
                className={`px-4 py-3 mb-1 rounded-xl transition cursor-pointer border-b-0
                  ${!item.isRead ? "bg-rose-50/50 hover:bg-rose-50" : "hover:bg-gray-50"}`}
                onClick={() => !item.isRead && handleMarkAsRead(item.id)}
              >
                <List.Item.Meta
                  title={
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-800 text-sm">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-gray-400 font-normal ml-2 shrink-0">
                        {dayjs(item.createdAt).fromNow()}
                      </span>
                    </div>
                  }
                  description={
                    <span className="text-[13px] text-gray-600 line-clamp-2">
                      {item.desc}
                    </span>
                  }
                />
                {!item.isRead && (
                  <div className="w-2 h-2 rounded-full bg-rose-500 ml-4 shrink-0" />
                )}
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );

  // ─── Menu items ─────────────────────────────────────────
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
        key: "my-shops",
        icon: <ShopOutlined />,
        label: <Link href="/my_shops">Shop của tôi</Link>,
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
        key: "shop-dashboard",
        icon: <DashboardOutlined />,
        label: <Link href="/seller/dashboard">Bảng điều khiển Shop</Link>,
      });
    }

    if (user?.role === "admin") {
      baseItems.push(
        { type: "divider" },
        {
          key: "admin",
          icon: <DashboardOutlined />,
          label: <Link href="/admin">Admin Dashboard</Link>,
        },
        {
          key: "manage-users",
          icon: <SettingOutlined />,
          label: <Link href="/admin/users">Quản lý người dùng</Link>,
        }
      );
    }

    baseItems.push(
      { type: "divider" },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: <span className="text-red-600 font-medium">Đăng xuất</span>,
        onClick: logout,
      }
    );

    return baseItems;
  };

  // ─── JSX ────────────────────────────────────────────────
  return (
    <header className="w-full bg-[#f4efe9]/95 border-b border-gray-100 fixed z-50 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-full">
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-20 h-auto flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="OutfitsLab Logo"
              width={80}
              height={80}
              className="object-cover scale-150 transition-transform hover:scale-175"
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-gray-700">
          <Link href="/">Trang chủ</Link>
          <Link href="/product">Bộ sưu tập</Link>
          <Link href="/try-on">Phòng thử đồ</Link>
          <Link href="/SellersList">Cửa hàng</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">Giới thiệu</Link>
        </nav>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-7 text-2xl text-gray-600">

            {/* 🔔 Bell + Popover */}
            <Popover
              title={<span className="text-base font-bold">Thông báo của bạn</span>}
              open={isPopoverOpen}
              onOpenChange={(visible) => {
                setIsPopoverOpen(visible);
                if (visible) fetchNotifications(); // refresh mỗi lần mở
              }}
              trigger="click"
              placement="bottomRight"
              overlayStyle={{ width: 420 }}
              content={notificationContent}
            >
              <Badge count={unreadCount} size="small" offset={[-2, 6]}>
                <BellOutlined className="cursor-pointer hover:text-rose-500 transition-colors text-[24px]" />
              </Badge>
            </Popover>

            <Link href="/saved">
              <HeartOutlined className="cursor-pointer hover:text-rose-500 transition-colors" />
            </Link>
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
                <Avatar size={40} icon={<UserOutlined />} />
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
}