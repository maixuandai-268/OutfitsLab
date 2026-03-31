"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BlogDetail() {
    const { id } = useParams();

    const [blog, setBlog] = useState<any>(null);
    const [latestBlogs, setLatestBlogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const [blogRes, listRes] = await Promise.all([
                    fetch(`https://outfitslab.onrender.com/api/blog/${id}`),
                    fetch(`https://outfitslab.onrender.com/api/blog`)
                ]);

                const blogData = await blogRes.json();
                const listData = await listRes.json();

                setBlog(blogData);

                const filtered = listData
                    .filter((item: any) => item.id !== blogData.id)
                    .slice(0, 5);

                setLatestBlogs(filtered);

            } catch (err) {
                console.error(err);
            }
        };

        if (id) fetchData();
    }, [id]);

    const renderContent = (content: string | React.ReactNode) => {
        if (typeof content === "string") {
            const paragraphs = content.split("\n").filter((para) => para.trim());
            return paragraphs.map((para, index) => (
                <p key={index} className="text-justify text-gray-800 leading-relaxed">
                    {para}
                </p>
            ));
        }
        return <div className="text-justify text-gray-800 leading-relaxed">{content}</div>;
    };

    if (!blog) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="bg-white min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

                <div className="md:col-span-2">

                    <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                        {blog.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 flex-wrap">
                        <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-xs font-bold">
                            {blog.category || "Tin tức"}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-gray-800">
                            {blog.author || "Admin"}
                        </span>
                        <span>•</span>
                        <span>
                            {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                    </div>

                    <p className="mt-6 text-lg italic text-justify text-gray-600 border-l-4 border-pink-500 pl-4">
                        {blog.excerpt}
                    </p>

                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full max-h-[350px] object-cover rounded-xl mt-8"
                    />

                    <div className="mt-10 space-y-4">
                        {renderContent(blog.content)}
                    </div>
                </div>
                <div className="space-y-8 sticky top-24">

                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                        <h3 className="font-bold text-lg mb-4 text-gray-900">Danh mục</h3>

                        <div className="flex flex-col gap-2">
                            {["Thời trang", "Thể thao", "Xu hướng", "Công nghệ", "Đời sống"].map((cat) => (
                                <Link
                                    href={`/blog?category=${encodeURIComponent(cat)}`}
                                    key={cat}
                                >
                                    <div className="px-3 py-2 rounded-lg hover:bg-pink-100 hover:text-pink-600 cursor-pointer text-gray-700 transition duration-200 font-medium">
                                        {cat}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                        <h3 className="font-bold text-lg mb-4 text-gray-900">Tin mới nhất</h3>

                        <div className="flex flex-col gap-3">
                            {latestBlogs.map((item) => (
                                <Link href={`/blog/${item.id}`} key={item.id}>
                                    <div className="group flex gap-3 p-3 rounded-lg hover:bg-pink-50 transition duration-200 cursor-pointer border border-transparent hover:border-pink-200">

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0 group-hover:shadow-md transition"
                                        />

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold line-clamp-2 text-gray-800 leading-snug group-hover:text-pink-600 transition">
                                                {item.title}
                                            </p>

                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                                            </p>

                                            <p className="text-xs text-gray-500 line-clamp-2 leading-snug opacity-80 group-hover:opacity-100 transition">
                                                {item.excerpt || item.content}
                                            </p>
                                        </div>

                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}