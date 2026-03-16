/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from 'react';
import { 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined, 
  UserAddOutlined,
  MessageOutlined, 
  CheckCircleFilled, 
  RightOutlined,
  StarFilled
} from '@ant-design/icons';

export default function PublicProfilePage() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans text-slate-900 text-left">
      {/* --- Header Profile (Cover & Avatar) --- */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-[#fef3c7] border-4 border-white shadow-md flex items-center justify-center text-6xl overflow-hidden shrink-0">
              <span role="img" aria-label="avatar">👩‍🦰</span>
            </div>

            {/* User Info Section */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-extrabold tracking-tight">Linh Trang</h1>
                  <p className="text-blue-600 font-bold text-sm mt-1">Fashion Enthusiast & Stylist</p>
                </div>
                
                {/* Interaction Buttons (Like Facebook) */}
                <div className="flex gap-3">
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition shadow-md shadow-blue-100">
                    <UserAddOutlined /> Add Friend
                  </button>
                  <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition">
                    <MessageOutlined /> Message
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-8 pt-6 border-t border-slate-50">
                <div className="text-left">
                  <p className="text-2xl font-black text-amber-600">45</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Outfits Created</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-black text-blue-600">1.2k</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Followers</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-black text-amber-600">2024</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Joined Since</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-6xl mx-auto px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: About & Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Intro & Contact
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="font-bold text-slate-700 flex items-center gap-2"><MailOutlined className="text-blue-500"/> linh.trang@example.com</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                    <p className="font-bold text-slate-700 flex items-center gap-2"><EnvironmentOutlined className="text-blue-500"/> Ho Chi Minh City, VN</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed italic">
                  "Fashion is not something that exists in dresses only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening."
                </div>
              </div>
            </div>

            {/* Featured Outfits Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black">Featured Outfits</h2>
                <button className="text-blue-600 font-bold text-xs flex items-center gap-1">See All <RightOutlined/></button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-3/4 bg-slate-100 rounded-xl flex items-center justify-center text-4xl border border-slate-200 hover:border-blue-300 transition cursor-pointer">
                    👗
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Account Verification & Friends */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-black mb-4 text-sm uppercase tracking-wider text-slate-400">Account Status</h3>
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2">
                  <CheckCircleFilled className="text-emerald-500 text-lg" />
                  <span className="font-bold text-emerald-700 text-sm">Verified Creator</span>
                </div>
                <StarFilled className="text-amber-400" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-black mb-4 text-sm uppercase tracking-wider text-slate-400 text-left">Quick Links</h3>
              <div className="space-y-2">
                {["View Wardrobe", "Style History", "Liked Collections"].map(item => (
                  <div key={item} className="flex justify-between items-center p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                    {item} <RightOutlined className="text-[10px] text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}