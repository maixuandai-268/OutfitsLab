import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface Product {
  id: number;
  shop_id: number;
  type: 'TOP' | 'BOTTOM' | 'SHOES' | 'HAT' | 'GLASSES' | 'ACCESSORY';
  gender: 'Male' | 'Female';
  name: string;
  price: number;
  image_url: string;
  model_3d_url: string;
	sold: number;
	rating: number;
	reviews: number;
	}

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const discountPrice = 158.99;
	const sizes = ['90cm', '100cm', '110cm', '120cm', '130cm', '140cm', '150cm', '160cm', '170cm']
	const colors = [
		{ color: '#000000' }, // Black
		{ color: '#FFFFFF' }, //White
		{ color: '#808080' }, // Gray
		{ color: '#0066FF' }, // Blue
		{ color: '#FF0000' }, // Red
		{ color: '#00AA00' }, // Green
		{ color: '#FFFF00' }, // Yellow
		{ color: '#FF69B4' }, // Pink
	]
	const description = "This is a stylish and comfortable retro graphic tee that captures the essence of vintage fashion. Made from soft, breathable cotton, it features a bold graphic print inspired by classic designs. Perfect for casual wear, this tee pairs well with jeans or shorts for a laid-back look. Available in various sizes, it's a must-have addition to any wardrobe looking to embrace the timeless appeal of retro style.";

  return (
    <div className="flex flex-col md:flex-row gap-8"> 
			 <div className="w-full md:w-1/2 px-4"> {/*Ảnh sản phẩm */}
					<img src={product.image_url} alt={product.name} className="rounded-lg w-full min-h-150 max-h-150 object-cover shadow-4xl"/>
					<p className="font-semibold mt-6">Best mix style with</p>
					<div className="mt-4">
						<ProductCard count={3} columns={3} />
					</div>
			</div>
			<div className="w-full md:w-1/2 px-4"> {/*Thông tin sản phẩm */}
				<p className="text-base mb-1 text-gray-500">{product.type}</p>
				<h1 className="text-3xl font-bold mb-5">{product.name}</h1>
					<div className="flex items-center gap-4 mb-5">
						<p className="text-base text-gray-500">{product.sold} Sold</p>
						<div className="flex items-center gap-1">
							<StarIcon className="text-yellow-500 w-5 h-5" filled={true} />
							<p className="text-sm">{product.rating} ({product.reviews} Reviews)</p>
						</div>
					</div>	
        <div className="flex items-center gap-2 mb-6">
          <p className="text-xs line-through mb-4"> ${product.price}</p>
          <p className="text-3xl font-black">${discountPrice.toFixed(2)}</p>
        </div>
				<div className="bg-gray-200 mx-auto mb-6 h-px w-full"></div>
				<p className="font-semibold mb-3">Color</p>
				{/* Available Colors */}
				<div className='flex flex-col items-start mb-6'>
					<div className="grid grid-cols-6 md:grid-cols-8 gap-2">
						{colors.map(item => (
							<button
								key={item.color}
								type="button"
								className={`w-10 h-10 rounded-full border-2 flex justify-center items-center transition-all duration-200 ${selectedColor === item.color ? 'scale-110 p-1 bg-clip-content' : 'border-gray-300 hover:border-[#d19f42]'}`}
								style={{ backgroundColor: item.color, borderColor: selectedColor === item.color ? item.color : "" }}
								title={item.color}
                onClick={() => setSelectedColor(item.color)}
							>
                {selectedColor === item.color && (
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-6 h-6 ${['#FFFFFF', '#FFFF00'].includes(item.color) ? 'text-black' : 'text-white'}`}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
									</svg>
								)}
              </button>
						))}
					</div>
				</div>
				<div className="flex items-center mb-3">
					<p className="font-semibold mr-9">Size</p>
					<p className="underline cursor-pointer">View Size Guide</p>
				</div>
				
				{/* Available Sizes */}
				<div>
					<div className="grid grid-cols-3 md:grid-cols-6 gap-2">
						{sizes.map(size => (
							<button
								key={size}
								type="button"
								className={`w-full h-12 rounded-lg font-semibold shadow-2xl ${selectedSize === size ? 'bg-black text-white' : 'bg-[#eceef2] tex hover:bg-[#fff4e6]'}`}
                onClick={() => setSelectedSize(size)}
							>
								{size}
							</button>
						))}
					</div>
				</div>
				<div className="flex gap-4 pt-8">
					<button
						type="button"
						className="px-6 py-3 bg-[#fa649a] text-white font-bold rounded-full flex items-center justify-center hover:bg-[#b88a36] transition-colors duration-200 shadow-md hover:shadow-lg"
					>
						<MagicWand className="w-5 h-5 mr-2 shrink-0" />
						Try-On Now!
					</button>
					
					<button
						type="button"
						className="group px-4 py-3 border-2 font-bold rounded-full hover:bg-orange-50 flex justify-center items-center transition-colors duration-200"
            onClick={() => setIsFavorite(!isFavorite)}
					>
						<Heart 
              className={`w-5 h-5 shrink-0`} 
              fill={isFavorite ? '#ef4444' : 'none'}
              stroke={isFavorite ? '#ef4444' : 'currentColor'}
            />
					</button>
				</div>
				<p className="font-semibold mt-8">Description:</p>
				<p className='text-justify'>{description}</p>

			</div>
    </div>
  );
};

function MagicWand({ className }: { className?: string }) {
	 return (
			<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 640 640"
			strokeWidth={1.5} 
			stroke="currentColor"
			fill="currentColor"
			className={`shrink-0 ${className || "w-4 h-4"}`}
			>
				<path d="M295.4 37L310.2 73.8L347 88.6C350 89.8 352 92.8 352 96C352 99.2 350 102.2 347 103.4L310.2 118.2L295.4 155C294.2 158 291.2 160 288 160C284.8 160 281.8 158 280.6 155L265.8 118.2L229 103.4C226 102.2 224 99.2 224 96C224 92.8 226 89.8 229 88.6L265.8 73.8L280.6 37C281.8 34 284.8 32 288 32C291.2 32 294.2 34 295.4 37zM142.7 105.7L164.2 155.8L214.3 177.3C220.2 179.8 224 185.6 224 192C224 198.4 220.2 204.2 214.3 206.7L164.2 228.2L142.7 278.3C140.2 284.2 134.4 288 128 288C121.6 288 115.8 284.2 113.3 278.3L91.8 228.2L41.7 206.7C35.8 204.2 32 198.4 32 192C32 185.6 35.8 179.8 41.7 177.3L91.8 155.8L113.3 105.7C115.8 99.8 121.6 96 128 96C134.4 96 140.2 99.8 142.7 105.7zM496 368C502.4 368 508.2 371.8 510.7 377.7L532.2 427.8L582.3 449.3C588.2 451.8 592 457.6 592 464C592 470.4 588.2 476.2 582.3 478.7L532.2 500.2L510.7 550.3C508.2 556.2 502.4 560 496 560C489.6 560 483.8 556.2 481.3 550.3L459.8 500.2L409.7 478.7C403.8 476.2 400 470.4 400 464C400 457.6 403.8 451.8 409.7 449.3L459.8 427.8L481.3 377.7C483.8 371.8 489.6 368 496 368zM492 64C503 64 513.6 68.4 521.5 76.2L563.8 118.5C571.6 126.4 576 137 576 148C576 159 571.6 169.6 563.8 177.5L475.6 265.7L374.3 164.4L462.5 76.2C470.4 68.4 481 64 492 64zM76.2 462.5L340.4 198.3L441.7 299.6L177.5 563.8C169.6 571.6 159 576 148 576C137 576 126.4 571.6 118.5 563.8L76.2 521.5C68.4 513.6 64 503 64 492C64 481 68.4 470.4 76.2 462.5z"/>
			</svg>
	 )
}

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
