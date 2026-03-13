"use client";
import { useState, useEffect } from "react";

const heroBlogs = [
    {
        id: 1,
        category: "Thời trang",
        title: "Thời trang nam 4.0: Sau 'ăn ngon, mặc đẹp' sẽ là 'ăn sạch, mặc xanh'",
        author: "Nguyễn Văn A",
        date: "21 Thg 2, 2025",
        image: "/images/Shop.png",
        avatar: "/images/avatar/ava.png",
    },
    {
        id: 2,
        category: "Đời sống",
        title: "Local Brand Có Hoodie Đẹp Nhất ở Sài Gòn Thời Điểm Hiện Tại",
        author: "Đặng Anh Tuấn",
        date: "25 Thg 10, 2025",
        avatar: "/images/avatar/ava5.png",
        image: "/images/blog/blog5.jpg",
    },
    {
        id: 3,
        category: "Thể thao",
        title: "Các phong cách thời trang nam HOT nhất 2025: Tìm gu chuẩn",
        author: "Bùi Hải Nam",
        date: "16 Thg 10, 2025",
        avatar: "/images/avatar/ava6.png",
        image: "/images/blog/blog6.jpg",
    },
];

export default function BlogHero() {
    const [index, setIndex] = useState(0);
    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % heroBlogs.length);
    };
    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + heroBlogs.length) % heroBlogs.length);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % heroBlogs.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const blog = heroBlogs[index];
    return (
        <div className="max-w-6xl mx-auto mt-5">
            <div className="relative">
                <a href="https://icondenim.com/blogs/shop-thoi-trang/top-15-shop-ao-local-brand-nam">
                    <img
                        src={blog.image}
                        className="w-full h-[420px] object-cover rounded-xl"
                    />
                </a>
                <div className="absolute left-10 -bottom-16 bg-white p-6 rounded-xl shadow-lg w-[420px]">
                    <span className="text-xs bg-pink-500 text-white px-3 py-1 rounded">
                        {blog.category}
                    </span>
                    <h2 className="text-2xl font-bold mt-3">
                        {blog.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
                        <img
                            src={blog.avatar}
                            className="w-8 h-8 rounded-full"
                        />
                        <span>{blog.author}</span>
                        <span>{blog.date}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-6 mt-24">
                <button
                    onClick={prevSlide}
                    className="w-15 h-5 rounded-full border flex items-center justify-center hover:bg-gray-300 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg>
                </button>
                <div className="flex gap-3">
                    {heroBlogs.map((_, i) => (
                        <span
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`cursor-pointer transition-all 
                            ${index === i
                                    ? "w-15 h-5 bg-black rounded-full"
                                    : "w-5 h-5 bg-gray-300 rounded-full"
                                }`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    className="w-15 h-5 rounded-full border flex items-center justify-center hover:bg-gray-300 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg>
                </button>
            </div>
            <div className="h-10"></div>
        </div>
    );
}