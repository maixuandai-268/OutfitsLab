'use client';

import React, { useEffect, useState } from 'react';
import { Card, Tag, Button, Typography, Empty, Tooltip, Spin, Avatar } from 'antd';
import { 
  ShopOutlined, 
  ArrowRightOutlined, 
  LockOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";

const { Title, Text } = Typography;

interface Shop {
  id: number; // Backend dùng ParseIntPipe nên id là number
  shop_name: string; 
  status: 'pending' | 'approved' | 'rejected';
  description: string;
}

export default function MyShopsPage() {
  const { user, token } = useAuth(); // Lấy cả user và token từ Context
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      // Nếu chưa có user hoặc chưa có token thì chưa gọi API
      if (!user || !token) {
        if (!token) setLoading(false); 
        return;
      }
      
      try {
        setLoading(true);
        // GỌI ĐÚNG ĐƯỜNG DẪN TRONG CONTROLLER: shops/my-shop
        // Không cần truyền ID vào URL vì Backend lấy từ req.user.id
        const response = await fetch(`http://localhost:3000/api/shops/my-shop`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        const data = await response.json();
        console.log("DỮ LIỆU BACKEND TRẢ VỀ:", data);
        
        /**
         * LƯU Ý: Nếu findByUserId trả về 1 object duy nhất (vì 1 user 1 shop)
         * thì ta phải đưa nó vào mảng [data] để map được.
         */
        if (response.ok && data) {
           const shopData = Array.isArray(data) ? data : [data];
           setShops(shopData);
        } else {
           setShops([]);
        }

      } catch (error) {
        console.error("Lỗi kết nối tới Backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [user, token]); // Chạy lại khi user hoặc token thay đổi

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <Spin size="large" />
        <Text type="secondary">Đang tải danh sách shop của bạn...</Text>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 pt-32 min-h-screen">
      <div className="flex justify-between items-end mb-10 border-b pb-6">
        <div>
          <Title level={2} className="!mb-1">🏪 Shop của tôi</Title>
          <Text type="secondary">Xem trạng thái phê duyệt và quản lý cửa hàng của bạn</Text>
        </div>
        <Link href="/become">
          <Button type="primary" size="large" className="bg-yellow-700 hover:bg-yellow-800 border-none rounded-lg shadow-md">
            + Đăng ký thêm shop
          </Button>
        </Link>
      </div>

      {shops.length > 0 && shops[0].id ? ( // Kiểm tra mảng có shop thật không
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <Card 
              key={shop.id}
              hoverable={shop.status === 'approved'}
              className={`overflow-hidden border-2 transition-all duration-300 ${
                shop.status === 'pending' 
                  ? 'bg-gray-50 border-gray-200 border-dashed opacity-85' 
                  : 'bg-white border-yellow-100 shadow-sm hover:shadow-md'
              }`}
              actions={[
                shop.status === 'approved' ? (
                  <Link href={`/shop_dashboard/${shop.id}`} key="manage" className="flex justify-center items-center gap-2 group">
                    <span className="text-yellow-700 font-bold group-hover:text-yellow-600 transition-colors">
                      Vào Quản Lý <ArrowRightOutlined />
                    </span>
                  </Link>
                ) : (
                  <Tooltip title={shop.status === 'pending' ? "Đang chờ Admin duyệt" : "Yêu cầu bị từ chối"}>
                    <div className="text-gray-400 cursor-not-allowed flex justify-center items-center gap-2">
                      <LockOutlined /> <span>Chưa khả dụng</span>
                    </div>
                  </Tooltip>
                )
              ]}
            >
              <Card.Meta
                avatar={
                  <Avatar 
                    size={48} 
                    icon={<ShopOutlined />} 
                    className={shop.status === 'approved' ? 'bg-yellow-700' : 'bg-gray-300'}
                  />
                }
                title={<span className="text-lg font-semibold block truncate">{shop.shop_name}</span>}
                description={
                  <div className="mt-2">
                    <div className="mb-3">
                      <StatusTag status={shop.status} />
                    </div>
                    <Text type="secondary" className="line-clamp-2 h-10 italic">
                      {shop.description || "Chưa có mô tả."}
                    </Text>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            styles={{ image: { height: 80 } }}
            description="Bạn chưa có cửa hàng nào được đăng ký."
          />
          <Link href="/become" className="mt-8">
            <Button size="large" className="rounded-full px-10 border-yellow-700 text-yellow-700 hover:bg-yellow-50 font-semibold h-12">
              Bắt đầu đăng ký Shop
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

const StatusTag = ({ status }: { status: string }) => {
  switch (status) {
    case 'approved': return <Tag color="green" icon={<CheckCircleOutlined />}>Đã hoạt động</Tag>;
    case 'pending': return <Tag color="gold" icon={<ClockCircleOutlined />}>Đang chờ duyệt</Tag>;
    case 'rejected': return <Tag color="red" icon={<ExclamationCircleOutlined />}>Bị từ chối</Tag>;
    default: return <Tag>Không xác định</Tag>;
  }
};