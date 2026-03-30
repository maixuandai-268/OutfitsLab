"use client";
import { useState, useEffect } from "react";

export default function BlogHero() {
    const [index, setIndex] = useState(0);
    const [heroBlogs, setHeroBlogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/blog");
                if (res.ok) {
                    const data = await res.json();

                    const shuffled = [...data].sort(() => 0.5 - Math.random());
                    setHeroBlogs(shuffled.slice(0, 3));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (heroBlogs.length === 0) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % heroBlogs.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroBlogs.length]);

    if (heroBlogs.length === 0) return null;

    const blog = heroBlogs[index];

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4">
            <div className="relative group">
                <div className="relative h-[450px] overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <img
                        src={blog.image || "/images/placeholder.jpg"}
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
                        {blog.avatar ? (
                            <img src={blog.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover" alt="author" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-[14px] font-black uppercase border-2 border-white shadow-md">
                                {blog.author?.[0] || "A"}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-800 uppercase text-xs tracking-wider">{blog.author || "Admin"}</span>
                            <span className="text-[11px] font-medium">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('vi-VN') : blog.date}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-24">
                <button onClick={() => setIndex((prev) => (prev - 1 + heroBlogs.length) % heroBlogs.length)} className="p-3 rounded-full border hover:bg-gray-100 transition shadow-sm bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );
}