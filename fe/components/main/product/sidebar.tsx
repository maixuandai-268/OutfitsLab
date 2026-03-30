"use client";

import React, { useMemo, useCallback } from "react";
import { FilterSection } from "./filter";
import { SearchOutlined, DollarOutlined } from "@ant-design/icons";

export interface Filters {
  categories: string[];
  colors: string[];
  /** Lưu 1 khoảng "min-max", ví dụ ["0-100"] | ["-50"] | ["100-"] | ["-"] */
  priceRanges: string[];
}

interface SidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
}) => {
  // ---- dữ liệu tĩnh ----
  const categories = useMemo(
    () => [
      { value: "all", label: "All Categories" },
      { value: "shirts", label: "Shirts" },
      { value: "pants", label: "Pants" },
      { value: "dresses", label: "Dresses" },
      { value: "hoodies", label: "Hoodies" },
      { value: "blazers", label: "Blazers" },
      { value: "jackets", label: "Jackets" },
      { value: "sneakers", label: "Sneakers" },
    ],
    []
  );

  const colors = useMemo(
    () => [
      { value: "all", label: "All Colors" },
      { value: "black", label: "Black" },
      { value: "white", label: "White" },
      { value: "gray", label: "Gray" },
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "pink", label: "Pink" },
      { value: "mustard", label: "Mustard" },
      { value: "cream", label: "Cream" },
      { value: "green", label: "Green" },
    ],
    []
  );

  // ---- toggle multi-select ----
  const toggleMulti = useCallback(
    (key: keyof Filters, value: string) => {
      setFilters((prev) => {
        const current = prev[key] ?? [];
        if (value === "all") return { ...prev, [key]: ["all"] };
        const withoutAll = current.filter((v) => v !== "all");
        const exists = withoutAll.includes(value);
        const next = exists
          ? withoutAll.filter((v) => v !== value)
          : [...withoutAll, value];
        return { ...prev, [key]: next.length ? next : ["all"] };
      });
    },
    [setFilters]
  );

  // ---- price min/max đọc trực tiếp từ filters ----
  const { minVal, maxVal } = useMemo(() => {
    const raw = filters.priceRanges?.[0] || "";
    const [m, x] = raw.split("-");
    return { minVal: m ?? "", maxVal: x ?? "" };
  }, [filters.priceRanges]);

  const updatePrice = useCallback(
    (m: string, x: string) => {
      // Loại bỏ dấu chấm trước khi lưu vào filter state
      const rawM = m.replace(/\./g, "");
      const rawX = x.replace(/\./g, "");
      const normalized = `${rawM || ""}-${rawX || ""}`;
      setFilters((prev) => ({ ...prev, priceRanges: [normalized] }));
    },
    [setFilters]
  );

  // Helper định dạng tiền có dấu chấm
  const formatVND = (val: string) => {
    if (!val) return "";
    const num = val.replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const resetFilters = useCallback(() => {
    setFilters({ categories: ["all"], colors: ["all"], priceRanges: ["-"] });
    setSearchQuery("");
  }, [setFilters, setSearchQuery]);

  return (
    <aside className="w-64 bg-transparent h-full overflow-y-auto">
      <div className="m-3 rounded-[24px] border border-[#F2C58B] shadow-[0_8px_24px_rgba(16,24,40,0.04)] bg-white p-4">
        <h2 className="text-[13px] font-semibold text-gray-800 mb-3">Filters</h2>

        {/* Search */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Search
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchOutlined />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#F6DDB8] bg-white pl-9 pr-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F2C58B] focus:border-[#F2C58B]"
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Category */}
        <FilterSection
          title="Category"
          options={categories}
          selectedOptions={filters.categories}
          onToggle={(v) => toggleMulti("categories", v)}
          variant="chip-list"   // <-- dòng 132 đã hợp lệ
          icon="category"       // <-- dòng 132 đã hợp lệ
        />

        {/* Color */}
        <FilterSection
          title="Color"
          options={colors}
          selectedOptions={filters.colors}
          onToggle={(v) => toggleMulti("colors", v)}
          variant="chip-list"   // <-- dòng 142 đã hợp lệ
          icon="color"          // <-- dòng 142 đã hợp lệ
        />

        {/* Price Range */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <DollarOutlined className="text-[#C4872E]" />
              <h3 className="text-xs font-medium text-gray-600">Price Range</h3>
            </div>
          </div>

          <div className="space-y-3">
            {/* Min */}
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Min</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#C4872E]">
                  <DollarOutlined />
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatVND(minVal)}
                  onChange={(e) => updatePrice(e.target.value, maxVal)}
                  className="w-full rounded-full border border-[#F6DDB8] bg-white pl-9 pr-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F2C58B] focus:border-[#F2C58B]"
                  placeholder="0"
                  aria-label="Minimum price"
                />
              </div>
            </div>

            {/* Max */}
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Max</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#C4872E]">
                  <DollarOutlined />
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatVND(maxVal)}
                  onChange={(e) => updatePrice(minVal, e.target.value)}
                  className="w-full rounded-full border border-[#F6DDB8] bg-white pl-9 pr-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F2C58B] focus:border-[#F2C58B]"
                  placeholder="100.000"
                  aria-label="Maximum price"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="w-full py-2 rounded-full border border-[#E8B56C] text-[#C4872E] text-sm font-medium hover:bg-[#FFF6EA] transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
};