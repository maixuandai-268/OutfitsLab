"use client";
import { SearchOutlined, MoonOutlined, SunOutlined, BellOutlined, MenuOutlined } from "@ant-design/icons";
import React from "react";

interface TopbarProps {
    dark: boolean;
    setDark: (dark: boolean) => void;
    onMenuToggle: () => void;
}

export default function Topbar({ dark, setDark, onMenuToggle }: TopbarProps) {
  return (
    <header className={`flex items-center gap-4 px-6 h-16 flex-shrink-0 border-b ${
      dark ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"
    }`}>
      <button
        onClick={onMenuToggle}
        title="Toggle menu"
        aria-label="Toggle menu"
        className={`p-1.5 rounded-lg transition-colors ${
          dark ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        }`}
      >
        <MenuOutlined className="text-lg" />
      </button>

      <div className="relative flex-1 max-w-sm">
        <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          placeholder="Search..."
          className={`w-full pl-9 pr-4 py-2 rounded-xl text-[13px] outline-none border transition-colors ${
            dark
              ? "bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-indigo-500"
              : "bg-slate-50 border-slate-200 text-gray-700 placeholder-slate-400 focus:border-indigo-400"
          }`}
        />
      </div>

      <div className="flex-1" />

      <button
        onClick={() => setDark(!dark)}
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
          dark ? "bg-gray-900 border-gray-700 text-yellow-400 hover:border-yellow-500" : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
        }`}
      >
        {dark ? <SunOutlined /> : <MoonOutlined />}
      </button>

      <button 
        title="Notifications"
        aria-label="Notifications"
        className={`relative w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
          dark ? "bg-gray-900 border-gray-700 text-gray-400 hover:text-gray-200" : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700"
        }`}>
        <BellOutlined />
        <span className={`absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 ${dark ? "border-gray-800" : "border-white"}`} />
      </button>
    </header>
  );
}