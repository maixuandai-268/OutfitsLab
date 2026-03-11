"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Tooltip } from 'antd';
import { 
  HeartOutlined, 
  HeartFilled, 
  ShoppingCartOutlined, 
  ShopOutlined 
} from '@ant-design/icons';

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

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="relative">
        {product.tag && (
          <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium z-10 shadow-sm">
            {product.tag}
          </span>
        )}
        
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-100 z-10 shadow-sm flex items-center justify-center transition-all"
        >
          {isFavorite ? (
            <HeartFilled style={{ color: '#ff4d4f', fontSize: '16px' }} />
          ) : (
            <HeartOutlined style={{ color: '#4b5563', fontSize: '16px' }} />
          )}
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
        <p className="text-lg font-bold text-gray-900 mb-3">${product.price}</p>
        
        <div className="flex items-center gap-2">
          <Link href="/try-on" className="flex-2">
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-3 rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap">
              <ShoppingCartOutlined style={{ fontSize: '16px' }} />
              Thử đồ ngay
            </button>
          </Link>

          <Tooltip title="Đến cửa hàng">
            <Link href="/shop">
              <Button 
                shape="circle" 
                size="large"
                className="flex items-center justify-center border-gray-300 text-gray-600 hover:text-brand-gold hover:border-brand-gold"
                icon={<ShopOutlined />}
              />
            </Link>
          </Tooltip>

          <Tooltip title={isFavorite ? "Bỏ thích" : "Yêu thích"}>
            <Button 
              shape="circle" 
              size="large"
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center justify-center border-gray-300 hover:border-gray-400"
              icon={
                isFavorite ? (
                  <HeartFilled style={{ color: '#ff4d4f' }} />
                ) : (
                  <HeartOutlined className="text-gray-600" />
                )
              }
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};