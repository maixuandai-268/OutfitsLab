"use client";
import { RightOutlined } from "@ant-design/icons";
import React from "react";
interface PageHeaderProps {
    dark: boolean;
}

export default function PageHeader({ dark }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-1.5 mb-1.5 text-xs text-gray-400">
        <span>Home</span>
        <RightOutlined className="text-[10px]" />
        <span className="text-indigo-500 font-medium">Dashboard</span>
      </div>
      <h1 className={`text-xl font-bold ${dark ? "text-gray-50" : "text-gray-900"}`}>Dashboard Overview</h1>
      <p className="text-xs text-gray-400 mt-0.5">Welcome back, Admin! Here is what is happening with your store today. </p>
    </div>
  );
}