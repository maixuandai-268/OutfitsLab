'use client'

import React, { useEffect, useState, useCallback } from 'react';
import {
  Table, Tag, Space, Button, App, Popconfirm, Input,
  Avatar, ConfigProvider, theme, Modal, Upload, Typography, Rate, Divider, Select
} from 'antd';
import {
  DeleteOutlined, EyeOutlined, SearchOutlined, ReloadOutlined,
  ShoppingOutlined, RightOutlined, CloudUploadOutlined, LinkOutlined,
  MailOutlined, EnvironmentOutlined, InboxOutlined, CheckCircleFilled,
} from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";
import Card from "../shared/card";
import CardTitle from "../shared/cardTitle";

const { Text, Title } = Typography;

type GarmentSlotKey = 'top' | 'bottom' | 'shoes' | 'hat';

const SLOT_OPTIONS = [
  { label: 'Áo', value: 'top' as GarmentSlotKey },
  { label: 'Quần', value: 'bottom' as GarmentSlotKey },
  { label: 'Giày', value: 'shoes' as GarmentSlotKey },
  { label: 'Mũ', value: 'hat' as GarmentSlotKey },
];

const BODY_TYPE_ZONES = [
  { key: 'skinny' as const, label: 'Gầy (Skinny)' },
  { key: 'fit' as const, label: 'Bình thường (Fit)' },
  { key: 'fat' as const, label: 'Mập (Fat)' },
];

const needsBodySplit = (slot: GarmentSlotKey | null) => slot === 'top' || slot === 'bottom';

export default function AdminProductsPage({ dark }: { dark: boolean }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: { colorPrimary: '#6366f1', borderRadius: 12 },
      }}
    >
      <App>
        <AdminProductsContent dark={dark} />
      </App>
    </ConfigProvider>
  );
}

function AdminProductsContent({ dark }: { dark: boolean }) {
  const { message } = App.useApp();
  const { token } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState('');
  const [garmentSlot, setGarmentSlot] = useState<GarmentSlotKey | null>(null);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [modelUrls, setModelUrls] = useState({ skinny: '', fit: '', fat: '' });
  const [singleModelUrl, setSingleModelUrl] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://outfitslab.onrender.com/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.data || data);
      }
    } catch {
      message.error('Lỗi khi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const openUploadModal = (product: any) => {
    setSelectedProduct(product);
    setAffiliateLink(product.affiliateLink || '');
    setGender(product.gender === 'female' ? 'female' : 'male');
    setGarmentSlot(product.garment_slot || null);
    const isArray = Array.isArray(product.model_url);
    setModelUrls({
      skinny: isArray ? (product.model_url[0] || '') : '',
      fit: isArray ? (product.model_url[1] || '') : '',
      fat: isArray ? (product.model_url[2] || '') : '',
    });
    setSingleModelUrl(isArray ? (product.model_url[0] || '') : '');
    setIsUploadModalOpen(true);
  };

  const openShopModal = (product: any) => {
    setSelectedProduct(product);
    setIsShopModalOpen(true);
  };

  // ─── Save ───────────────────────────────────────────────────────────────────
  const handleSaveUpload = async () => {
    if (!selectedProduct) return;
    setUploadLoading(true);
    try {
      const payload: any = {
        affiliateLink,
        gender,
        garment_slot: garmentSlot || undefined,
        is3DGenerated: !!(garmentSlot && (singleModelUrl || modelUrls.skinny || modelUrls.fit || modelUrls.fat)),
      };

      if (needsBodySplit(garmentSlot)) {
        payload.model_url = [modelUrls.skinny || '', modelUrls.fit || '', modelUrls.fat || ''];
      } else if (garmentSlot) {
        payload.model_url = [singleModelUrl || ''];
      }

      const res = await fetch(`https://outfitslab.onrender.com/api/products/${selectedProduct.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success('Cập nhật thông tin thành công');
        setIsUploadModalOpen(false);
        fetchProducts();
      } else {
        const err = await res.json();
        message.error(err.message || 'Cập nhật thất bại');
      }
    } catch {
      message.error('Lỗi kết nối');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`https://outfitslab.onrender.com/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) { message.success('Đã xóa sản phẩm'); fetchProducts(); }
    } catch {
      message.error('Không thể xóa sản phẩm');
    }
  };

  // ─── Helper: 3D status tag ─────────────────────────────────────────────────
  const render3DTag = (record: any) => {
    const slot: string | undefined = record.garment_slot;
    if (!slot) return <Tag color="default" className="text-[10px] rounded-full px-2 border-none">Chưa gán slot</Tag>;

    const arr = Array.isArray(record.model_url) ? record.model_url : [];

    if (slot === 'shoes' || slot === 'hat') {
      return arr[0] || (typeof record.model_url === 'string' && record.model_url)
        ? <Tag color="success" className="text-[10px] rounded-full px-2 border-none">✓ {slot === 'shoes' ? 'Giày' : 'Mũ'} 3D</Tag>
        : <Tag color="default" className="text-[10px] rounded-full px-2 border-none">Chưa có 3D</Tag>;
    }

    const count = arr.filter(Boolean).length;
    const color = count === 3 ? 'success' : count > 0 ? 'processing' : 'default';
    const label = count === 0 ? 'Chưa có 3D' : count === 3 ? '✓ Đủ 3 thân hình' : `${count}/3 thân hình`;
    return <Tag color={color} className="text-[10px] rounded-full px-2 border-none">{label}</Tag>;
  };

  // ─── Columns ────────────────────────────────────────────────────────────────
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
            <div className="flex items-center gap-1">
              <button
                onClick={() => openShopModal(record)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 underline cursor-pointer bg-transparent border-none p-0"
              >
                {record.shop?.shop_name || 'N/A'}
              </button>
              <span className="text-[11px] text-gray-400">• {record.type}</span>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Try-on 3D',
      key: 'status3d',
      render: (_: any, record: any) => render3DTag(record),
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
            title="Upload file 3D & Affiliate"
            className={`flex items-center justify-center ${dark ? 'text-emerald-400 hover:bg-emerald-400/10' : 'text-emerald-600 hover:bg-emerald-50'}`}
            icon={<CloudUploadOutlined />}
            onClick={() => openUploadModal(record)}
          />
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
    p.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    p.shop?.shop_name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={`p-6 min-h-full ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-1.5 text-xs text-gray-400">
          <span>Admin</span>
          <RightOutlined className="text-[10px]" />
          <span className="text-indigo-500 font-medium">Quản lý sản phẩm</span>
        </div>
        <h1 className={`text-xl font-bold ${dark ? 'text-gray-50' : 'text-gray-900'}`}>
          Danh sách sản phẩm hệ thống
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Gán model 3D và slot thử đồ cho từng sản phẩm.
        </p>
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
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${dark ? 'border-gray-700 text-gray-400 hover:bg-gray-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
            >
              <ReloadOutlined /> Làm mới
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
            pagination={{ pageSize: 7, showSizeChanger: false, className: 'mt-6' }}
          />
        </div>
      </Card>

      <Modal
        title={<div className="text-lg font-bold pb-2 border-b border-gray-100">Upload Tài Nguyên 3D</div>}
        open={isUploadModalOpen}
        onOk={handleSaveUpload}
        onCancel={() => setIsUploadModalOpen(false)}
        confirmLoading={uploadLoading}
        okText="Lưu thay đổi"
        cancelText="Hủy"
        width={540}
        centered
      >
        <div className="py-4 space-y-5">
          <div>
            <p className="font-semibold text-sm mb-2">1. Giới tính của đồ 3D</p>
            <Select
              className="w-full"
              size="large"
              value={gender}
              onChange={setGender}
              options={[
                { label: 'Nam', value: 'male' },
                { label: 'Nữ', value: 'female' },
              ]}
            />
          </div>

          <div>
            <p className="font-semibold text-sm mb-2">2. Đây là loại trang phục nào?</p>
            <Select
              className="w-full"
              size="large"
              placeholder="Chọn loại trang phục..."
              value={garmentSlot || undefined}
              onChange={(val) => {
                setGarmentSlot(val);
                setModelUrls({ skinny: '', fit: '', fat: '' });
                setSingleModelUrl('');
              }}
              options={SLOT_OPTIONS}
            />
          </div>

          {garmentSlot && (
            <div>
              <p className="font-semibold text-sm mb-2">
                3. Upload model 3D (.glb)
                {needsBodySplit(garmentSlot) && (
                  <span className="ml-1 text-xs text-gray-400 font-normal">– cần 3 file cho 3 dáng người</span>
                )}
              </p>

              {needsBodySplit(garmentSlot) ? (
                /* Áo / Quần → 3 zones */
                <div className="space-y-2">
                  {BODY_TYPE_ZONES.map(({ key, label }) => (
                    <div key={key}>
                      <p className="text-xs text-gray-500 mb-1 font-medium">{label}</p>
                      <Upload.Dragger
                        name="file"
                        multiple={false}
                        action="https://outfitslab.onrender.com/api/upload"
                        headers={{ Authorization: `Bearer ${token}` }}
                        showUploadList={false}
                        style={{ padding: '2px 0' }}
                        onChange={(info) => {
                          if (info.file.status === 'done') {
                            setModelUrls(prev => ({ ...prev, [key]: info.file.response.url }));
                            message.success(`${label} upload thành công!`);
                          } else if (info.file.status === 'error') {
                            message.error(`${label} upload thất bại.`);
                          }
                        }}
                      >
                        {modelUrls[key] ? (
                          <p className="text-xs text-green-600 font-bold py-2 flex items-center justify-center gap-1">
                            <CheckCircleFilled /> {modelUrls[key].split('/').pop()?.slice(0, 40)}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400 py-2 flex items-center justify-center gap-1">
                            <InboxOutlined /> Kéo thả hoặc nhấn để chọn .glb
                          </p>
                        )}
                      </Upload.Dragger>
                    </div>
                  ))}
                </div>
              ) : (

                <Upload.Dragger
                  name="file"
                  multiple={false}
                  action="https://outfitslab.onrender.com/api/upload"
                  headers={{ Authorization: `Bearer ${token}` }}
                  showUploadList={false}
                  onChange={(info) => {
                    if (info.file.status === 'done') {
                      setSingleModelUrl(info.file.response.url);
                      message.success('Upload thành công!');
                    } else if (info.file.status === 'error') {
                      message.error('Upload thất bại.');
                    }
                  }}
                >
                  {singleModelUrl ? (
                    <p className="text-xs text-green-600 font-bold py-3 flex items-center justify-center gap-1">
                      <CheckCircleFilled /> {singleModelUrl.split('/').pop()?.slice(0, 45)}
                    </p>
                  ) : (
                    <>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined className="text-indigo-500" style={{ fontSize: 36 }} />
                      </p>
                      <p className="ant-upload-text text-sm">Kéo thả hoặc nhấn để chọn .glb</p>
                    </>
                  )}
                </Upload.Dragger>
              )}
            </div>
          )}

          <div>
            <p className="font-semibold text-sm mb-2">3. Đường dẫn Affiliate (tuỳ chọn)</p>
            <Input
              prefix={<LinkOutlined className="text-gray-400" />}
              placeholder="Nhập link affiliate (Shopee, Lazada...)"
              value={affiliateLink}
              onChange={(e) => setAffiliateLink(e.target.value)}
              className="rounded-lg py-2"
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={isShopModalOpen}
        footer={null}
        onCancel={() => setIsShopModalOpen(false)}
        width={400}
        centered
      >
        {selectedProduct?.shop && (
          <div className="py-2">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar
                size={80}
                src={selectedProduct.shop.avatar_url}
                className="shadow-md border-2 border-indigo-500 mb-3"
              />
              <Title level={4} className="m-0 uppercase tracking-wide">{selectedProduct.shop.shop_name}</Title>
              <Tag color="gold" className="mt-2 rounded-full px-4 border-none font-bold">PRO SELLER</Tag>
            </div>
            <Divider className="my-4" />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                  <MailOutlined />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Email</div>
                  <div className="text-sm">{selectedProduct.shop.contact_email || 'Chưa cập nhật'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <EnvironmentOutlined />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Địa chỉ</div>
                  <div className="text-sm">{selectedProduct.shop.location || 'Việt Nam'}</div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-gray-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Đánh giá shop</div>
                <Rate disabled defaultValue={Number(selectedProduct.shop.rating) || 5} />
              </div>
              <div className="text-xl font-bold text-indigo-500">{selectedProduct.shop.rating || '5.0'}</div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}