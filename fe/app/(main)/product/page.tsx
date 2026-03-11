"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/main/product/sildebar';
import { ProductCard } from '@/components/main/product/product_all';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  tag?: string;
  category: string;
  color: string;
}

export default function ShopPage() {
  const [filters, setFilters] = useState({
    categories: ['all'],
    colors: ['all'],
    priceRanges: ['all']
  });
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts: Product[] = [
    { id: 1, name: 'Oversized Grey T-Shirt', brand: 'by Urban Apparel', price: 54.95, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', tag: 'Sale', category: 'tshirt', color: 'gray' },
    { id: 2, name: 'Classic Blue Denim', brand: 'by Denim World', price: 79.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop', tag: 'New', category: 'pants', color: 'blue' },
    { id: 3, name: 'Vintage Museum Hoodie', brand: 'by Retro Wear', price: 85.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop', tag: 'Trending', category: 'hoodie', color: 'cream' },
    { id: 4, name: 'Black Leather Jacket', brand: 'by Style Co.', price: 129.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', tag: 'New', category: 'jackets', color: 'black' },
    { id: 5, name: 'Summer Floral Dress', brand: 'by Bella Fashion', price: 68.50, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop', tag: 'Sale', category: 'dresses', color: 'red' },
    { id: 6, name: 'White Sneakers', brand: 'by Street Kicks', price: 89.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop', tag: 'Trending', category: 'sneakers', color: 'white' },
    { id: 7, name: 'Casual Khaki Pants', brand: 'by Comfort Wear', price: 45.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop', category: 'pants', color: 'mustard' },
    { id: 8, name: 'Striped Cotton Shirt', brand: 'by Classic Style', price: 39.95, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop', tag: 'Sale', category: 'icons', color: 'blue' },
    { id: 9, name: 'Navy Blue Blazer', brand: 'by Executive Look', price: 149.99, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop', category: 'blazers', color: 'blue' }
  ];

  const filteredProducts = allProducts.filter(product => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (!product.name.toLowerCase().includes(searchLower) && !product.brand.toLowerCase().includes(searchLower)) return false;
    }
    if (!filters.categories.includes('all') && !filters.categories.includes(product.category)) return false;
    if (!filters.colors.includes('all') && !filters.colors.includes(product.color)) return false;
    if (!filters.priceRanges.includes('all')) {
      let matchesPrice = false;
      for (const range of filters.priceRanges) {
        if (range === '0-50' && product.price <= 50) matchesPrice = true;
        else if (range === '50-100' && product.price > 50 && product.price <= 100) matchesPrice = true;
        else if (range === '100+' && product.price > 100) matchesPrice = true;
      }
      if (!matchesPrice) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-12 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-5%] w-125 h-125 bg-blue-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-5%] right-[-5%] w-125 h-125 bg-pink-100/50 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar Area */}
          <aside className="w-full md:w-72 shrink-0">
            <div className="md:sticky md:top-12 bg-white/70 backdrop-blur-2xl p-7 rounded-[2.5rem] border border-white shadow-2xl shadow-blue-900/5">
              <Sidebar 
                filters={filters} 
                setFilters={setFilters} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
              />
            </div>
          </aside>
          
          {/* Products Grid Area */}
          <main className="flex-1 bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-10 border border-white/60 shadow-2xl shadow-gray-200/40">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h3>
                <button
                  onClick={() => { setFilters({ categories: ['all'], colors: ['all'], priceRanges: ['all'] }); setSearchQuery(''); }}
                  className="px-8 py-3 border border-orange-400 text-orange-400 rounded-2xl font-bold hover:bg-orange-50 transition-all"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}