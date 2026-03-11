"use client";

import React, { useState } from "react";
import {
  AppstoreOutlined,
  BgColorsOutlined,
  PlusOutlined,
  MinusOutlined,
  CheckOutlined,
} from "@ant-design/icons";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onToggle: (value: string) => void;
  variant?: "chip-list" | "checkbox" | "radio";
  icon?: "category" | "color";
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  selectedOptions,
  onToggle,
  variant = "chip-list",
  icon,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const HeaderIcon =
    icon === "category" ? (
      <AppstoreOutlined className="text-[#C4872E]" />
    ) : icon === "color" ? (
      <BgColorsOutlined className="text-[#C4872E]" />
    ) : null;

  if (variant === "chip-list") {
    return (
      <section className="mb-2">
        <button
          type="button"
          onClick={() => setIsExpanded((s) => !s)}
          className="w-full flex justify-between items-center mb-2"
          aria-controls={`section-${title}`}
        >
          <div className="flex items-center gap-2">
            {HeaderIcon}
            <span className="text-xs font-medium text-gray-600">{title}</span>
          </div>
          <span className="text-gray-500">
            {isExpanded ? <MinusOutlined /> : <PlusOutlined />}
          </span>
        </button>

        {isExpanded && (
          <ul id={`section-${title}`} className="space-y-1">
            {options.map((option) => {
              const active = selectedOptions.includes(option.value);
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => onToggle(option.value)}
                    className={[
                      "w-full flex items-center gap-2 text-left text-sm px-3 py-2 rounded-full transition-colors",
                      active
                        ? "bg-[#FDF0DE] text-[#A36A1F] font-medium"
                        : "text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <span className={active ? "opacity-100" : "opacity-0"}>
                      <CheckOutlined className="text-[#A36A1F] text-[12px]" />
                    </span>
                    <span>{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    );
  }

  // ---- Fallback: checkbox / radio (nếu muốn dùng kiểu cũ) ----
  const inputType = variant === "radio" ? "radio" : "checkbox";

  return (
    <section className="mb-4">
      <button
        type="button"
        onClick={() => setIsExpanded((s) => !s)}
        className="w-full flex justify-between items-center mb-2 font-medium text-gray-800"
        aria-controls={`section-${title}`}
      >
        <div className="flex items-center gap-2">
          {HeaderIcon}
          <span>{title}</span>
        </div>
        <span>{isExpanded ? <MinusOutlined /> : <PlusOutlined />}</span>
      </button>

      {isExpanded && (
        <div id={`section-${title}`} className="space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <input
                type={inputType}
                checked={selectedOptions.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </section>
  );
};