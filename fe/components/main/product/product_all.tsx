"use client";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "./sidebar";
import { useRouter } from "next/navigation";
import { useCustomizer } from "@/store/useCustomizer";
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
import { Button, Tooltip, message, Spin, Rate } from "antd";

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
  colors: string[];
  rating?: number;
  reviews?: number;
  shop_id?: number;
  garment_slot?: string;
  model_url?: string[];
  type?: string;
  gender?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  shirts: "SƠ MI",
  pants: "QUẦN",
  dresses: "VÁY/ĐẦM",
  hoodies: "HOODIE",
  blazers: "BLAZER",
  jackets: "ÁO KHOÁC",
  skirts: "CHÂN VÁY",
  sweaters: "ÁO LEN",
  sneakers: "GIÀY",
};

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

  const priceText = useMemo(() => `${Number(product.price || 0).toLocaleString()} VND`, [product.price]);

  const handleFav = () => {
    const next = !isFavorite;
    setIsFavorite(next);
    onToggleFavorite?.(product, next);
  };

  return (
    <div className="group rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/product_detail/${product.id}`}>
        <div className="relative h-64 bg-gray-100">
          <img
            src={product.image || (product as any).image_url || 'https://via.placeholder.com/400x500/f9fafb/9ca3af?text=No+Image'}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {(product.tag || product.category) && (
            <span className="absolute top-3 left-3 select-none rounded-full bg-[#FDF0DE] text-[#A36A1F] px-3 py-1 text-xs font-bold shadow-sm z-10 uppercase tracking-wider">
              {product.tag || product.category}
            </span>
          )}
        </div>
      </Link>

      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleFav}
          className="h-9 w-9 rounded-full bg-white/90 backdrop-blur border border-gray-100 grid place-items-center hover:bg-white transition-all shadow-sm"
        >
          {isFavorite ? (
            <HeartFilled className="text-red-500 scale-110" />
          ) : (
            <HeartOutlined className="text-gray-700 hover:text-red-500" />
          )}
        </button>
      </div>

      <div className="p-4">
        <Link href={`/product_detail/${product.id}`}>
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-pink-600 transition-colors uppercase tracking-tight">{product.name}</h3>
        </Link>
        
        <div className="flex items-center gap-1.5 mt-1 sm:mt-0">
          <Rate 
            disabled 
            allowHalf 
            value={product.rating || 0} 
            className="text-[12px] text-amber-400"
          />
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
            <Link href={product.shop_id ? `/shop_profile/${product.shop_id}` : '#'}>
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
  
  // --- STATE DỮ LIỆU TỪ BACKEND ---
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { setGarment, setGender } = useCustomizer();

  const handleTryOn = useCallback((product: Product) => {
    if (product.garment_slot && Array.isArray(product.model_url) && product.model_url.some(x => !!x)) {
      if (product.gender === 'male' || product.gender === 'female') {
        setGender(product.gender);
      }
      setGarment(product.garment_slot as any, {
        id: product.id,
        name: product.name,
        type: product.type || '',
        garment_slot: product.garment_slot,
        model_url: product.model_url,
        image: product.image
      });
    } else {
      message.info("Sản phẩm này hiện chưa có mô hình 3D để thử đồ.");
    }
  }, [router, setGarment, setGender]);

  // --- FETCH DỮ LIỆU TỪ DATABASE ---
  const fetchProductsFromDB = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/products?limit=1000");
      if (res.ok) {
        const result = await res.json();
        const rawData = result.data || result;
        
        // Hàm chuẩn hóa Category từ DB sang Sidebar keys
        const normalizeCategory = (type: string = "") => {
          const t = type?.toLowerCase().trim() || "";
          if (t === "top" || t === "áo" || t === "shirts") return "shirts";
          if (t === "bottom" || t === "quần" || t === "pants") return "pants";
          if (t === "shoes" || t === "giày" || t === "sneakers") return "sneakers";
          if (t === "dresses" || t === "váy" || t === "đầm") return "dresses";
          if (t === "jackets" || t === "áo khoác") return "jackets";
          if (t === "hoodies" || t === "hoodie") return "hoodies";
          if (t === "blazers" || t === "blazer") return "blazers";
          if (t === "skirts" || t === "chân váy") return "skirts";
          if (t === "sweaters" || t === "áo len") return "sweaters";
          return t; // Trả về nguyên bản nếu không khớp map
        };

        // Hàm chuẩn hóa Color
        const normalizeColor = (color: string = "") => {
          const c = color?.toLowerCase().trim() || "";
          if (c === "đen" || c === "black") return "black";
          if (c === "trắng" || c === "white") return "white";
          if (c === "xám" || c === "gray") return "gray";
          if (c === "đỏ" || c === "red") return "red";
          if (c === "xanh dương" || c === "blue") return "blue";
          if (c === "hồng" || c === "pink") return "pink";
          if (c === "vàng" || c === "yellow" || c === "mustard") return "mustard";
          if (c === "kem" || c === "be" || c === "cream") return "cream";
          if (c === "xanh lá" || c === "green") return "green";
          return c;
        };

        // Chuyển đổi dữ liệu BE sang định dạng hiển thị của ProductCard
        const formatted = rawData.map((item: any) => {
          const catKey = normalizeCategory(item.type);
          
          return {
            id: item.id,
            name: item.name,
            shop_id: item.shop_id || item.shop?.id,
            category: catKey, 
            colors: Array.isArray(item.colors) ? item.colors.map((c: string) => normalizeColor(c)) : [],
            sizes: Array.isArray(item.sizes) ? item.sizes : [],
            brand: item.brand || item.shop?.shop_name || "Outfits Lab",
            rating: item.averageRating !== undefined ? Number(item.averageRating) : (Number(item.rating) || 0), 
            reviews: item.reviewCount !== undefined ? Number(item.reviewCount) : 0,
            price: Number(item.price) || 0,
            image: item.image || item.image_url,
            tag: item.tag || CATEGORY_LABELS[catKey] || "MỚI",
            garment_slot: item.garment_slot,
            model_url: Array.isArray(item.model_url) ? item.model_url : [],
            type: item.type,
            gender: item.gender,
          };
        });
        setDbProducts(formatted);
      }
    } catch (error) {
      console.error("Lỗi fetch:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsFromDB();
  }, [fetchProductsFromDB]);

  const resetToFirstPage = useCallback(() => setCurrentPage(1), []);

  const setFiltersAndReset = (updater: React.SetStateAction<Filters>) => {
    setFilters(updater);
    resetToFirstPage();
  };

  const setSearchAndReset = (updater: React.SetStateAction<string>) => {
    setSearchQuery(updater);
    resetToFirstPage();
  };

  // --- CHỈ DÙNG DỮ LIỆU TỪ BACKEND ---
  const allProducts = useMemo<Product[]>(() => {
    return [...dbProducts];
  }, [dbProducts]);

  const filteredProducts = useMemo(() => {
    const s = searchQuery.toLowerCase();
    
    return allProducts.filter(p => {
      // 1. Search filter
      const matchSearch = p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s);
      
      // 2. Category filter
      const matchCat = filters.categories.includes("all") || filters.categories.includes(p.category);
      
      // 3. Color filter
      const matchColor = filters.colors.includes("all") || filters.colors.some(c => p.colors.includes(c.toLowerCase()));
      
      // 4. Price range filter
      let matchPrice = true;
      const rawPrice = filters.priceRanges?.[0] || "-";
      if (rawPrice !== "-") {
        const [minStr, maxStr] = rawPrice.split("-");
        const minVal = minStr ? Number(minStr) : 0;
        const maxVal = maxStr ? Number(maxStr) : Infinity;
        matchPrice = p.price >= minVal && p.price <= maxVal;
      }

      return matchSearch && matchCat && matchColor && matchPrice;
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
          {loading && <Spin />}
          <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
            Trang {currentPage} / {totalPages}
          </div>
        </div>

        {totalItems === 0 && !loading ? (
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
                <ProductCard key={`${p.id}-${p.name}`} product={p} onTryOn={handleTryOn} />
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