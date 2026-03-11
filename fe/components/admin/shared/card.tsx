"use client";
import React from "react";

interface CardProps {   
    dark?: boolean;
    className?: string;
    children: React.ReactNode;
}
export default function Card({ dark, children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        dark ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"
      } ${className}`}
    >
      {children}
    </div>
  );
}