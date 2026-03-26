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
import { Avatar, Dropdown, MenuProps, Modal, List, Badge } from "antd";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    // Hiển thị thêm Dashboard nếu user đã là Seller thực thụ
    if (user?.role === "shop") {
      baseItems.push({
        key: "shop-dashboard",
        icon: <DashboardOutlined />,
        label: <Link href="/seller/dashboard">Bảng điều khiển Shop</Link>,
      });
    }

    // Hiển thị menu cho Admin
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

    // Nút Đăng xuất luôn ở dưới cùng
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
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-[80px] h-auto flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="OutfitsLab Logo"
              className="object-cover scale-150 transition-transform hover:scale-175"
            />
          </div>
        </Link>

        {/* Menu điều hướng chính */}
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
            <Badge count={3} size="small" offset={[-2, 6]}>
              <BellOutlined onClick={() => setIsModalOpen(true)} className="cursor-pointer hover:text-rose-500 transition-colors text-[24px]" />
            </Badge>
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
                <Avatar
                  size={40}
                  icon={<UserOutlined />}
                />
              </div>
            </Dropdown>
          )}
        </div>

        <Modal
          title={<span className="text-lg font-bold">Thông báo của bạn</span>}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={450}
        >
          <div className="max-h-[60vh] overflow-y-auto mt-4 custom-scrollbar pr-2">
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: "Chào mừng bạn mới", desc: "Cảm ơn bạn đã tham gia OutfitsLab!", time: "2 giờ trước", unread: true },
                { title: "Bộ sưu tập Mùa Hè", desc: "Khám phá ngay các mẫu trang phục mới nhất cho mùa hè rực rỡ.", time: "1 ngày trước", unread: false },
                { title: "Sale Off 50%", desc: "Duy nhất hôm nay, giảm giá cực sốc các mẫu áo khoác.", time: "3 ngày trước", unread: false },
                { title: "Sale Off 100%", desc: "giảm giá cực sốc các mẫu áo khoác.", time: "3 ngày trước", unread: true },
              ]}
              renderItem={(item) => (
                <List.Item className={`px-4 py-3 mb-2 rounded-xl transition cursor-pointer border-b-0 ${item.unread ? 'bg-rose-50/50' : 'hover:bg-gray-50'}`}>
                  <List.Item.Meta
                    title={
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-800">{item.title}</span>
                        <span className="text-[11px] text-gray-400 font-normal">{item.time}</span>
                      </div>
                    }
                    description={<span className="text-[13px] text-gray-600 line-clamp-2">{item.desc}</span>}
                  />
                  {item.unread && <div className="w-2 h-2 rounded-full bg-rose-500 ml-4 flex-shrink-0"></div>}
                </List.Item>
              )}
            />
          </div>
        </Modal>
      </div>
    </header>
  );
}