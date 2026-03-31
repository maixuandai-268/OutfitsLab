'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  List, 
  Badge, 
  Button, 
  message, 
  Empty, 
  Typography, 
  Space, 
  Card,
  Spin,
  Tooltip
} from 'antd';
import { 
  BellOutlined, 
  CheckOutlined, 
  DeleteOutlined, 
  ArrowLeftOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import NotificationItem from '@/components/main/NotificationItem';

const { Title, Text } = Typography;

export default function NotificationsPage() {
  const { user, token } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("https://outfitslab.onrender.com/api/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      message.error("Lỗi khi tải thông báo");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token, fetchNotifications]);

  const handleMarkAsRead = async (id: number) => {
    try {
      const res = await fetch(`https://outfitslab.onrender.com/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(prev => 
          prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật thông báo");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const res = await fetch(`https://outfitslab.onrender.com/api/notifications/read-all`, {
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

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`https://outfitslab.onrender.com/api/notifications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(prev => prev.filter(n => n.id !== id));
        message.success("Đã xóa thông báo");
      }
    } catch (error) {
      message.error("Lỗi khi xóa thông báo");
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Empty description="Vui lòng đăng nhập để xem thông báo" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => router.back()}
              className="rounded-xl border-none shadow-sm hover:scale-110 transition-transform"
            />
            <div>
              <Title level={2} className="!mb-0 !font-black">Thông báo</Title>
              <Text type="secondary">Bạn có {unreadCount} thông báo chưa đọc</Text>
            </div>
          </div>
          
          <Space>
            <Tooltip title="Làm mới">
              <Button 
                icon={<ReloadOutlined />} 
                onClick={fetchNotifications}
                className="rounded-xl"
              />
            </Tooltip>
            {unreadCount > 0 && (
              <Button 
                type="primary"
                icon={<CheckOutlined />} 
                onClick={handleMarkAllAsRead}
                className="rounded-xl bg-blue-500 font-bold"
              >
                Đọc tất cả
              </Button>
            )}
          </Space>
        </div>

        {/* Content */}
        <Card className="rounded-[32px] border-none shadow-xl overflow-hidden p-0">
          {loading ? (
            <div className="py-20 text-center">
              <Spin tip="Đang tải thông báo..." size="large" />
            </div>
          ) : notifications.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {notifications.map((n) => (
                <div key={n.id} className="relative group">
                  <NotificationItem 
                    notification={n} 
                    onRead={handleMarkAsRead} 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="Xóa">
                      <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDelete(n.id)}
                        className="hover:scale-110"
                      />
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20">
              <Empty 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
                description="Bạn chưa có thông báo nào" 
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
