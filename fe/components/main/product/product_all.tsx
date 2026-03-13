"use client";
import React, { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { Sidebar } from "./sidebar";
import {
  HeartOutlined,
  HeartFilled,
  StarFilled,
  ScissorOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  MoreOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";

export interface Filters {
  categories: string[];
  colors: string[];
  priceRanges: string[];
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image?: string;
  tag?: string;
  category: string;
  color: string;
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: Product;
  onTryOn?: (p: Product) => void;
  onToggleFavorite?: (p: Product, fav: boolean) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onTryOn,
  onToggleFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const priceText = useMemo(() => `${Number(product.price || 0).toLocaleString()} USD`, [product.price]);
  const roundedRating = useMemo(
    () => Math.max(0, Math.min(5, Math.round(product.rating ?? 0))),
    [product.rating]
  );

  const handleFav = () => {
    const next = !isFavorite;
    setIsFavorite(next);
    onToggleFavorite?.(product, next);
  };

  return (
    <div className="group rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-64 bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400 font-light">Không có ảnh</div>
        )}

        {(product.tag || product.category) && (
          <span className="absolute top-3 left-3 select-none rounded-full bg-[#FDF0DE] text-[#A36A1F] px-3 py-1 text-xs font-bold shadow-sm z-10 uppercase tracking-wider">
            {product.tag || product.category}
          </span>
        )}

        <button
          onClick={handleFav}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur border border-gray-100 grid place-items-center hover:bg-white z-10 transition-all shadow-sm"
        >
          {isFavorite ? (
            <HeartFilled className="text-red-500 scale-110" />
          ) : (
            <HeartOutlined className="text-gray-700 hover:text-red-500" />
          )}
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-pink-600 transition-colors">{product.name}</h3>
        
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarFilled key={i} className={i < roundedRating ? "text-amber-400" : "text-gray-200"} />
            ))}
          </div>
          {typeof product.reviews === "number" && (
            <span className="ml-1">({product.reviews.toLocaleString()} đánh giá)</span>
          )}
        </div>

        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-medium">
          {product.brand?.toLowerCase().startsWith("by ") ? product.brand : `Thương hiệu: ${product.brand}`}
        </p>

        <div className="mt-2 text-lg font-black text-[#F59E0B]">{priceText}</div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => onTryOn?.(product)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-pink-500 px-4 py-2.5 text-white text-xs font-bold shadow-lg shadow-pink-200 transition-all hover:bg-pink-600 active:scale-95"
          >
            <ScissorOutlined />
            THỬ ĐỒ NGAY
          </button>

          <Tooltip title="Xem cửa hàng">
            <Link href="/shop">
              <Button 
                shape="circle" 
                size="large"
                className="flex items-center justify-center border-gray-200 text-gray-500 hover:text-pink-500 hover:border-pink-500"
                icon={<ShopOutlined />}
              />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

type PaginationProps = {
  current: number;
  totalPages: number;
  onChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  current,
  totalPages,
  onChange,
  pageSize,
  onPageSizeChange,
}) => {
  const getVisiblePages = () => {
    const max = 5;
    if (totalPages <= max) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | string)[] = [];
    const left = Math.max(1, current - 1);
    const right = Math.min(totalPages, current + 1);
    pages.push(1);
    if (left > 2) pages.push("…");
    for (let p = left; p <= right; p++) {
      if (p !== 1 && p !== totalPages) pages.push(p);
    }
    if (right < totalPages - 1) pages.push("…");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-8">
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <span className="font-medium">Hiển thị mỗi trang:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 focus:ring-2 focus:ring-pink-200 outline-none cursor-pointer"
        >
          <option value={12}>12 sản phẩm</option>
          <option value={24}>24 sản phẩm</option>
          <option value={48}>48 sản phẩm</option>
        </select>
      </div>

      <nav className="flex items-center gap-1">
        <button 
          onClick={() => onChange(1)} 
          disabled={current <= 1} 
          className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <DoubleLeftOutlined />
        </button>
        {pages.map((p, idx) => (
          <button
            key={idx}
            onClick={() => typeof p === 'number' && onChange(p)}
            className={`h-10 min-w-10 rounded-lg border text-sm font-bold transition-all ${
              p === current 
                ? "bg-pink-500 border-pink-500 text-white shadow-md shadow-pink-100" 
                : "border-gray-200 hover:border-pink-500 text-gray-600 hover:text-pink-500 bg-white"
            }`}
          >
            {p === "…" ? <MoreOutlined /> : p}
          </button>
        ))}
        <button 
          onClick={() => onChange(totalPages)} 
          disabled={current >= totalPages} 
          className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-colors"
        >
          <DoubleRightOutlined />
        </button>
      </nav>
    </div>
  );
};

export default function ProductAll() {
  const [filters, setFilters] = useState<Filters>({
    categories: ["all"],
    colors: ["all"],
    priceRanges: ["-"],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const resetToFirstPage = useCallback(() => setCurrentPage(1), []);

  const setFiltersAndReset = (updater: React.SetStateAction<Filters>) => {
    setFilters(updater);
    resetToFirstPage();
  };

  const setSearchAndReset = (updater: React.SetStateAction<string>) => {
    setSearchQuery(updater);
    resetToFirstPage();
  };

  const allProducts = useMemo<Product[]>(() => [
    { id: 101, name: "Áo thun Xám Oversized", brand: "Urban Apparel", price: 54.95, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", tag: "Giảm giá", category: "tshirt", color: "gray", rating: 4.2, reviews: 124 },
    { id: 102, name: "Quần Denim Xanh Cổ điển", brand: "Denim World", price: 79.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", tag: "Mới", category: "pants", color: "blue", rating: 4.4, reviews: 89 },
    { id: 103, name: "Áo Hoodie Vintage Museum", brand: "Retro Wear", price: 85.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", tag: "Xu hướng", category: "hoodie", color: "cream", rating: 4.6, reviews: 234 },
    { id: 104, name: "Áo khoác Da Đen", brand: "Style Co.", price: 129.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", tag: "Mới", category: "jackets", color: "black", rating: 4.5, reviews: 141 },
    { id: 105, name: "Váy hoa Mùa hè", brand: "Bella Fashion", price: 68.5, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", tag: "Giảm giá", category: "dresses", color: "red", rating: 4.3, reviews: 301 },
    { id: 106, name: "Giày Sneaker Trắng", brand: "Street Kicks", price: 89.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", tag: "Xu hướng", category: "sneakers", color: "white", rating: 4.6, reviews: 540 },
    ...MOCK_PRODUCTS
  ], []);

  const filteredProducts = useMemo(() => {
    const s = searchQuery.toLowerCase();
    return allProducts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s);
      const matchCat = filters.categories.includes("all") || filters.categories.includes(p.category);
      const matchColor = filters.colors.includes("all") || filters.colors.includes(p.color);
      return matchSearch && matchCat && matchColor;
    });
  }, [allProducts, filters, searchQuery]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const visibleProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar 
        filters={filters} 
        setFilters={setFiltersAndReset} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchAndReset} 
      />

      <div className="flex-1 p-8">
        <div className="mb-10 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Bộ Sưu Tập Thời Trang</h1>
            <p className="text-gray-500 font-medium">
              Đang hiển thị <span className="text-pink-500">{visibleProducts.length}</span> trên tổng số <span className="text-gray-800">{totalItems}</span> sản phẩm
            </p>
          </div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
            Trang {currentPage} / {totalPages}
          </div>
        </div>

        {totalItems === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="mb-4 text-gray-300"><ScissorOutlined style={{ fontSize: '48px' }} /></div>
            <p className="text-gray-500 font-bold text-lg">Hic! Không tìm thấy sản phẩm nào phù hợp rồi.</p>
            <p className="text-gray-400 text-sm mb-6">Bạn thử thay đổi từ khóa hoặc bộ lọc xem sao nhé.</p>
            <Button 
              className="rounded-full px-8 h-12 font-bold bg-gray-900 text-white hover:bg-gray-800"
              onClick={() => {setFilters({categories:["all"], colors:["all"], priceRanges:["-"]}); setSearchQuery("");}}
            >
              XÓA TẤT CẢ BỘ LỌC
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleProducts.map(p => (
                <ProductCard key={p.id} product={p} onTryOn={(prod) => console.log("Thử đồ:", prod.name)} />
              ))}
            </div>
            <Pagination 
              current={currentPage} 
              totalPages={totalPages} 
              onChange={setCurrentPage} 
              pageSize={pageSize} 
              onPageSizeChange={(s) => {setPageSize(s); resetToFirstPage();}} 
            />
          </>
        )}
      </div>
    </div>
  );
}

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Áo Sơ mi Xám Tối giản", brand: "Urban Threads", price: 45.99, image: "https://i.pinimg.com/1200x/c1/f4/ca/c1f4ca7b5a10a8b1eba651880d503744.jpg", tag: "Sơ mi", category: "shirts", color: "gray", rating: 4.3, reviews: 124 },
  { id: 2, name: "Áo Sơ mi Oxford Trắng", brand: "Atelier 21", price: 59.99, image: "https://i.pinimg.com/1200x/2f/d4/1a/2fd41a8e36c1624b36469e566064189c.jpg", tag: "Sơ mi", category: "shirts", color: "white", rating: 4.6, reviews: 312 },
  { id: 3, name: "Áo Thun Đen Cotton", brand: "Mono Apparel", price: 19.99, image: "https://i.pinimg.com/1200x/6b/72/1f/6b721f08d5a944bbabe82fa59ce1ed21.jpg", tag: "Áo thun", category: "shirts", color: "black", rating: 4.1, reviews: 89 },
  { id: 4, name: "Quần Jean Xanh Cổ điển", brand: "Denim Studio", price: 79.99, image: "https://img.ltwebstatic.com/v4/j/pi/2025/04/22/0c/174528757547579f13371ceb6e7b8235ebb590b2d9.webp", tag: "Quần", category: "pants", color: "blue", rating: 4.4, reviews: 89 },
  { id: 5, name: "Quần Chinos Form Rộng", brand: "Craft & Co.", price: 69.99, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200", tag: "Quần", category: "pants", color: "khaki", rating: 4.2, reviews: 132 },
  { id: 6, name: "Quần Jean Dáng Ôm", brand: "Denim Studio", price: 84.5, image: "https://i.pinimg.com/1200x/3a/91/01/3a9101ecafce5eed3504b54575c1924d.jpg", tag: "Quần", category: "pants", color: "blue", rating: 4.5, reviews: 205 },
  { id: 7, name: "Áo Hoodie Vàng Vintage", brand: "Retro Vibes", price: 65.99, image: "https://i.pinimg.com/736x/0f/d1/3b/0fd13bbca5c25dd9998becf75d32a9d8.jpg", tag: "Hoodie", category: "hoodies", color: "mustard", rating: 4.6, reviews: 234 },
  { id: 8, name: "Áo Hoodie Kem Êm ái", brand: "Cozyline", price: 62.0, image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200", tag: "Hoodie", category: "hoodies", color: "cream", rating: 4.7, reviews: 188 },
  { id: 9, name: "Áo Hoodie Xám Oversized", brand: "StreetForge", price: 58.49, image: "https://i.pinimg.com/736x/6d/b9/19/6db919214a067edcce17f8356b0e8271.jpg", tag: "Hoodie", category: "hoodies", color: "gray", rating: 4.0, reviews: 77 },
  { id: 10, name: "Áo khoác Nhẹ Mùa hè", brand: "BreezeWear", price: 99.99, image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200", tag: "Áo khoác", category: "jackets", color: "cream", rating: 4.5, reviews: 141 },
  { id: 11, name: "Áo Blazer Xanh Navy May đo", brand: "Metropolitan", price: 149.0, image: "https://i.pinimg.com/1200x/98/8d/4e/988d4e4cc2e6683dfff6a59b369a5516.jpg", tag: "Blazer", category: "blazers", color: "blue", rating: 4.8, reviews: 265 },
  { id: 12, name: "Áo Blazer Linen Casual", brand: "Summer Co.", price: 129.99, image: "https://i.pinimg.com/1200x/36/5b/7b/365b7b3ff36cf89f43e6142ad1373ae9.jpg", tag: "Blazer", category: "blazers", color: "cream", rating: 4.3, reviews: 102 },
  { id: 13, name: "Váy hè Thướt tha", brand: "Sun & Sand", price: 89.99, image: "https://i.pinimg.com/1200x/0d/62/63/0d6263df3d02e3b54d56b9015108837e.jpg", tag: "Váy", category: "dresses", color: "pink", rating: 4.6, reviews: 301 },
  { id: 14, name: "Váy Đen Sang trọng", brand: "Evening Line", price: 119.0, image: "https://i.pinimg.com/1200x/50/2c/66/502c66be86d576e11d1fe86000278c33.jpg", tag: "Váy", category: "dresses", color: "black", rating: 4.9, reviews: 412 },
  { id: 15, name: "Váy Midi Kem", brand: "Light Wardrobe", price: 99.5, image: "https://i.pinimg.com/1200x/90/f7/7c/90f77cbde2a46cc157452f779005f8cc.jpg", tag: "Váy", category: "dresses", color: "cream", rating: 4.4, reviews: 199 },
  { id: 16, name: "Áo thun Graphic Trắng", brand: "ArtLab", price: 29.99, image: "https://i.pinimg.com/1200x/69/4e/6b/694e6bad7bc115f563bd28531e20d44f.jpg", tag: "Áo thun", category: "shirts", color: "white", rating: 4.2, reviews: 85 },
  { id: 17, name: "Áo thun Hồng Nhạt", brand: "Mono Apparel", price: 24.99, image: "https://i.pinimg.com/1200x/12/23/61/122361e22890dcc7078d8507eae58df3.jpg", tag: "Áo thun", category: "shirts", color: "pink", rating: 4.1, reviews: 56 },
  { id: 18, name: "Áo thun Thể thao Xanh", brand: "Active Co.", price: 27.99, image: "https://i.pinimg.com/1200x/a6/24/c6/a624c6c29a688d3fe2fa54c1de126f18.jpg", tag: "Áo thun", category: "shirts", color: "blue", rating: 4.0, reviews: 73 },
  { id: 19, name: "Bộ Suit Form Hiện đại", brand: "Tailor&You", price: 349.99, image: "https://i.pinimg.com/1200x/ad/3f/da/ad3fdadd7a62c988548f826a288f3e27.jpg", tag: "Suit", category: "suits", color: "gray", rating: 4.7, reviews: 167 },
  { id: 20, name: "Tuxedo Cổ điển", brand: "Evening Line", price: 459.0, image: "https://i.pinimg.com/1200x/60/ab/05/60ab05f4fdb6de8075c3ed4ae7a39e7a.jpg", tag: "Suit", category: "suits", color: "black", rating: 4.9, reviews: 220 },
  { id: 21, name: "Sneaker Trắng Tối giản", brand: "Step One", price: 89.5, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200", tag: "Giày", category: "sneakers", color: "white", rating: 4.6, reviews: 540 },
  { id: 22, name: "Giày Chạy Retro", brand: "Retro Vibes", price: 99.99, image: "https://i.pinimg.com/474x/d6/3f/07/d63f07d04a23c4ef50e9ba19978a2c69.jpg", tag: "Giày", category: "sneakers", color: "gray", rating: 4.3, reviews: 287 },
  { id: 23, name: "Sneaker Đường phố", brand: "StreetForge", price: 109.99, image: "https://i.pinimg.com/1200x/8e/5c/e1/8e5ce1687b73a8673d7cf57dc7ea8c94.jpg", tag: "Giày", category: "sneakers", color: "black", rating: 4.4, reviews: 430 },
  { id: 24, name: "Chân váy Xanh Lưng cao", brand: "Denim Studio", price: 54.0, image: "https://i.pinimg.com/736x/52/09/8d/52098dd785b23ee18266951526c7777f.jpg", tag: "Chân váy", category: "skirts", color: "blue", rating: 4.2, reviews: 98 },
  { id: 25, name: "Chân váy Chữ A Kem", brand: "Light Wardrobe", price: 49.99, image: "https://i.pinimg.com/736x/79/86/ed/7986ed2436cf6b94cf256d0dc195c026.jpg", tag: "Chân váy", category: "skirts", color: "cream", rating: 4.1, reviews: 65 },
  { id: 26, name: "Quần Shorts Cotton", brand: "BreezeWear", price: 35.0, image: "https://i.pinimg.com/736x/51/2c/80/512c809f356d0d54c1f333900bf8cf7e.jpg", tag: "Quần short", category: "shorts", color: "gray", rating: 4.0, reviews: 71 },
  { id: 27, name: "Áo Bomber Vàng", brand: "StreetForge", price: 119.99, image: "https://i.pinimg.com/1200x/50/1d/8c/501d8c837e9bfecd7524c42d3c5770c5.jpg", tag: "Áo khoác", category: "jackets", color: "mustard", rating: 4.3, reviews: 142 },
  { id: 28, name: "Áo khoác Denim Trucker", brand: "Denim Studio", price: 129.99, image: "https://i.pinimg.com/1200x/8d/01/af/8d01af3f1380ff39ed5266a23a9a38eb.jpg", tag: "Áo khoác", category: "jackets", color: "blue", rating: 4.5, reviews: 188 },
  { id: 29, name: "Áo khoác Utility Kem", brand: "Cozyline", price: 105.0, image: "https://i.pinimg.com/736x/dc/52/5e/dc525eb6a5d1612ddb45d9ce7ce5289a.jpg", tag: "Áo khoác", category: "jackets", color: "cream", rating: 4.2, reviews: 73 },
  { id: 30, name: "Hoodie Xám Zip-up", brand: "Mono Apparel", price: 57.99, image: "https://i.pinimg.com/1200x/b4/0d/c1/b40dc10f8d2321183a8c297c4de9cfc4.jpg", tag: "Hoodie", category: "hoodies", color: "gray", rating: 4.0, reviews: 61 },
  { id: 31, name: "Hoodie Xanh Pullover", brand: "Retro Vibes", price: 63.99, image: "https://i.pinimg.com/736x/62/64/2b/62642b1390281eb83104e67cffe7773d.jpg", tag: "Hoodie", category: "hoodies", color: "green", rating: 4.4, reviews: 129 },
  { id: 32, name: "Hoodie Fleece Kem", brand: "Cozyline", price: 66.49, image: "https://i.pinimg.com/1200x/83/97/9b/83979bf4057a8036bf00d30bb04938e6.jpg", tag: "Hoodie", category: "hoodies", color: "cream", rating: 4.5, reviews: 182 },
  { id: 33, name: "Sơ mi Oxford Xanh nhạt", brand: "Atelier 21", price: 64.5, image: "https://i.pinimg.com/1200x/71/75/a2/7175a29aecedf65ab86548f43251d059.jpg", tag: "Sơ mi", category: "shirts", color: "blue", rating: 4.4, reviews: 210 },
  { id: 34, name: "Quần Âu Xám Cao cấp", brand: "Tailor&You", price: 89.99, image: "https://i.pinimg.com/1200x/8c/7f/31/8c7f319c96777116de803153ef4e3c03.jpg", tag: "Quần", category: "pants", color: "gray", rating: 4.3, reviews: 120 },
  { id: 35, name: "Quần Short Chino Kem", brand: "BreezeWear", price: 44.99, image: "https://i.pinimg.com/1200x/31/9b/7d/319b7dfacc88e151275fa2076e04a197.jpg", tag: "Quần short", category: "shorts", color: "cream", rating: 4.1, reviews: 58 },
  { id: 36, name: "Áo thun Vàng Regular", brand: "Mono Apparel", price: 22.99, image: "https://i.pinimg.com/1200x/e1/89/5a/e1895a786e20f291afbcb4162eace952.jpg", tag: "Áo thun", category: "shirts", color: "mustard", rating: 3.9, reviews: 33 },
];