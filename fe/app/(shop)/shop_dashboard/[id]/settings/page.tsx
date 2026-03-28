'use client'

import {
  SettingOutlined,
  MailOutlined,
  UserOutlined,
  LoadingOutlined,
  EditOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { message, Spin, Input, Modal, Button, Avatar } from 'antd';

const { TextArea } = Input;

export default function SettingsPage() {
  const params = useParams();
  const { token } = useAuth();
  const shopId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [shopData, setShopData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/shops/${shopId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setShopData(data);
        }
      } catch (error) {
        message.error("Không thể tải thông tin cửa hàng");
      } finally {
        setLoading(false);
      }
    };
    if (shopId && token) fetchShop();
  }, [shopId, token]);

  const openEditModal = () => {
    setEditForm({
      shop_name: shopData.shop_name,
      contact_email: shopData.contact_email,
      description: shopData.description,
      avatar_url: shopData.avatar_url,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:3000/api/shops/${shopId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm) // Gửi editForm thay vì shopData cũ
      });
      if (res.ok) {
        message.success("Cập nhật thông tin thành công!");
        setShopData({ ...shopData, ...editForm });
        setIsModalOpen(false);
      } else {
        message.error("Lỗi khi cập nhật thông tin");
      }
    } catch (error) {
      message.error("Lỗi kết nối máy chủ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Spin size="large" tip="Đang tải cài đặt..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Cài đặt cửa hàng</h2>
          <p className="text-gray-500 mt-1">Quản lý các thông tin định danh và mô tả của gian hàng</p>
        </div>
        <Button 
          type="primary"
          size="large"
          icon={<EditOutlined />}
          onClick={openEditModal}
          className="bg-[#d19f42] hover:!bg-[#b88a3a] border-none px-8 h-14 rounded-2xl font-bold shadow-lg shadow-orange-100 flex items-center gap-2"
        >
          Chỉnh sửa thông tin
        </Button>
      </div>

      {/* Shop Profile Card */}
      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d19f42]/5 rounded-bl-full -z-0" />
        
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
          <Avatar 
            size={160} 
            src={shopData?.avatar_url || 'https://via.placeholder.com/150'} 
            className="border-8 border-white shadow-2xl shrink-0 bg-gray-100 flex-none"
          />
          
          <div className="flex-1 text-center md:text-left pt-4">
            <h1 className="text-4xl font-black text-slate-800 mb-2">{shopData?.shop_name}</h1>
            <div className="inline-flex items-center px-4 py-1.5 bg-gray-50 rounded-full mb-6">
              <MailOutlined className="mr-2 text-[#d19f42]" />
              <span className="text-sm font-bold text-gray-500">{shopData?.contact_email}</span>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Mô tả cửa hàng</h3>
              <p className="text-gray-600 leading-relaxed text-lg max-w-2xl">
                {shopData?.description || 'Cửa hàng này chưa có mô tả. Hãy nhấn "Chỉnh sửa thông tin" để cập nhật ngay!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title={
          <div className="text-xl font-black py-4 border-b border-gray-50 mb-6 flex items-center gap-2">
            <SettingOutlined className="text-[#d19f42]" />
            Chỉnh sửa thông tin cửa hàng
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)} className="rounded-xl h-12 px-6">
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={saving} 
            onClick={handleSave}
            className="rounded-xl h-12 px-8 bg-[#d19f42] hover:!bg-[#b88a3a] border-none font-bold"
          >
            Lưu thay đổi
          </Button>,
        ]}
        width={600}
        centered
        className="custom-modal"
      >
        <div className="space-y-6 pb-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase ml-1">Tên cửa hàng</label>
            <Input 
              size="large"
              placeholder="Nhập tên shop mới..."
              className="rounded-xl border-gray-100 bg-gray-50 py-3"
              value={editForm.shop_name}
              onChange={(e) => setEditForm({...editForm, shop_name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase ml-1">Email liên hệ</label>
            <Input 
              size="large"
              prefix={<MailOutlined className="text-gray-400 mr-2" />}
              placeholder="shop@example.com"
              className="rounded-xl border-gray-100 bg-gray-50 py-3"
              value={editForm.contact_email}
              onChange={(e) => setEditForm({...editForm, contact_email: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-gray-400 uppercase ml-1 flex items-center gap-2">
              <UploadOutlined className="text-[#d19f42]" /> Link Ảnh Đại Diện (Avatar URL)
            </label>
            <Input 
              size="large"
              placeholder="Nhập URL hình ảnh (https://...)"
              className="rounded-xl border-gray-100 bg-gray-50 py-3"
              value={editForm.avatar_url}
              onChange={(e) => setEditForm({...editForm, avatar_url: e.target.value})}
            />
            <div className="mt-3 relative h-40 w-full rounded-2xl border border-gray-100 overflow-hidden bg-white flex items-center justify-center group shadow-sm">
              {editForm.avatar_url ? (
                <img src={editForm.avatar_url} alt="Preview" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              ) : (
                <div className="text-center">
                  <UploadOutlined className="text-2xl text-gray-300" />
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Xem Trước Hình Ảnh</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase ml-1">Mô tả gian hàng</label>
            <TextArea 
              rows={5}
              placeholder="Viết gì đó về shop của bạn..."
              className="rounded-xl border-gray-100 bg-gray-50 p-4"
              value={editForm.description}
              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
            />
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .custom-modal .ant-modal-content {
          border-radius: 32px !important;
          overflow: hidden;
        }
        .custom-modal .ant-modal-header {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}