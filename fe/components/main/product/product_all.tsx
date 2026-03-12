"use client";
import React, { useMemo, useState, useCallback } from "react";
import { Sidebar } from "./sidebar";
import {
  HeartOutlined,
  HeartFilled,
  StarFilled,
  ScissorOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  MoreOutlined,
} from "@ant-design/icons";

/* ===================== Types ===================== */
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
  image?: string; // optional => hiện placeholder xám
  tag?: string;
  category: string;
  color: string;
  rating?: number;  // 0..5
  reviews?: number; // số đánh giá
}

interface ProductCardProps {
  product: Product;
  onTryOn?: (p: Product) => void;
  onToggleFavorite?: (p: Product, fav: boolean) => void;
}

/* ===================== Product Card ===================== */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onTryOn,
  onToggleFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const priceText = useMemo(() => `$ ${Number(product.price || 0).toFixed(2)}`, [product.price]);
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
    <div className="group rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image / Badge / Favorite */}
      <div className="relative h-56 bg-gray-200">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}

        {(product.tag || product.category) && (
          <span className="absolute top-3 left-3 select-none rounded-full bg-[#FDF0DE] text-[#A36A1F] px-2.5 py-1 text-xs font-medium shadow-sm">
            {product.tag || product.category}
          </span>
        )}

        <button
          onClick={handleFav}
          aria-label="Toggle favorite"
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur border border-gray-200 grid place-items-center hover:bg-white"
        >
          {isFavorite ? (
            <HeartFilled className="text-pink-500" />
          ) : (
            <HeartOutlined className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          {/* rating stars */}
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarFilled key={i} className={i < roundedRating ? "text-amber-400" : "text-gray-300"} />
            ))}
          </div>
          {typeof product.reviews === "number" && (
            <span className="ml-1">( {product.reviews.toLocaleString()} )</span>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-1">
          {product.brand?.startsWith("by ") ? product.brand : `by ${product.brand}`}
        </p>

        <div className="mt-2 text-lg font-bold text-[#F59E0B]">{priceText}</div>

        {/* CTA row */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => onTryOn?.(product)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-pink-500 px-4 py-2 text-white text-sm font-semibold shadow-sm transition-colors hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
          >
            <ScissorOutlined />
            Try-on Now!
          </button>

          <button
            onClick={handleFav}
            aria-label="Add to wishlist"
            className="h-9 w-9 rounded-full border border-gray-300 grid place-items-center hover:bg-gray-50"
          >
            {isFavorite ? (
              <HeartFilled className="text-pink-500" />
            ) : (
              <HeartOutlined className="text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ===================== Pagination Component ===================== */
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
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Page size */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">Items per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          aria-label="Select items per page"
          className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2C58B]"
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
        </select>
      </div>

      {/* Pager */}
      <nav className="flex items-center gap-1">
        <button
          onClick={() => onChange(1)}
          disabled={current <= 1}
          className="h-9 w-9 rounded-full border border-gray-300 text-gray-700 grid place-items-center disabled:opacity-40 hover:bg-gray-50"
          aria-label="First page"
        >
          <DoubleLeftOutlined />
        </button>
        <button
          onClick={() => onChange(current - 1)}
          disabled={current <= 1}
          className="h-9 w-9 rounded-full border border-gray-300 text-gray-700 grid place-items-center disabled:opacity-40 hover:bg-gray-50"
          aria-label="Previous page"
        >
          <LeftOutlined />
        </button>

        {pages.map((p, idx) =>
          typeof p === "number" ? (
            <button
              key={idx}
              onClick={() => onChange(p)}
              aria-current={p === current ? "page" : undefined}
              className={[
                "h-9 min-w-9 px-3 rounded-full border grid place-items-center text-sm",
                p === current
                  ? "border-[#F2C58B] bg-[#FFF6EA] text-[#A36A1F] font-semibold"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              {p}
            </button>
          ) : (
            <span
              key={idx}
              className="h-9 w-9 rounded-full grid place-items-center text-gray-400"
              aria-hidden
            >
              <MoreOutlined />
            </span>
          )
        )}

        <button
          onClick={() => onChange(current + 1)}
          disabled={current >= totalPages}
          className="h-9 w-9 rounded-full border border-gray-300 text-gray-700 grid place-items-center disabled:opacity-40 hover:bg-gray-50"
          aria-label="Next page"
        >
          <RightOutlined />
        </button>
        <button
          onClick={() => onChange(totalPages)}
          disabled={current >= totalPages}
          className="h-9 w-9 rounded-full border border-gray-300 text-gray-700 grid place-items-center disabled:opacity-40 hover:bg-gray-50"
          aria-label="Last page"
        >
          <DoubleRightOutlined />
        </button>
      </nav>
    </div>
  );
};

/* ===================== Grid ===================== */
export const ProductGrid: React.FC<{
  products: Product[];
  onTryOn?: (p: Product) => void;
}> = ({ products, onTryOn }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onTryOn={onTryOn} />
      ))}
    </div>
  );
};

/* ===================== Container (đã bỏ useEffect reset page) ===================== */
export default function ProductAll() {
  // State filter
  const [filters, setFilters] = useState<Filters>({
    categories: ["all"],
    colors: ["all"],
    priceRanges: ["-"], // (hoặc 'all' nếu bạn đang dùng kiểu cũ)
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  /* --------- CHỈNH SỬA: bỏ useEffect; dùng wrapper setters để reset page --------- */
  /** Reset page về 1 khi đổi filters */
  const setFiltersAndReset = useCallback(
    (updater: React.SetStateAction<Filters>) => {
      setCurrentPage(1);
      setFilters((prev) =>
        typeof updater === "function"
          ? (updater as (p: Filters) => Filters)(prev)
          : updater
      );
    },
    []
  );

  /** Reset page về 1 khi đổi search */
  const setSearchAndReset = useCallback(
    (updater: React.SetStateAction<string>) => {
      setCurrentPage(1);
      setSearchQuery((prev) =>
        typeof updater === "function"
          ? (updater as (p: string) => string)(prev)
          : updater
      );
    },
    []
  );

  /** Reset page về 1 khi đổi pageSize */
  const setPageSizeAndReset = useCallback((size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  }, []);
  /* ------------------------------------------------------------------------------ */

  // Dữ liệu sản phẩm: 9 sản phẩm từ page + rất nhiều mock (36)
  const allProducts = useMemo<Product[]>(
    () => [
      // --- 9 sản phẩm bạn đưa từ page ---
      {
        id: 1,
        name: "Oversized Grey T-Shirt",
        brand: "Urban Apparel",
        price: 54.95,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
        tag: "Sale",
        category: "tshirt",
        color: "gray",
        rating: 4.2,
        reviews: 124,
      },
      {
        id: 2,
        name: "Classic Blue Denim",
        brand: "Denim World",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
        tag: "New",
        category: "pants",
        color: "blue",
        rating: 4.4,
        reviews: 89,
      },
      {
        id: 3,
        name: "Vintage Museum Hoodie",
        brand: "Retro Wear",
        price: 85.99,
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
        tag: "Trending",
        category: "hoodie",
        color: "cream",
        rating: 4.6,
        reviews: 234,
      },
      {
        id: 4,
        name: "Black Leather Jacket",
        brand: "Style Co.",
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
        tag: "New",
        category: "jackets",
        color: "black",
        rating: 4.5,
        reviews: 141,
      },
      {
        id: 5,
        name: "Summer Floral Dress",
        brand: "Bella Fashion",
        price: 68.5,
        image:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
        tag: "Sale",
        category: "dresses",
        color: "red",
        rating: 4.3,
        reviews: 301,
      },
      {
        id: 6,
        name: "White Sneakers",
        brand: "Street Kicks",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
        tag: "Trending",
        category: "sneakers",
        color: "white",
        rating: 4.6,
        reviews: 540,
      },
      {
        id: 7,
        name: "Casual Khaki Pants",
        brand: "Comfort Wear",
        price: 45.99,
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
        category: "pants",
        color: "mustard",
        rating: 4.1,
        reviews: 65,
      },
      {
        id: 8,
        name: "Striped Cotton Shirt",
        brand: "Classic Style",
        price: 39.95,
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
        tag: "Sale",
        category: "icons",
        color: "blue",
        rating: 4.0,
        reviews: 58,
      },
      {
        id: 9,
        name: "Navy Blue Blazer",
        brand: "Executive Look",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop",
        category: "blazers",
        color: "blue",
        rating: 4.7,
        reviews: 210,
      },

      // --- RẤT NHIỀU dữ liệu ảo thêm (36 item) ---
      ...MOCK_PRODUCTS.map((p) => ({ ...p, id: p.id + 1000 })), // tránh trùng id
    ],
    []
  );

  // Lọc dữ liệu (hỗ trợ cả 2 kiểu priceRanges)
  const filteredProducts = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    return allProducts.filter((product) => {
      // Search
      if (search) {
        const byName = product.name.toLowerCase().includes(search);
        const byBrand = product.brand.toLowerCase().includes(search);
        if (!byName && !byBrand) return false;
      }

      // Category
      if (!filters.categories.includes("all")) {
        if (!filters.categories.includes(product.category)) return false;
      }

      // Color
      if (!filters.colors.includes("all")) {
        if (!filters.colors.includes(product.color)) return false;
      }

      // Price
      const ranges = filters.priceRanges;
      if (!ranges || ranges.length === 0) return true;

      // ['all'] => bỏ qua lọc giá
      if (ranges.length === 1 && ranges[0] === "all") return true;

      // Min/Max: ["min-max"]
      if (ranges.length === 1 && ranges[0].includes("-")) {
        const [minStr, maxStr] = ranges[0].split("-");
        const min = minStr ? Number(minStr) : -Infinity;
        const max = maxStr ? Number(maxStr) : Infinity;
        if (Number.isFinite(min) || Number.isFinite(max)) {
          if (!(product.price >= min && product.price <= max)) return false;
        }
        return true;
      }

      // Nhiều khoảng (kiểu cũ)
      let ok = false;
      for (const r of ranges) {
        const [a, b] = r.split("-");
        const min = a ? Number(a) : -Infinity;
        const max = b ? Number(b) : Infinity;
        if (product.price >= min && product.price <= max) {
          ok = true;
          break;
        }
      }
      return ok || ranges[0] === "-";
    });
  }, [allProducts, filters, searchQuery]);

  // ===== Pagination slicing (không setState trong render, không cần useEffect) =====
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentSafe = Math.min(currentPage, totalPages);
  const start = (currentSafe - 1) * pageSize;
  const visibleProducts = filteredProducts.slice(start, start + pageSize);

  const handleTryOn = useCallback((p: Product) => {
    console.log("Try-on:", p.name);
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        filters={filters}
        setFilters={setFiltersAndReset}     // <-- dùng wrapper: reset page
        searchQuery={searchQuery}
        setSearchQuery={setSearchAndReset} // <-- dùng wrapper: reset page
      />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Our Collection</h1>
          <p className="text-gray-600">
            Showing <span className="font-semibold">{visibleProducts.length}</span> of{" "}
            <span className="font-semibold">{totalItems}</span> items
          </p>
        </div>

        {totalItems === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your filters.</p>
            <button
              onClick={() => {
                setFiltersAndReset({ categories: ["all"], colors: ["all"], priceRanges: ["-"] });
                setSearchAndReset("");
              }}
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <ProductGrid products={visibleProducts} onTryOn={handleTryOn} />

            <Pagination
              current={currentSafe}
              totalPages={totalPages}
              onChange={(p) => {
                const next = Math.max(1, Math.min(totalPages, p));
                setCurrentPage(next);
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              pageSize={pageSize}
              onPageSizeChange={setPageSizeAndReset} // <-- dùng wrapper: reset page
            />
          </>
        )}
      </div>
    </div>
  );
}

/* ===================== Dữ liệu ảo nhiều (36 item) ===================== */
export const MOCK_PRODUCTS: Product[] = [
  // Shirts
  {
    id: 1,
    name: "Minimalist Gray Shirt",
    brand: "Urban Threads",
    price: 45.99,
    image:
      "https://images.unsplash.com/photo-1520975954732-35dd222996f2?q=80&w=1200&auto=format&fit=crop",
    tag: "Shirts",
    category: "shirts",
    color: "gray",
    rating: 4.3,
    reviews: 124,
  },
  {
    id: 2,
    name: "Classic White Oxford Shirt",
    brand: "Atelier 21",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956b6b8e?q=80&w=1200&auto=format&fit=crop",
    tag: "Shirts",
    category: "shirts",
    color: "white",
    rating: 4.6,
    reviews: 312,
  },
  {
    id: 3,
    name: "Soft Cotton Black Tee",
    brand: "Mono Apparel",
    price: 19.99,
    image: "",
    tag: "Shirts",
    category: "shirts",
    color: "black",
    rating: 4.1,
    reviews: 89,
  },

  // Pants / Denim
  {
    id: 4,
    name: "Classic Blue Denim",
    brand: "Denim Studio",
    price: 79.99,
    image: "",
    tag: "Pants",
    category: "pants",
    color: "blue",
    rating: 4.4,
    reviews: 89,
  },
  {
    id: 5,
    name: "Relaxed Fit Chinos",
    brand: "Craft & Co.",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
    tag: "Pants",
    category: "pants",
    color: "khaki",
    rating: 4.2,
    reviews: 132,
  },
  {
    id: 6,
    name: "Slim Tapered Jeans",
    brand: "Denim Studio",
    price: 84.5,
    image: "",
    tag: "Pants",
    category: "pants",
    color: "blue",
    rating: 4.5,
    reviews: 205,
  },

  // Hoodies
  {
    id: 7,
    name: "Vintage Mustard Hoodie",
    brand: "Retro Vibes",
    price: 65.99,
    image: "",
    tag: "Hoodies",
    category: "hoodies",
    color: "mustard",
    rating: 4.6,
    reviews: 234,
  },
  {
    id: 8,
    name: "Cozy Cream Hoodie",
    brand: "Cozyline",
    price: 62.0,
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop",
    tag: "Hoodies",
    category: "hoodies",
    color: "cream",
    rating: 4.7,
    reviews: 188,
  },
  {
    id: 9,
    name: "Oversized Charcoal Hoodie",
    brand: "StreetForge",
    price: 58.49,
    image: "",
    tag: "Hoodies",
    category: "hoodies",
    color: "gray",
    rating: 4.0,
    reviews: 77,
  },

  // Jackets / Blazers
  {
    id: 10,
    name: "Lightweight Summer Jacket",
    brand: "BreezeWear",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    tag: "Jackets",
    category: "jackets",
    color: "cream",
    rating: 4.5,
    reviews: 141,
  },
  {
    id: 11,
    name: "Tailored Navy Blazer",
    brand: "Metropolitan",
    price: 149.0,
    image: "",
    tag: "Blazers",
    category: "blazers",
    color: "blue",
    rating: 4.8,
    reviews: 265,
  },
  {
    id: 12,
    name: "Casual Linen Blazer",
    brand: "Summer Co.",
    price: 129.99,
    image: "",
    tag: "Blazers",
    category: "blazers",
    color: "cream",
    rating: 4.3,
    reviews: 102,
  },

  // Dresses
  {
    id: 13,
    name: "Flowy Summer Dress",
    brand: "Sun & Sand",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=1200&auto=format&fit=crop",
    tag: "Dresses",
    category: "dresses",
    color: "pink",
    rating: 4.6,
    reviews: 301,
  },
  {
    id: 14,
    name: "Classic Black Dress",
    brand: "Evening Line",
    price: 119.0,
    image: "",
    tag: "Dresses",
    category: "dresses",
    color: "black",
    rating: 4.9,
    reviews: 412,
  },
  {
    id: 15,
    name: "Midi Cream Dress",
    brand: "Light Wardrobe",
    price: 99.5,
    image: "",
    tag: "Dresses",
    category: "dresses",
    color: "cream",
    rating: 4.4,
    reviews: 199,
  },

  // T-shirts
  {
    id: 16,
    name: "Graphic White Tee",
    brand: "ArtLab",
    price: 29.99,
    image: "",
    tag: "T-shirt",
    category: "shirts",
    color: "white",
    rating: 4.2,
    reviews: 85,
  },
  {
    id: 17,
    name: "Muted Pink Tee",
    brand: "Mono Apparel",
    price: 24.99,
    image: "",
    tag: "T-shirt",
    category: "shirts",
    color: "pink",
    rating: 4.1,
    reviews: 56,
  },
  {
    id: 18,
    name: "Athletic Blue Tee",
    brand: "Active Co.",
    price: 27.99,
    image: "",
    tag: "T-shirt",
    category: "shirts",
    color: "blue",
    rating: 4.0,
    reviews: 73,
  },

  // Suits
  {
    id: 19,
    name: "Modern Fit Suit",
    brand: "Tailor&You",
    price: 349.99,
    image: "",
    tag: "Suits",
    category: "suits",
    color: "gray",
    rating: 4.7,
    reviews: 167,
  },
  {
    id: 20,
    name: "Classic Tuxedo",
    brand: "Evening Line",
    price: 459.0,
    image: "",
    tag: "Suits",
    category: "suits",
    color: "black",
    rating: 4.9,
    reviews: 220,
  },

  // Sneakers
  {
    id: 21,
    name: "Minimal White Sneaker",
    brand: "Step One",
    price: 89.5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    tag: "Sneakers",
    category: "sneakers",
    color: "white",
    rating: 4.6,
    reviews: 540,
  },
  {
    id: 22,
    name: "Retro Runner",
    brand: "Retro Vibes",
    price: 99.99,
    image: "",
    tag: "Sneakers",
    category: "sneakers",
    color: "gray",
    rating: 4.3,
    reviews: 287,
  },
  {
    id: 23,
    name: "Urban Street Sneaker",
    brand: "StreetForge",
    price: 109.99,
    image: "",
    tag: "Sneakers",
    category: "sneakers",
    color: "black",
    rating: 4.4,
    reviews: 430,
  },

  // Skirts / Shorts
  {
    id: 24,
    name: "High-rise Blue Skirt",
    brand: "Denim Studio",
    price: 54.0,
    image: "",
    tag: "Skirts",
    category: "skirts",
    color: "blue",
    rating: 4.2,
    reviews: 98,
  },
  {
    id: 25,
    name: "A-line Cream Skirt",
    brand: "Light Wardrobe",
    price: 49.99,
    image: "",
    tag: "Skirts",
    category: "skirts",
    color: "cream",
    rating: 4.1,
    reviews: 65,
  },
  {
    id: 26,
    name: "Casual Cotton Shorts",
    brand: "BreezeWear",
    price: 35.0,
    image: "",
    tag: "Shorts",
    category: "shorts",
    color: "gray",
    rating: 4.0,
    reviews: 71,
  },

  // Jackets more
  {
    id: 27,
    name: "Mustard Bomber Jacket",
    brand: "StreetForge",
    price: 119.99,
    image: "",
    tag: "Jackets",
    category: "jackets",
    color: "mustard",
    rating: 4.3,
    reviews: 142,
  },
  {
    id: 28,
    name: "Denim Trucker Jacket",
    brand: "Denim Studio",
    price: 129.99,
    image: "",
    tag: "Jackets",
    category: "jackets",
    color: "blue",
    rating: 4.5,
    reviews: 188,
  },
  {
    id: 29,
    name: "Cream Utility Jacket",
    brand: "Cozyline",
    price: 105.0,
    image: "",
    tag: "Jackets",
    category: "jackets",
    color: "cream",
    rating: 4.2,
    reviews: 73,
  },

  // Hoodies more
  {
    id: 30,
    name: "Zip-up Gray Hoodie",
    brand: "Mono Apparel",
    price: 57.99,
    image: "",
    tag: "Hoodies",
    category: "hoodies",
    color: "gray",
    rating: 4.0,
    reviews: 61,
  },
  {
    id: 31,
    name: "Pullover Green Hoodie",
    brand: "Retro Vibes",
    price: 63.99,
    image: "",
    tag: "Hoodies",
    category: "hoodies",
    color: "green",
    rating: 4.4,
    reviews: 129,
  },
  {
    id: 32,
    name: "Cream Fleece Hoodie",
    brand: "Cozyline",
    price: 66.49,
    image: "",
    tag: "Hoodies",
    category: "hoodies",
    color: "cream",
    rating: 4.5,
    reviews: 182,
  },

  // More shirts/pants
  {
    id: 33,
    name: "Oxford Sky Blue Shirt",
    brand: "Atelier 21",
    price: 64.5,
    image: "",
    tag: "Shirts",
    category: "shirts",
    color: "blue",
    rating: 4.4,
    reviews: 210,
  },
  {
    id: 34,
    name: "Premium Gray Slacks",
    brand: "Tailor&You",
    price: 89.99,
    image: "",
    tag: "Pants",
    category: "pants",
    color: "gray",
    rating: 4.3,
    reviews: 120,
  },
  {
    id: 35,
    name: "Cream Chino Shorts",
    brand: "BreezeWear",
    price: 44.99,
    image: "",
    tag: "Shorts",
    category: "shorts",
    color: "cream",
    rating: 4.1,
    reviews: 58,
  },
  {
    id: 36,
    name: "Mustard Tee Regular",
    brand: "Mono Apparel",
    price: 22.99,
    image: "",
    tag: "T-shirt",
    category: "shirts",
    color: "mustard",
    rating: 3.9,
    reviews: 33,
  },
];
