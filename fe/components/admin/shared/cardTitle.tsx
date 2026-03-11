"use client";
import React from "react";
interface CardTitleProps {
    dark?: boolean;
    title: string;
    sub?: string;
}
export default function CardTitle({ dark, title, sub }: CardTitleProps) {
  return (
    <div className="mb-4">
      <h3 className={`text-sm font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>{title}</h3>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}