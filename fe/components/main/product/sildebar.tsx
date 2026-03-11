"use client";

import React from 'react';
import { FilterSection } from './filter';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

interface Filters {
  categories: string[];
  colors: string[];
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
  setSearchQuery
}) => {
  const categories = [
    { value: 'all', label: 'All Category' },
    { value: 'icons', label: 'Icons' }, { value: 'tshirt', label: 'T-shirt' },
    { value: 'pants', label: 'Pants' }, { value: 'jackets', label: 'Jackets' },
    { value: 'dresses', label: 'Dresses' }, { value: 'hoodie', label: 'Hoodie' },
    { value: 'sneakers', label: 'Sneakers' }
  ];

  const colors = [
    { value: 'all', label: 'All Colors' }, { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' }, { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' }, { value: 'cream', label: 'Cream' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All' },
    { value: '0-50', label: '$0 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100+', label: '$100+' }
  ];

  const handleToggle = (filterType: keyof Filters, value: string) => {
    setFilters(prev => {
      if (filterType === 'priceRanges') {
        if (prev.priceRanges.includes(value)) {
          return { ...prev, priceRanges: ['all'] };
        }
        return { ...prev, priceRanges: [value] };
      }

      const currentValues = prev[filterType];
      const isSelected = currentValues.includes(value);
      
      return {
        ...prev,
        [filterType]: isSelected
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    });
  };

  const resetFilters = () => {
    setFilters({ categories: ['all'], colors: ['all'], priceRanges: ['all'] });
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative group">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all shadow-inner placeholder:text-gray-400"
          />
          <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-pink-500 transition-colors" />
        </div>
      </div>

      <div className="px-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-3">Sắp xếp</p>
        <div className="text-sm text-gray-500 font-bold">
          Sort by: 
          <span className="ml-2 text-gray-900 cursor-pointer underline underline-offset-12px decoration-pink-300 decoration-[3px] hover:decoration-[#ff0080] transition-all">
            Mới nhất
          </span>
        </div>
      </div>

      <div className="h-px bg-gray-100/60 w-full" />

      <div className="space-y-6">
        <FilterSection 
          title="Category" 
          options={categories} 
          selectedOptions={filters.categories} 
          onToggle={(v) => handleToggle('categories', v)} 
        />
        <FilterSection 
          title="Color" 
          options={colors} 
          selectedOptions={filters.colors} 
          onToggle={(v) => handleToggle('colors', v)} 
        />
        <FilterSection 
          title="Price Range" 
          options={priceRanges} 
          selectedOptions={filters.priceRanges} 
          onToggle={(v) => handleToggle('priceRanges', v)} 
          type="radio" 
        />
      </div>

      <button
        onClick={resetFilters}
        className="w-full mt-2 py-3 border border-pink-400 text-pink-400 rounded-2xl hover:bg-pink-100 transition-all text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2"
      >
        <ReloadOutlined />
        Reset Filters
      </button>
    </div>
  );
};