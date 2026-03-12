import Link from 'next/link';
import { PRODUCTS } from '@/app/(shop)/shopData';

interface ProductCardProps {
    count?: number;
    columns?: number;
}

export const ProductCard = ({ count = 3, columns = 3 }: ProductCardProps) => {
    return (
        <div 
            className="grid gap-4 w-full"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
            {PRODUCTS.slice(0, count).map(item => (
                <Link key={item.id} href={`/product_detail/${item.id}`} className="hover:scale-110 relative pb-14 block">
                    <div>
                        <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover"/>
                        <p className="text-sm font-semibold m-1">{item.name}</p>
                    </div>
                    <div className="absolute bottom-0 w-full">
                        <p className="text-base font-bold m-1">${item.price}</p>
                        <div className="flex justify-between mb-1 m-1">
                            <p className="flex-1 text-xs text-gray-500">{item.sold} Đã bán</p>
                            <div className="flex-1 flex items-center gap-1 justify-end">
                                <StarIcon className="text-xs text-yellow-500 w-5 h-5" filled={true} /> 
                                <p className="text-xs">{item.rating}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export function StarIcon({ className, filled = true }: { className?: string; filled?: boolean }) {
   return (
      <svg 
         xmlns="http://www.w3.org/2000/svg" 
         fill={filled ? "currentColor" : "none"} 
         viewBox="0 0 24 24" 
         strokeWidth={1.5} 
         stroke="currentColor" 
         className={className || "w-6 h-6"}
      >
         <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
         />
      </svg>
   )
}
