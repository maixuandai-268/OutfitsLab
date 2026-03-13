"use client"

import { useState } from "react"
import BlogCard from "./BlogCard"

export default function BlogList() {

    const blogs = [
        {
            id: 1,
            title: "Gợi Ý Các Phụ Kiện Hoàn Hảo Khi Phối Đồ Với Giày Thể Thao Nam",
            author: "Hùng Hải",
            date: "21 Thg 2, 2025",
            image: "/images/blog/blog1.jpg",
        },
        {
            id: 2,
            title: "Bật mí cách phối đồ với giày jordan nam thu hút mọi ánh nhìn",
            author: "Minh",
            date: "22 Thg 2, 2025",
            image: "/images/blog/blog2.jpg",
        },
        {
            id: 3,
            title: "Top Những Mẫu Áo Khoác Hoodie Cặp Nam Nữ Siêu Cute",
            author: "Hùng",
            date: "23 Thg 2, 2025",
            image: "/images/blog/blog3.jpg",
        },
        {
            id: 4,
            title: "Độ Bền Và Sự Ấm Áp Đầy Mê Hoặc Của Áo Hoodie Nam Siêu Dày",
            author: "Lan",
            date: "24 Thg 2, 2025",
            image: "/images/blog/blog4.jpg",
        },
        {
            id: 5,
            title: "Local Brand Có Hoodie Đẹp Nhất ở Sài Gòn Thời Điểm Hiện Tại",
            author: "Tuấn",
            date: "25 Thg 2, 2025",
            image: "/images/blog/blog5.jpg",
        },
        {
            id: 6,
            title: "Streetwear 2026",
            author: "Nam",
            date: "26 Thg 2, 2025",
            image: "/images/blog/blog6.jpg",
        },
        {
            id: 7,
            title: "Mix đồ mùa đông",
            author: "Hoàng",
            date: "27 Thg 2, 2025",
            image: "/images/blog/blog7.jpg",
        },
        {
            id: 8,
            title: "Phong cách minimal",
            author: "Phúc",
            date: "28 Thg 2, 2025",
            image: "/images/blog/blog8.jpg",
        },
        {
            id: 9,
            title: "Top áo khoác đẹp",
            author: "Long",
            date: "29 Thg 2, 2025",
            image: "/images/blog/blog9.jpg",
        },
    ]

    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 6
    const totalPages = Math.ceil(blogs.length / postsPerPage)
    const start = (currentPage - 1) * postsPerPage
    const end = start + postsPerPage
    const currentBlogs = blogs.slice(start, end)
    return (
        <div className="mt-1">
            <h2 className="text-xl font-semibold mb-6">
                Bài đăng mới nhất
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-10">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded disabled:opacity-40"
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1
                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded transition
              ${currentPage === page
                                    ? "bg-pink-500 text-white"
                                    : "hover:bg-gray-100"}
              `}
                        >
                            {page}
                        </button>
                    )
                })}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
