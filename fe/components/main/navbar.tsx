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
import { Avatar, Dropdown, MenuProps, Modal, List, Badge, message } from "antd";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleShopClick = () => {
    if (!user?.shopId) {
      message.info("Bạn chưa có shop. Hãy đăng ký để bắt đầu bán hàng!");
      return;
    }

    if (user?.shopStatus === 'pending') {
      message.warning("Cửa hàng của bạn đang chờ phê duyệt từ hệ thống!");
      return;
    }

    // Trường hợp 'rejected' sẽ không xảy ra nữa vì DB đã bị xóa, 
    // nhưng ta giữ lại check để code an toàn hơn
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

  return (
    <header className="w-full bg-[#f4efe9]/95 border-b border-gray-100 fixed z-50 backdrop-blur-xl shadow-sm ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-[80px] h-auto flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="OutfitsLab Logo"
              className="object-cover scale-150 transition-transform hover:scale-175"
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-yellow-700 transition-colors">Trang chủ</Link>
          <Link href="/product" className="hover:text-yellow-700 transition-colors">Bộ sưu tập</Link>
          <Link href="/try-on" className="hover:text-yellow-700 transition-colors">Phòng thử đồ</Link>
          <Link href="/SellersList" className="hover:text-yellow-700 transition-colors">Cửa hàng</Link>
          <Link href="/blog" className="hover:text-yellow-700 transition-colors">Cộng đồng</Link>
          <Link href="/about" className="hover:text-yellow-700 transition-colors">Giới thiệu</Link>
          
          {/* NÚT TRỞ THÀNH SHOP: Hiện lại khi shopId là null (do Admin xóa DB) */}
          {user && !user.shopId && (
            <Link 
              href="/become" 
              className="text-yellow-700 font-bold hover:text-yellow-800 transition-colors underline decoration-2 underline-offset-4"
            >
              Trở thành Shop
            </Link>
          )}

          {/* TRẠNG THÁI CHỜ: Hiện khi đã đăng ký nhưng chưa được duyệt */}
          {user && user.shopId && user.shopStatus === 'pending' && (
            <span className="text-orange-500 font-medium italic animate-pulse">
              Đang chờ duyệt...
            </span>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-7 text-2xl text-gray-600">
            <Badge count={3} size="small" offset={[-2, 6]}>
              <BellOutlined 
                onClick={() => setIsModalOpen(true)} 
                className="cursor-pointer hover:text-rose-500 transition-colors text-[24px]" 
              />
            </Badge>
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