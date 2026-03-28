'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { 
  Table, 
  Tag, 
  Space, 
  Button, 
  message, 
  Popconfirm, 
  Input, 
  Avatar, 
  ConfigProvider, 
  theme 
} from 'antd';
import { 
  DeleteOutlined, 
  EyeOutlined, 
  SearchOutlined, 
  ReloadOutlined,
  ShoppingOutlined,
  RightOutlined,
  FilterOutlined
} from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";
import Card from "../shared/card";
import CardTitle from "../shared/cardTitle";

export default function AdminProductsPage({ dark }: { dark: boolean }) {
  const { token } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.data || data);
      }
    } catch (error) {
      message.error("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        message.success("Đã xóa sản phẩm");
        fetchProducts();
      }
    } catch (error) {
      message.error("Không thể xóa sản phẩm");
    }
  };

  const columns = [
    {
      title: 'Sản phẩm',
      key: 'product',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Avatar 
            shape="square" 
            size={40} 
            src={record.image || record.image_url} 
            icon={<ShoppingOutlined />} 
            className="rounded-lg shadow-sm border border-gray-100"
          />
          <div>
            <div className={`text-[13px] font-semibold ${dark ? 'text-gray-100' : 'text-gray-800'}`}>{record.name}</div>
            <div className="text-[11px] text-gray-400 capitalize">{record.type} • {record.shop?.shop_name || 'N/A'}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span className={`text-[13px] font-semibold ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
        </span>
      ),
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: 'Hiệu suất',
      key: 'performance',
      render: (_: any, record: any) => (
        <div className="text-[12px] space-y-1">
          <div className="flex justify-between w-24">
            <span className="text-gray-400">Bán:</span>
            <span className={`font-medium ${dark ? 'text-gray-200' : 'text-gray-700'}`}>{record.salesCount || 0}</span>
          </div>
          <div className="flex justify-between w-24">
            <span className="text-gray-400">Link:</span>
            <span className="text-blue-500 font-medium">{record.affiliateClicks || 0} clicks</span>
          </div>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
          status === 'active' 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {status === 'active' ? 'HOẠT ĐỘNG' : 'ẨN'}
        </span>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button 
            type="text" 
            size="small"
            className={`flex items-center justify-center ${dark ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-400 hover:text-indigo-600'}`}
            icon={<EyeOutlined />} 
            onClick={() => window.open(`/product_detail/${record.id}`, '_blank')}
          />
          <Popconfirm
            title="Xóa sản phẩm này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            overlayClassName={dark ? 'dark-popconfirm' : ''}
          >
            <Button 
              type="text" 
              size="small"
              danger 
              className="flex items-center justify-center opacity-60 hover:opacity-100"
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchText.toLowerCase()) ||
    p.shop?.shop_name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 12,
        },
      }}
    >
      <div className={`p-6 min-h-full ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
        {/* Breadcrumb Header */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-1.5 text-xs text-gray-400">
            <span>Admin</span>
            <RightOutlined className="text-[10px]" />
            <span className="text-indigo-500 font-medium">Quản lý sản phẩm</span>
          </div>
          <h1 className={`text-xl font-bold ${dark ? "text-gray-50" : "text-gray-900"}`}>Danh sách sản phẩm hệ thống</h1>
          <p className="text-xs text-gray-400 mt-0.5">Giám sát hiệu suất bán hàng và liên kết affiliate của các shop.</p>
        </div>

        <Card dark={dark} className="border-none shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <CardTitle 
              dark={dark} 
              title="Tất cả sản phẩm" 
              sub={`Hiển thị ${filteredProducts.length} sản phẩm`} 
            />
            
            <div className="flex gap-2 w-full md:w-auto">
              <Input 
                placeholder="Tìm sản phẩm, shop..." 
                prefix={<SearchOutlined className="text-gray-400" />}
                className={`max-w-xs rounded-xl border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-slate-200'}`}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button 
                onClick={fetchProducts}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  dark ? "border-gray-700 text-gray-400 hover:bg-gray-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                <ReloadOutlined /> Làm mới
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-100 transition-all"
              >
                <FilterOutlined /> Bộ lọc
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table 
              columns={columns} 
              dataSource={filteredProducts} 
              loading={loading}
              rowKey="id"
              size="small"
              className={`custom-admin-table ${dark ? 'ant-table-dark' : ''}`}
              pagination={{ 
                pageSize: 7, 
                showSizeChanger: false,
                className: "mt-6" 
              }}
              rowClassName={() => `group transition-colors ${dark ? 'hover:bg-gray-900/40' : 'hover:bg-slate-50/80'}`}
            />
          </div>
        </Card>

        <style jsx global>{`
          .custom-admin-table .ant-table {
            background: transparent !important;
          }
          .custom-admin-table .ant-table-thead > tr > th {
            background: transparent !important;
            border-bottom: 1px solid ${dark ? '#374151' : '#f1f5f9'} !important;
            color: #94a3b8 !important;
            font-size: 11px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.05em !important;
            font-weight: 600 !important;
            padding: 12px 12px !important;
          }
          .custom-admin-table .ant-table-tbody > tr > td {
            border-bottom: 1px solid ${dark ? '#374151' : '#f8fafc'} !important;
            padding: 14px 12px !important;
          }
          .custom-admin-table .ant-table-tbody > tr:last-child > td {
            border-bottom: none !important;
          }
          .ant-pagination-item-active {
            border-color: #6366f1 !important;
          }
          .ant-pagination-item-active a {
            color: #6366f1 !important;
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
}
