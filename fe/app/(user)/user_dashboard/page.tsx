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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-admin-bg pb-20 font-sans text-left text-admin-black">
      {/* --- HEADER PROFILE --- */}
      <div className="bg-white border-b border-stroke shadow-sm">
        <div className="max-w-6xl mx-auto px-8 pt-12 pb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-full bg-[#C6943E] border-[6px] border-white shadow-lg flex items-center justify-center text-6xl">
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
                    <p className="flex items-center gap-2 text-slate-500 text-sm font-medium"><EnvironmentOutlined className="text-xs"/> Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
                <button className="bg-admin-blue text-white px-5 py-2.5 rounded-md flex items-center gap-2 font-bold text-sm hover:opacity-90 transition shadow-sm self-start md:self-center">
                  <EditOutlined /> Edit Profile
                </button>
              </div>

              <p className="text-slate-500 text-sm mt-4 leading-relaxed max-w-2xl font-medium">
                Fashion enthusiast and outfit creator | Loves mixing vintage with modern styles
              </p>

              <div className="flex flex-wrap gap-10 mt-8 pt-6 border-t border-slate-100">
                <div className="text-left"><p className="text-2xl font-extrabold text-[#C6943E]">45</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Orders</p></div>
                <div className="text-left"><p className="text-2xl font-extrabold text-admin-blue">3</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Outfits</p></div>
                <div className="text-left"><p className="text-2xl font-extrabold text-[#C6943E]">3</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Liked Shops</p></div>
                <div className="text-left"><p className="text-2xl font-extrabold text-admin-blue">2024</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Member Since</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- THANH TABS --- */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex gap-10 border-b border-slate-200 bg-transparent px-2">
          {[
            { id: 'about', name: '📊 About' },
            { id: 'saved-outfits', name: '✨ Saved Outfits' },
            { id: 'liked-shops', name: '🛍️ Liked Shops' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold transition-all border-b-4 ${
                activeTab === tab.id ? "border-admin-blue text-admin-blue" : "border-transparent text-slate-400 hover:text-slate-500"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {activeTab === 'about' && <AboutSection />}
          {activeTab === 'saved-outfits' && <OutfitsSection />}
          {activeTab === 'liked-shops' && <ShopsSection />}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  const [userInfo, setUserInfo] = useState({
    fullName: "Linh Trang",
    email: "linh.trang@example.com",
    phone: "+84 123 456 789",
    location: "Ho Chi Minh City, Vietnam"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl border border-stroke p-8 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight">Account Settings</h2>
            <button onClick={() => alert('Saved!')} className="bg-admin-blue text-white px-6 py-2 rounded-md font-bold text-sm hover:opacity-90 transition">
              Save Changes
            </button>
          </div>
          
          <div className="flex flex-col gap-6 max-w-2xl">
            {[
              { label: "Full Name", name: "fullName", value: userInfo.fullName },
              { label: "Email Address", name: "email", value: userInfo.email, type: "email" },
              { label: "Phone Number", name: "phone", value: userInfo.phone },
              { label: "Location", name: "location", value: userInfo.location }
            ].map((input) => (
              <div key={input.name} className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em]">{input.label}</label>
                <input 
                  type={input.type || "text"}
                  name={input.name}
                  value={input.value}
                  onChange={handleChange}
                  placeholder={input.label}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 text-sm focus:outline-none focus:border-admin-blue focus:bg-white transition-all shadow-inner"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FFF1F2] border border-rose-100 p-8 rounded-xl flex justify-between items-center">
          <div>
            <h4 className="text-rose-600 font-extrabold text-base">Danger Zone</h4>
            <p className="text-rose-400 text-xs font-medium">Once you delete your account, there is no going back.</p>
          </div>
          <button className="bg-rose-600 text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-rose-700 transition">
            <DeleteOutlined /> Delete Account
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-stroke p-6 shadow-sm">
          <h3 className="font-extrabold mb-6 border-b pb-4">Quick Actions</h3>
          <div className="space-y-3">
            {["My Saved Outfits", "Try-On Room", "Order History", "Change Password"].map(item => (
              <div key={item} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer transition group">
                {item} <RightOutlined className="text-slate-300 group-hover:text-admin-blue" style={{ fontSize: '12px' }} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stroke p-6 shadow-sm">
          <h3 className="font-extrabold mb-4 border-b pb-4">Account Info</h3>
          <div className="space-y-4 text-sm font-bold">
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <span className="text-admin-green flex items-center gap-1"><CheckCircleFilled className="text-sm"/> Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Orders</span>
              <span>45 Items</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-50">
              <span className="text-slate-400">Rank</span>
              <span className="text-[#C6943E]">Gold Member</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutfitsSection() {
  const outfits = [
    { title: "Casual Weekend", color: "bg-[#C6943E]", items: "5/5", rating: 5 },
    { title: "Summer Vibes", color: "bg-[#FBCFE8]", items: "5/5", rating: 5 },
    { title: "Night Out", color: "bg-[#1C2434]", items: "4/5", rating: 4 }
  ];
  return (
    <div className="text-left">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-extrabold">Saved Outfits ( 3 )</h2>
        <button className="text-admin-blue font-bold text-sm flex items-center gap-1 hover:underline">
          View All <RightOutlined style={{ fontSize: '12px' }} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {outfits.map((o, i) => (
          <div key={i} className="bg-white rounded-xl border border-stroke shadow-sm overflow-hidden group">
            <div className={`${o.color} h-56 flex items-center justify-center transition-all group-hover:scale-105`}><span className="text-8xl">👗</span></div>
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-extrabold group-hover:text-admin-blue transition-colors">{o.title}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Items: {o.items}</p>
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, idx) => (
                  <StarFilled key={idx} className={idx < o.rating ? "text-yellow-400" : "text-slate-200"} />
                ))}
              </div>
              <button className="w-full bg-admin-blue text-white py-3.5 rounded-lg font-bold text-sm mt-4 hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-blue-100">
                Try On Room
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
    { name: "Fashion Studio Pro", author: "Nguyễn Tuấn", rating: 4.8, reviews: 342, followers: 1234, desc: "Premium fashion with cutting-edge designs" },
    { name: "Vintage Closet", author: "Trần Huyền", rating: 4.6, reviews: 189, followers: 856, desc: "Sustainable and vintage fashion pieces" }
  ];
  return (
    <div className="space-y-6 text-left">
      <h2 className="text-2xl font-extrabold mb-8">Liked Shops ( {shops.length} )</h2>
      {shops.map((shop, i) => (
        <div key={i} className="bg-white p-8 rounded-xl border border-stroke shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative group hover:border-admin-blue/30 transition-all">
          <HeartOutlined className="absolute top-6 right-6 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer text-xl" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-extrabold">{shop.name}</h3>
              <span className="bg-emerald-50 text-admin-green text-[10px] px-2 py-0.5 rounded font-bold border border-emerald-100 italic">
                <SafetyCertificateOutlined className="mr-1" /> Verified
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400">by {shop.author}</p>
            <p className="text-sm text-slate-500 font-medium max-w-xl">{shop.desc}</p>
            <div className="flex gap-8 pt-4 border-t border-slate-50 mt-4">
              <div className="flex items-center gap-1.5 font-bold text-sm text-slate-600"><StarFilled className="text-yellow-400"/> {shop.rating} <span className="text-slate-300 font-medium">({shop.reviews})</span></div>
              <div className="text-sm font-bold text-slate-600"><span className="text-slate-300 font-medium uppercase text-[10px] mr-2">Followers</span> {shop.followers}</div>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 bg-admin-blue text-white px-8 py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:opacity-90">Visit Shop <ExportOutlined /></button>
            <button className="flex-1 border border-stroke text-slate-600 px-8 py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 shadow-sm transition-all"><MessageOutlined /> Contact</button>
          </div>
        </div>
      ))}
    </div>
  );
}