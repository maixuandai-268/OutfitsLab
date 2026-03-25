"use client";
import { useState, useEffect } from "react";

const heroBlogs = [
    { id: 1, category: "Thời trang", title: "Thời trang nam 4.0: Sau 'ăn ngon, mặc đẹp' sẽ là 'ăn sạch, mặc xanh'", author: "Nguyễn Văn A", date: "21 Thg 2, 2025", image: "/images/Shop.png", avatar: "/images/avatar/ava.png" },
    { id: 2, category: "Đời sống", title: "Local Brand Có Hoodie Đẹp Nhất ở Sài Gòn Thời Điểm Hiện Tại", author: "Đặng Anh Tuấn", date: "25 Thg 10, 2025", image: "/images/blog/blog5.jpg", avatar: "/images/avatar/ava5.png" },
    { id: 3, category: "Thể thao", title: "Các phong cách thời trang nam HOT nhất 2025: Tìm gu chuẩn", author: "Bùi Hải Nam", date: "16 Thg 10, 2025", image: "/images/blog/blog6.jpg", avatar: "/images/avatar/ava6.png" },
];

export default function BlogHero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % heroBlogs.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const blog = heroBlogs[index];

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4">
            <div className="relative group">
                <div className="relative h-[450px] overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <img
                        src={blog.image}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        alt="Hero"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>

                <div className="absolute left-6 md:left-12 -bottom-12 bg-white/95 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl w-[90%] md:w-[480px] border border-white/50 animate-in slide-in-from-bottom-5 duration-500">
                    <span className="text-[10px] font-black bg-rose-500 text-white px-4 py-1.5 rounded-lg uppercase tracking-[0.2em]">
                        {blog.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black mt-4 leading-tight text-gray-900 tracking-tighter">
                        {blog.title}
                    </h2>
                    <div className="flex items-center gap-4 mt-6 text-sm text-gray-500 border-t pt-4 border-gray-100">
                        <img src={blog.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-md" alt="author" />
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-800 uppercase text-xs tracking-wider">{blog.author}</span>
                            <span className="text-[11px] font-medium">{blog.date}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-24">
                <button onClick={() => setIndex((prev) => (prev - 1 + heroBlogs.length) % heroBlogs.length)} className="p-3 rounded-full border hover:bg-gray-100 transition shadow-sm bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </button>
                
                <div className="flex gap-3">
                    {heroBlogs.map((_, i) => (
                        <div 
                            key={i} 
                            onClick={() => setIndex(i)}
                            className={`h-2 rounded-full cursor-pointer transition-all duration-500 ${index === i ? "w-12 bg-black" : "w-2 bg-gray-300 hover:bg-gray-400"}`} 
                        />
                    ))}
                </div>

                <button onClick={() => setIndex((prev) => (prev + 1) % heroBlogs.length)} className="p-3 rounded-full border hover:bg-gray-100 transition shadow-sm bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
            </div>
        </div>
    );
}