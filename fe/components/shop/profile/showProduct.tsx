import Link from 'next/link';

interface Product {
  id: number;
  shop_id: number;
  type: string;
  name: string;
  price: number;
  image?: string; 
  rating?: number;
  reviews?: number;
}

interface Shop {
  id: number;
  shop_name: string;
}

interface ShopProductCardProps {
  product: Product;
  shop: Shop;
}

export const ShopProductCard = ({ product, shop }: ShopProductCardProps) => {
  const currentRating = product.rating || 5; 

  return (
    <Link href={`/product_detail/${product.id}`} className="bg-white rounded-b-xl hover:scale-105 shadow-xl block overflow-hidden">  
      <div className="relative h-64 border-b border-gray-300 bg-gray-100">
        <img 
          src={product.image || "https://via.placeholder.com/400x500?text=No+Image"} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
          {product.type} 
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-semibold line-clamp-1 text-gray-800">{product.name}</h3>
        
        <div className="flex items-center text-xs gap-1 mb-2">
          <div className="flex text-[#d19f42]">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(star <= Math.floor(currentRating)) ? "currentColor" : "none"} stroke="currentColor" strokeWidth={(star <= Math.floor(currentRating)) ? 0 : 2} className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.757.74.34 1.146l-4.252 4.145a.563.563 0 00-.154.498l1.31 5.372c.16.654-.535 1.159-1.028.875L12 18.067l-4.708 2.615c-.493.284-1.187-.22-1.028-.875l1.31-5.372a.563.563 0 00-.154-.498L2.736 10.543c-.417-.406-.205-1.102.34-1.146l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg> 
              ))}
          </div>
          <span className="text-gray-400">({currentRating})</span>
        </div>

        <p className="text-xs text-gray-500 mb-3 italic">bởi {shop.shop_name}</p>
        
        <div className="text-[#d19f42] font-bold text-lg">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </div>
      </div>
    </Link>
  );
};  