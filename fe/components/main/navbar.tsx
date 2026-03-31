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
  CheckOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Badge, message, List, Empty, Button } from "antd";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import NotificationItem from "./NotificationItem";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Lỗi tải thông báo:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      // Polling thông báo mỗi 30 giây
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user, fetchNotifications]);

  const handleMarkAsRead = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
      }
    } catch (error) {
      message.error("Không thể cập nhật trạng thái thông báo");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/notifications/read-all`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        message.success("Đã đánh dấu tất cả là đã đọc");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật thông báo");
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleShopClick = () => {
    if (!user?.shopId) {
      message.info("Bạn chưa có shop. Hãy đăng ký để bắt đầu bán hàng!");
      return;
    }

    if (user?.shopStatus === 'pending') {
      message.warning("Cửa hàng của bạn đang chờ phê duyệt từ hệ thống!");
      return;
    }

    if (user?.shopStatus === 'rejected') {
      message.error("Đơn đăng ký cửa hàng đã bị từ chối.");
      return;
    }

    router.push(`/shop_dashboard/${user.shopId}`);
  };

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
        key: "shop-management",
        icon: <ShopOutlined />,
        label: <span onClick={handleShopClick} className="cursor-pointer">Chi tiết cửa hàng</span>,
      },
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

    if (user?.role === "admin") {
      baseItems.push(
        { type: "divider" },
        {
          key: "admin",
          icon: <DashboardOutlined />,
          label: <Link href="/admin">Admin Dashboard</Link>,
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

  const notificationContent = (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 overflow-hidden">
      <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-bold text-gray-800">Thông báo</h3>
        {unreadCount > 0 && (
          <Button
            type="text"
            size="small"
            icon={<CheckOutlined />}
            onClick={handleMarkAllAsRead}
            className="text-blue-500 text-[11px] font-bold"
          >
            Đọc tất cả
          </Button>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map(n => (
            <NotificationItem
              key={n.id}
              notification={n}
              onRead={handleMarkAsRead}
            />
          ))
        ) : (
          <div className="py-10 px-4">
            <Empty description="Không có thông báo nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </div>
      <div className="p-2 border-t border-gray-50 text-center">
        <Link href="/user/notifications" className="text-[12px] font-bold text-gray-400 hover:text-blue-500 transition-colors">
          Xem tất cả thông báo
        </Link>
      </div>
    </div>
  );

  return (
    <header className="w-full bg-[#f4efe9]/95 border-b border-gray-100 sticky top-0 z-50 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-full">
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-[80px] h-auto flex items-center justify-center">
            <img
              src="/images/Logo.png"
              alt="OutfitsLab Logo"
              className="object-cover scale-200 transition-transform hover:scale-250"
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-yellow-700 transition-colors">Trang chủ</Link>
          <Link href="/product" className="hover:text-yellow-700 transition-colors">Bộ sưu tập</Link>
          <Link href="/try-on" className="hover:text-yellow-700 transition-colors">Phòng thử đồ</Link>
          <Link href="/SellersList" className="hover:text-yellow-700 transition-colors">Cửa hàng</Link>
          <Link href="/blog" className="hover:text-yellow-700 transition-colors">Cộng đồng</Link>
          <Link href="/about" className="hover:text-yellow-700 transition-colors">Giới thiệu</Link>

          {user && !user.shopId && (
            <Link
              href="/become"
              className="text-yellow-700 font-bold hover:text-yellow-800 transition-colors underline decoration-2 underline-offset-4"
            >
              Trở thành Shop
            </Link>
          )}

          {user && user.shopId && user.shopStatus === 'pending' && (
            <span className="text-orange-500 font-medium italic animate-pulse">
              Đang chờ duyệt...
            </span>
          )}
        </nav>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-7 text-2xl text-gray-600">
            {user ? (
              <Dropdown
                popupRender={() => notificationContent}
                trigger={['click']}
                placement="bottomRight"
                arrow
              >
                <Badge count={unreadCount} size="small" offset={[-2, 6]}>
                  <BellOutlined className="cursor-pointer hover:text-rose-500 transition-colors text-[24px]" />
                </Badge>
              </Dropdown>
            ) : (
              <Badge count={0} size="small" offset={[-2, 6]}>
                <BellOutlined className="cursor-pointer hover:text-rose-500 transition-colors text-[24px]" />
              </Badge>
            )}
            <Link href="/saved">
              <HeartOutlined className="cursor-pointer hover:text-rose-500 transition-colors" />
            </Link>
          </div>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link href="/sign-up" className="px-6 py-2.5 font-semibold text-yellow-700 border-2 border-yellow-700 rounded-xl hover:bg-yellow-50 transition">Đăng ký</Link>
              <Link href="/sign-in" className="px-7 py-2.5 font-semibold bg-yellow-700 text-white rounded-xl hover:bg-yellow-800 transition">Đăng nhập</Link>
            </div>
          ) : (
            <Dropdown menu={{ items: getMenuItems() }} placement="bottomRight" trigger={["click"]} arrow>
              <div className="flex items-center gap-3 cursor-pointer group">
                <Avatar
                  size={40}
                  src={user.avatarUrl}
                  icon={!user.avatarUrl && <UserOutlined />}
                  className="border border-gray-200"
                />
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
}