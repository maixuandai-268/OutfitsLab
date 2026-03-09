// shopData.tsx

export interface User {
  id: number;
  email: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  role: 'admin' | 'shop_owner' | 'user';
}

export interface Shop {
  id: number;
  owner_id: number;
  shop_name: string;
  avatar_url: string;
  description: string;
  location: string;
  created_at: string;
  rating: number;
  reviews: number;
  specialty: string;
}

export interface Product {
  id: number;
  shop_id: number;
  type: 'TOP' | 'BOTTOM' | 'SHOES' | 'HAT' | 'GLASSES' | 'ACCESSORY';
  gender: 'Male' | 'Female';
  name: string;
  price: number;
  image_url: string;
  model_3d_url: string;
}

export interface Order {
  id: string;
  user_id: number;
  product_id: number;
  quantity: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string;
  date: string;
}

export const USERS: User[] = [
  { id: 1, email: 'admin@outfitslab.com', display_name: 'System Admin', avatar_url: 'https://i.pravatar.cc/150?u=1', bio: 'Admin', role: 'admin' },
  { id: 2, email: 'vintage@shop.com', display_name: 'Vintage Owner', avatar_url: 'https://i.pravatar.cc/150?u=2', bio: 'Vintage', role: 'shop_owner' },
  { id: 3, email: 'user@gmail.com', display_name: 'Nguyễn Văn A', avatar_url: 'https://i.pravatar.cc/150?u=3', bio: 'Customer', role: 'user' },
  { id: 4, email: 'urban@shop.com', display_name: 'Urban Boss', avatar_url: 'https://i.pravatar.cc/150?u=4', bio: 'Streetwear', role: 'shop_owner' },
  { id: 5, email: 'minimal@shop.com', display_name: 'Minimalist Life', avatar_url: 'https://i.pravatar.cc/150?u=5', bio: 'Minimal', role: 'shop_owner' },
  { id: 6, email: 'sporty@shop.com', display_name: 'Coach Mike', avatar_url: 'https://i.pravatar.cc/150?u=6', bio: 'Gym', role: 'shop_owner' },
  { id: 7, email: 'elegant@shop.com', display_name: 'Lady Sarah', avatar_url: 'https://i.pravatar.cc/150?u=7', bio: 'Luxury', role: 'shop_owner' },
];

export const SHOPS: Shop[] = [
  { id: 1, owner_id: 2, shop_name: 'Vintage Vibes Store', avatar_url: 'https://marketplace.canva.com/EAGLzFyubFo/1/0/1600w/canva-black-and-white-modern-personal-brand-logo-1vnFbGGdNKQ.jpg', description: 'Retro 90s', location: 'New York, NY', created_at: '2020-05-15', rating: 4.8, reviews: 324, specialty: 'Vintage & Retro' },
  { id: 2, owner_id: 4, shop_name: 'Urban Streetwear', avatar_url: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=300&q=80', description: 'Modern Streetwear', location: 'Los Angeles, CA', created_at: '2021-08-22', rating: 4.6, reviews: 124, specialty: 'Streetwear' },
  { id: 3, owner_id: 5, shop_name: 'Minimalist Haven', avatar_url: 'https://images.playground.com/c47b059d-ae11-4989-9eb6-aa069a2a0cf0.jpeg', description: 'Simple & Clean', location: 'Chicago, IL', created_at: '2022-03-10', rating: 4.7, reviews: 524, specialty: 'Minimalist Fashion' },
  { id: 4, owner_id: 6, shop_name: 'Sporty Pro Gear', avatar_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&q=80', description: 'Gym & Yoga', location: 'Miami, FL', created_at: '2019-11-05', rating: 4.9, reviews: 124, specialty: 'Gym & Yoga' },
  { id: 5, owner_id: 7, shop_name: 'Elegant Ladies', avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80', description: 'Evening Dresses', location: 'San Francisco, CA', created_at: '2020-05-15', rating: 4.9, reviews: 424, specialty: 'Luxury & Evening Wear' },
];

export const PRODUCTS: Product[] = [
  { id: 1, shop_id: 1, type: 'TOP', gender: 'Male', name: 'Retro Graphic Tee', price: 350000, image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80', model_3d_url: '#' },
  { id: 2, shop_id: 1, type: 'BOTTOM', gender: 'Male', name: 'Baggy Jeans 90s', price: 5500000, image_url: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=500&q=80', model_3d_url: '#' },
  { id: 3, shop_id: 1, type: 'SHOES', gender: 'Male', name: 'Classic Chunky Sneakers', price: 1200000, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80', model_3d_url: '#' },
  { id: 4, shop_id: 2, type: 'TOP', gender: 'Male', name: 'Black Oversized Hoodie', price: 650000, image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80', model_3d_url: '#' },
  { id: 5, shop_id: 2, type: 'BOTTOM', gender: 'Male', name: 'Cargo Pants Army Green', price: 550000, image_url: 'https://product.hstatic.net/200000475003/product/146_559046d3226c4b6b9a0360a7b0c5067a_master.png', model_3d_url: '#' },
  { id: 6, shop_id: 2, type: 'HAT', gender: 'Female', name: 'Street Snapback Cap', price: 250000, image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=80', model_3d_url: '#' },
  { id: 13, shop_id: 2, type: 'TOP', gender: 'Female', name: 'White Linen Shirt', price: 450000, image_url: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=500&q=80', model_3d_url: '#' },
  { id: 7, shop_id: 3, type: 'TOP', gender: 'Female', name: 'White Linen Shirt', price: 450000, image_url: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=500&q=80', model_3d_url: '#' },
  { id: 8, shop_id: 3, type: 'BOTTOM', gender: 'Female', name: 'Beige Trousers', price: 520000, image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80', model_3d_url: '#' },
  { id: 9, shop_id: 4, type: 'BOTTOM', gender: 'Female', name: 'High Waist Yoga Leggings', price: 350000, image_url: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=500&q=80', model_3d_url: '#' },
  { id: 11, shop_id: 5, type: 'TOP', gender: 'Female', name: 'Red Silk Evening Dress', price: 2100000, image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80', model_3d_url: '#' },
  { id: 12, shop_id: 5, type: 'ACCESSORY', gender: 'Female', name: 'Pearl Necklace', price: 890000, image_url: 'https://static.malabargoldanddiamonds.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/n/k/nkpjth001_c_1.jpg', model_3d_url: '#' },
  { id: 14, shop_id: 2, type: 'TOP', gender: 'Male', name: 'Casual Cotton T-Shirt', price: 320000, image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80', model_3d_url: '#',
}

];

export const ORDERS: Order[] = [
  { id: 'ORD-101', user_id: 3, product_id: 4, quantity: 5, date: '2026-01-25', status: 'Shipped' },
  { id: 'ORD-102', user_id: 1, product_id: 5, quantity: 2, date: '2026-01-26', status: 'Processing' },
  { id: 'ORD-103', user_id: 7, product_id: 13, quantity: 1, date: '2026-01-27', status: 'Delivered' },
  { id: 'ORD-104', user_id: 3, product_id: 4, quantity: 2, date: '2026-01-28', status: 'Delivered' },
  { id: 'ORD-105', user_id: 2, product_id: 1, quantity: 10, date: '2026-01-28', status: 'Shipped' },
  { id: 'ORD-106', user_id: 4, product_id: 4, quantity: 2, date: '2026-01-28', status: 'Delivered' },
  { id: 'ORD-107', user_id: 6, product_id: 2, quantity: 10, date: '2026-01-29', status: 'Shipped' },
  { id: 'ORD-108', user_id: 1, product_id: 6, quantity: 3, date: '2026-01-29', status: 'Processing' },
  { id: 'ORD-109', user_id: 4, product_id: 14, quantity: 3, date: '2026-01-29', status: 'Processing' },
];

export const REVIEWS: Review[] = [
  { id: 1, user_id: 3, product_id: 4, rating: 5, comment: 'Áo hoodie rất dày dặn, ấm áp!', date: '2024-01-25' },
  { id: 2, user_id: 2, product_id: 3, rating: 4.5, comment: 'Mũ đẹp nhưng giao hàng hơi chậm.', date: '2024-01-24' },
  { id: 3, user_id: 6, product_id: 2, rating: 2.1, comment: 'Mũ đẹp nhưng giao hàng hơi chậm.', date: '2024-01-24' },
  { id: 4, user_id: 4, product_id: 5, rating: 1.7, comment: 'Mũ đẹp nhưng giao hàng hơi chậm.', date: '2024-01-24' },
  { id: 5, user_id: 5, product_id: 1, rating: 3.8, comment: 'Mũ đẹp nhưng giao hàng hơi chậm.', date: '2024-01-24' },
  { id: 6, user_id: 6, product_id: 6, rating: 4.7, comment: 'Mũ đẹp nhưng giao hàng hơi chậm.', date: '2024-01-24' },
];