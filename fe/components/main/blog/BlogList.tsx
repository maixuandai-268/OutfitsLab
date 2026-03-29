"use client"
import { useState, useEffect } from "react"
import BlogCard from "./BlogCard"

export default function BlogList() {
    const [allBlogs, setAllBlogs] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/blog");
                if (res.ok) {
                    const data = await res.json();
                    setAllBlogs(data);
                } else {
                    setAllBlogs([]);
                }
            } catch (error) {
                console.error(error);
                setAllBlogs([]);
            }
        };
        fetchBlogs();
    }, []);

    const totalPages = Math.ceil(allBlogs.length / postsPerPage);
    const currentBlogs = allBlogs.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    return (
        <div className="mt-10 max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-black mb-8 uppercase italic tracking-tighter border-l-4 border-pink-500 pl-4">
                Bài đăng mới nhất
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-16">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-xl disabled:opacity-30 hover:bg-gray-50 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" /></svg>
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-xl border font-bold transition ${currentPage === i + 1 ? "bg-pink-500 text-white border-pink-500 shadow-lg shadow-pink-200" : "hover:bg-gray-50 text-gray-600"}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded-xl disabled:opacity-30 hover:bg-gray-50 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 5-5-5-5" /><path d="m13 17 5-5-5-5" /></svg>
                </button>
            </div>
        </div>
    )
}