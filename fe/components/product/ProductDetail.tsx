'use client';
import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { FavoriteButton } from './FavoriteButton';

// 🛠️ Định nghĩa Review chuẩn (là một mảng các đối tượng)
interface Review {
  id: number;
  rating: number;
  comment: string;
}

interface Product {
  id: number;
  shop_id: number;
  name: string;
  image?: string;
  image_url?: string;
  price: number | string;
  salesCount?: number;
  description?: string;
  type: 'TOP' | 'BOTTOM' | 'SHOES' | 'HAT' | 'GLASSES' | 'ACCESSORY';
  rating?: number;
  reviews?: Review[]; // 🔥 Phải là mảng Review[]
  affiliateLink?: string;
  colors?: string[] | any[];
  sizes?: string[];
}

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  // 💰 Format tiền Việt Nam
  const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(Number(amount));
  };

  // ⭐ Xử lý logic Đánh giá (Rating) & Số lượng Review
  // Tránh lỗi render Object trực tiếp vào JSX
  const reviewData = Array.isArray(product.reviews) ? product.reviews : [];
  const reviewCount = reviewData.length;
  const averageRating = reviewCount > 0
    ? (reviewData.reduce((acc, rev) => acc + rev.rating, 0) / reviewCount).toFixed(1)
    : (product.rating ? Number(product.rating).toFixed(1) : "5.0");

  // 📏 Xử lý Size
  const sizes = product.sizes && product.sizes.length > 0 
    ? product.sizes 
    : ['90cm', '100cm', '110cm', '120cm', '130cm', '140cm'];
  
  // 🎨 Xử lý Màu sắc
  const displayColors = product.colors && product.colors.length > 0
    ? product.colors.map((c: any) => typeof c === 'string' ? { color: c } : c)
    : [{ color: '#000000' }, { color: '#FFFFFF' }, { color: '#FF69B4' }];

  const handleAffiliateClick = async () => {
    if (!product.affiliateLink) return;
    try {
      fetch(`http://localhost:3000/api/products/${product.id}/click-affiliate`, { 
        method: 'PATCH' 
      });
    } catch (e) {
      console.error("Lỗi track click:", e);
    }
    window.open(product.affiliateLink, '_blank');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Cột trái: Ảnh sản phẩm */}
      <div className="w-full md:w-1/2 px-4">
        <img 
          src={product.image || product.image_url || 'https://via.placeholder.com/500'} 
          alt={product.name} 
          className="rounded-lg w-full h-[500px] object-cover shadow-2xl" 
        />
        <p className="font-semibold mt-6 uppercase text-xs text-gray-400 tracking-widest">Gợi ý phối đồ</p>
        <div className="mt-4">
          <ProductCard />
        </div>
      </div>

      {/* Cột phải: Thông tin sản phẩm */}
      <div className="w-full md:w-1/2 px-4">
        <p className="text-base mb-1 text-gray-500 uppercase tracking-wider">{product.type}</p>
        <h1 className="text-3xl font-bold mb-5 text-gray-900 leading-tight">{product.name}</h1>
        
        <div className="flex items-center gap-4 mb-5 text-gray-600">
          <p className="text-base">{product.salesCount || 0} Đã bán</p>
          <div className="flex items-center gap-1 border-l pl-4 border-gray-200">
            <StarIcon className="text-yellow-500 w-5 h-5" filled={true} />
            <p className="text-sm font-medium">
              {averageRating} 
              <span className="text-gray-400 font-normal ml-1">
                ({reviewCount} Đánh giá)
              </span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-6 bg-gray-50 p-4 rounded-lg">
          <p className="text-4xl font-black text-pink-600">
            {product.price ? formatCurrency(product.price) : 'Liên hệ'}
          </p>
        </div>

        <div className="bg-gray-200 mx-auto mb-6 h-px w-full"></div>
        
        <p className="font-semibold mb-3">Màu sắc</p>
        <div className="flex flex-wrap gap-3 mb-6">
          {displayColors.map((item: any, index: number) => (
            <button
              key={index}
              type="button"
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                selectedColor === item.color ? 'border-pink-500 scale-110 shadow-md' : 'border-gray-300'
              }`}
              style={{ backgroundColor: item.color }}
              onClick={() => setSelectedColor(item.color)}
            >
              {selectedColor === item.color && (
                <svg className={`w-6 h-6 ${['#FFFFFF', '#FFFF00', 'white', 'yellow'].includes(item.color.toUpperCase()) ? 'text-black' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold">Kích cỡ</p>
          <p className="underline cursor-pointer text-sm text-gray-400 hover:text-black">Xem bảng size</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-8">
          {sizes.map(size => (
            <button
              key={size}
              type="button"
              className={`h-12 rounded-lg font-bold transition-all border-2 ${
                selectedSize === size ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-gray-600 border-gray-100 hover:border-black'
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button className="flex-[2] py-4 bg-pink-500 text-white font-bold rounded-full flex items-center justify-center hover:bg-pink-600 transition-all shadow-lg uppercase tracking-wide">
            <MagicWand className="w-5 h-5 mr-2" />
            Thử đồ ngay!
          </button>
          <div className="flex-1">
            <FavoriteButton
              targetId={product.id}
              className="w-full h-full border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-rose-50 transition-colors"
            />
          </div>
        </div>

        {product.affiliateLink && (
          <div className="mt-4">
            <button
              onClick={handleAffiliateClick}
              className="w-full py-4 bg-[#ee4d2d] text-white font-black rounded-2xl shadow-xl hover:bg-[#d73211] transition-all uppercase tracking-widest"
            >
              MUA HÀNG TẠI SHOPEE
            </button>
            <p className="text-[10px] text-gray-400 mt-2 text-center italic font-medium">
              * Nhấn để chuyển hướng đến trang mua hàng chính thức
            </p>
          </div>
        )}

        <div className="mt-10 border-t pt-6">
          <p className="font-semibold mb-3 uppercase text-gray-800 text-sm italic">Mô tả sản phẩm:</p>
          <p className='text-gray-600 leading-relaxed whitespace-pre-line text-sm text-justify'>
            {product.description || "Chưa có mô tả cho sản phẩm này."}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components (Icons) ---

function MagicWand({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className={className}>
      <path d="M295.4 37L310.2 73.8L347 88.6C350 89.8 352 92.8 352 96C352 99.2 350 102.2 347 103.4L310.2 118.2L295.4 155C294.2 158 291.2 160 288 160C284.8 160 281.8 158 280.6 155L265.8 118.2L229 103.4C226 102.2 224 99.2 224 96C224 92.8 226 89.8 229 88.6L265.8 73.8L280.6 37C281.8 34 284.8 32 288 32C291.2 32 294.2 34 295.4 37zM142.7 105.7L164.2 155.8L214.3 177.3C220.2 179.8 224 185.6 224 192C224 198.4 220.2 204.2 214.3 206.7L164.2 228.2L142.7 278.3C140.2 284.2 134.4 288 128 288C121.6 288 115.8 284.2 113.3 278.3L91.8 228.2L41.7 206.7C35.8 204.2 32 198.4 32 192C32 185.6 35.8 179.8 41.7 177.3L91.8 155.8L113.3 105.7C115.8 99.8 121.6 96 128 96C134.4 96 140.2 99.8 142.7 105.7zM496 368C502.4 368 508.2 371.8 510.7 377.7L532.2 427.8L582.3 449.3C588.2 451.8 592 457.6 592 464C592 470.4 588.2 476.2 582.3 478.7L532.2 500.2L510.7 550.3C508.2 556.2 502.4 560 496 560C489.6 560 483.8 556.2 481.3 550.3L459.8 500.2L409.7 478.7C403.8 476.2 400 470.4 400 464C400 457.6 403.8 451.8 409.7 449.3L459.8 427.8L481.3 377.7C483.8 371.8 489.6 368 496 368zM492 64C503 64 513.6 68.4 521.5 76.2L563.8 118.5C571.6 126.4 576 137 576 148C576 159 571.6 169.6 563.8 177.5L475.6 265.7L374.3 164.4L462.5 76.2C470.4 68.4 481 64 492 64zM76.2 462.5L340.4 198.3L441.7 299.6L177.5 563.8C169.6 571.6 159 576 148 576C137 576 126.4 571.6 118.5 563.8L76.2 521.5C68.4 513.6 64 503 64 492C64 481 68.4 470.4 76.2 462.5z" />
    </svg>
  );
}

export function StarIcon({ className, filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
} 