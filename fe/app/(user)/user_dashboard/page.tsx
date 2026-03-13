"use client";
import React, { useState } from 'react';
import { 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  StarFilled, 
  ExportOutlined, 
  MessageOutlined, 
  HeartOutlined, 
  CheckCircleFilled, 
  RightOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { notification } from 'antd';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('about');
  const {user} = useAuth();

  const handleRemove = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!')) {
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users/remove", {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user?.id })
      });

      if (!res.ok) {
        notification.error({
          message: 'Lỗi khi xóa tài khoản',
          description: 'Vui lòng thử lại sau.',
          duration: 4,
        });
        return;
      }

      notification.success({
        message: 'Xóa tài khoản thành công',
        duration: 4,
        description: 'Tài khoản của bạn đã không còn tồn tại, bạn sẽ được chuyển về trang chủ',
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      notification.error({
        message: 'Lỗi kết nối',
        description: 'Không thể kết nối đến server. Vui lòng kiểm tra lại.',
        duration: 4,
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 font-sans text-left text-zinc-900">
      <div className="bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 pt-12 pb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-full bg-[#fa649a] border-[6px] border-white shadow-xl flex items-center justify-center text-6xl">
                👩‍🦰
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h1 className="text-4xl font-extrabold tracking-tight">Linh Trang</h1>
                  <div className="flex flex-col gap-1 mt-3">
                    <p className="flex items-center gap-2 text-slate-500 text-sm font-medium"><MailOutlined className="text-xs"/> linh.trang@example.com</p>
                    <p className="flex items-center gap-2 text-slate-500 text-sm font-medium"><PhoneOutlined className="text-xs"/> +84 123 456 789</p>
                    <p className="flex items-center gap-2 text-slate-500 text-sm font-medium"><EnvironmentOutlined className="text-xs"/> Thành phố Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-500 text-sm mt-4 leading-relaxed max-w-2xl font-medium">
                Người đam mê thời trang và sáng tạo outfit | Yêu thích kết hợp phong cách vintage cùng hiện đại
              </p>

              <div className="flex flex-wrap gap-10 mt-8 pt-6 border-t border-zinc-100">
                <div className="text-left"><p className="text-2xl font-extrabold text-[#fa649a]">45</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Đơn hàng</p></div>
                <div className="text-left"><p className="text-2xl font-extrabold text-[#fa649a]">3</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Outfit</p></div>
                <div className="text-left"><p className="text-2xl font-extrabold text-[#fa649a]">3</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Cửa hàng yêu thích</p></div>
                <div className="text-left"><p className="text-2xl font-extrabold text-[#fa649a]">2024</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Thành viên từ</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex gap-10 border-b border-zinc-200 bg-transparent px-2">
          {[
            { id: 'about', name: 'Giới thiệu' },
            { id: 'saved-outfits', name: 'Outfit đã lưu' },
            { id: 'liked-shops', name: 'Cửa hàng yêu thích' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold transition-all border-b-4 ${
                activeTab === tab.id ? "border-[#fa649a] text-[#fa649a]" : "border-transparent text-slate-400 hover:text-slate-500"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {activeTab === 'about' && <AboutSection onDelete={handleRemove} />}
          {activeTab === 'saved-outfits' && <OutfitsSection />}
          {activeTab === 'liked-shops' && <ShopsSection />}
        </div>
      </div>
    </div>
  );
}

function AboutSection({ onDelete }: { onDelete: () => void }) {
  const [userInfo, setUserInfo] = useState({
    fullName: "Linh Trang",
    email: "linh.trang@example.com",
    phone: "+84 123 456 789",
    location: "Thành phố Hồ Chí Minh, Việt Nam"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-xl">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight">Cài đặt tài khoản</h2>
            <button onClick={() => alert('Đã lưu!')} className="bg-[#fa649a] text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-[#fa649a]/90 transition-all shadow-md">
              Lưu thay đổi
            </button>
          </div>
          
          <div className="flex flex-col gap-6 max-w-2xl">
            {[
              { label: "Họ và tên", name: "fullName", value: userInfo.fullName },
              { label: "Địa chỉ email", name: "email", value: userInfo.email, type: "email" },
              { label: "Số điện thoại", name: "phone", value: userInfo.phone },
              { label: "Địa điểm", name: "location", value: userInfo.location }
            ].map((input) => (
              <div key={input.name} className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em]">{input.label}</label>
                <input 
                  type={input.type || "text"}
                  name={input.name}
                  value={input.value}
                  onChange={handleChange}
                  placeholder={input.label}
                  className="w-full p-4 bg-slate-50 border border-zinc-100 rounded-2xl font-bold text-slate-700 text-sm focus:outline-none focus:border-[#fa649a] focus:bg-white transition-all shadow-inner"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FFF1F2] border border-rose-100 p-8 rounded-3xl flex justify-between items-center">
          <div>
            <h4 className="text-rose-600 font-extrabold text-base">Khu vực nguy hiểm</h4>
            <p className="text-rose-400 text-xs font-medium">Một khi bạn xóa tài khoản, sẽ không thể khôi phục lại.</p>
          </div>
          <button 
            onClick={onDelete}
            className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-rose-700 transition-all"
          >
            <DeleteOutlined /> Xóa tài khoản
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xl">
          <h3 className="font-extrabold mb-6 border-b pb-4">Tác vụ nhanh</h3>
          <div className="space-y-3">
            {["Outfit đã lưu của tôi", "Phòng thử đồ", "Lịch sử đơn hàng", "Đổi mật khẩu"].map(item => (
              <div key={item} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer transition-all group">
                {item} <RightOutlined className="text-slate-300 group-hover:text-[#fa649a]" style={{ fontSize: '12px' }} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xl">
          <h3 className="font-extrabold mb-4 border-b pb-4">Thông tin tài khoản</h3>
          <div className="space-y-4 text-sm font-bold">
            <div className="flex justify-between">
              <span className="text-slate-400">Trạng thái</span>
              <span className="text-emerald-500 flex items-center gap-1"><CheckCircleFilled className="text-sm"/> Đã xác thực</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tổng đơn hàng</span>
              <span>45 món</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-zinc-100">
              <span className="text-slate-400">Hạng thành viên</span>
              <span className="text-[#fa649a]">Thành viên Vàng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutfitsSection() {
  const outfits = [
    { title: "Cuối tuần thư giãn", color: "bg-[#fa649a]", items: "5/5", rating: 5 },
    { title: "Hè năng động", color: "bg-[#FBCFE8]", items: "5/5", rating: 5 },
    { title: "Đêm sôi động", color: "bg-[#1C2434]", items: "4/5", rating: 4 }
  ];
  return (
    <div className="text-left">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-extrabold">Outfit đã lưu ( 3 )</h2>
        <button className="text-[#fa649a] font-bold text-sm flex items-center gap-1 hover:underline">
          Xem tất cả <RightOutlined style={{ fontSize: '12px' }} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {outfits.map((o, i) => (
          <div key={i} className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden group">
            <div className={`${o.color} h-56 flex items-center justify-center transition-all group-hover:scale-105`}><span className="text-8xl">👗</span></div>
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-extrabold group-hover:text-[#fa649a] transition-colors">{o.title}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Số món: {o.items}</p>
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, idx) => (
                  <StarFilled key={idx} className={idx < o.rating ? "text-yellow-400" : "text-slate-200"} />
                ))}
              </div>
              <button className="w-full bg-[#fa649a] text-white py-3.5 rounded-2xl font-bold text-sm mt-4 hover:bg-[#fa649a]/90 active:scale-[0.98] transition-all shadow-lg">
                Phòng thử đồ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShopsSection() {
  const shops = [
    { name: "Studio Thời trang Pro", author: "Nguyễn Tuấn", rating: 4.8, reviews: 342, followers: 1234, desc: "Thời trang cao cấp với thiết kế đột phá" },
    { name: "Tủ quần áo Vintage", author: "Trần Huyền", rating: 4.6, reviews: 189, followers: 856, desc: "Bộ sưu tập thời trang vintage bền vững" }
  ];
  return (
    <div className="space-y-6 text-left">
      <h2 className="text-2xl font-extrabold mb-8">Cửa hàng yêu thích ( {shops.length} )</h2>
      {shops.map((shop, i) => (
        <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative group hover:border-[#fa649a]/30 transition-all">
          <HeartOutlined className="absolute top-6 right-6 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer text-xl" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-extrabold">{shop.name}</h3>
              <span className="bg-emerald-50 text-emerald-500 text-[10px] px-2 py-0.5 rounded-2xl font-bold border border-emerald-100 italic">
                <SafetyCertificateOutlined className="mr-1" /> Đã xác thực
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400">bởi {shop.author}</p>
            <p className="text-sm text-slate-500 font-medium max-w-xl">{shop.desc}</p>
            <div className="flex gap-8 pt-4 border-t border-zinc-100 mt-4">
              <div className="flex items-center gap-1.5 font-bold text-sm text-slate-600"><StarFilled className="text-yellow-400"/> {shop.rating} <span className="text-slate-300 font-medium">({shop.reviews})</span></div>
              <div className="text-sm font-bold text-slate-600"><span className="text-slate-300 font-medium uppercase text-[10px] mr-2">Người theo dõi</span> {shop.followers}</div>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 bg-[#fa649a] text-white px-8 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#fa649a]/90">Thăm cửa hàng <ExportOutlined /></button>
            <button className="flex-1 border border-zinc-200 text-slate-600 px-8 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 shadow-md transition-all"><MessageOutlined /> Liên hệ</button>
          </div>
        </div>
      ))}
    </div>
  );
}