"use client"

import { useState } from "react"
import BlogCard from "./BlogCard"

export default function BlogList() {

    const blogs = [
        {
            id: 1,
            category: "Thời trang",
            title: "Gợi Ý Các Phụ Kiện Hoàn Hảo Khi Phối Đồ Với Giày Thể Thao Nam",
            author: "Nguyễn Hùng Hải",
            date: "21 Thg 2, 2026",
            avatar: "/images/avatar/ava1.png",
            image: "/images/blog/blog1.jpg",
        },
        {
            id: 2,
            category: "Thể thao",
            title: "Bật mí cách phối đồ với giày jordan nam thu hút mọi ánh nhìn",
            author: "Trần Nhật Minh",
            date: "14 Thg 1, 2026",
            avatar: "/images/avatar/ava2.png",
            image: "/images/blog/blog2.jpg",
        },
        {
            id: 3,
            category: "Thời trang",
            title: "Top Những Mẫu Áo Khoác Hoodie Cặp Nam Nữ Siêu Cute",
            author: "Phạm Gia Hùng",
            date: "23 Thg 12, 2025",
            avatar: "/images/avatar/ava3.png",
            image: "/images/blog/blog3.jpg",
        },
        {
            id: 4,
            category: "Đời sống",
            title: "Độ Bền Và Sự Ấm Áp Đầy Mê Hoặc Của Áo Hoodie Nam Siêu Dày",
            author: "Lê Hồng Lan",
            date: "2 Thg 11, 2025",
            avatar: "/images/avatar/ava4.png",
            image: "/images/blog/blog4.jpg",
        },
        {
            id: 5,
            category: "Thời trang",
            title: "Local Brand Có Hoodie Đẹp Nhất ở Sài Gòn Thời Điểm Hiện Tại",
            author: "Đặng Anh Tuấn",
            date: "25 Thg 10, 2025",
            avatar: "/images/avatar/ava5.png",
            image: "/images/blog/blog5.jpg",
        },
        {
            id: 6,
            category: "Thời trang",
            title: "Các phong cách thời trang nam HOT nhất 2025: Tìm gu chuẩn",
            author: "Bùi Hải Nam",
            date: "16 Thg 10, 2025",
            avatar: "/images/avatar/ava6.png",
            image: "/images/blog/blog6.jpg",
        },
        {
            id: 7,
            category: "Sắc đẹp",
            title: "Top 5 phong cách thời trang nam được ưa chuộng năm 2024",
            author: "Vũ Minh Hoàng",
            date: "7 Thg 10, 2025",
            avatar: "/images/avatar/ava3.png",
            image: "/images/blog/blog7.jpg",
        },
        {
            id: 8,
            category: "Thời trang",
            title: "Top 15+ Thương Hiệu Bán Áo Chống Nắng Nam Chất Lượng, Giá Tốt Nhất 2025",
            author: "Ngô Đức Phúc",
            date: "28 Thg 9, 2025",
            avatar: "/images/avatar/ava1.png",
            image: "/images/blog/blog8.jpg",
        },
        {
            id: 9,
            category: "Thời trang",
            title: "Cách Chọn Áo Sơ Mi Nam Đẹp, Chuẩn Form Cho Mọi Dáng Người 2025",
            author: "Phan Phúc Long",
            date: "12 Thg 9, 2025",
            avatar: "/images/avatar/ava6.png",
            image: "/images/blog/blog9.jpg",
        },
        {
            id: 10,
            category: "Thời trang",
            title: "Top 20 phong cách thời trang nam thịnh hành nhất 2025, bạn chuộng style nào?",
            author: "Trịnh Minh Đức",
            date: "1 Thg 3, 2025",
            avatar: "/images/avatar/ava1.png",
            image: "/images/blog/blog10.jpg",
        },
        {
            id: 11,
            category: "Đời sống",
            title: "Vải cafe là gì? Ưu, nhược điểm, ứng dụng của vải cafe",
            author: "Hoàng Tuấn Phong",
            date: "2 Thg 1, 2025",
            avatar: "/images/avatar/ava2.png",
            image: "/images/blog/blog11.jpg",
        },
        {
            id: 12,
            category: "Thể thao",
            title: "Sneaker đáng mua , bạn có nên thử phong cách này không?",
            author: "Đỗ Hùng Biển",
            date: "23 Thg 12, 2024",
            avatar: "/images/avatar/ava5.png",
            image: "/images/blog/blog12.jpg",
        },
        {
            id: 13,
            category: "Đời sống",
            title: "Phối đồ đi chơi cuối tuần cho nam trẻ trung, năng động và cực dễ áp dụng với những item basic",
            author: "Nguyễn Minh Quân",
            date: "22 Thg 2, 2024",
            avatar: "/images/avatar/ava4.png",
            image: "/images/blog/blog13.jpg",
        },
        {
            id: 14,
            category: "Thời trang",
            title: "Áo hoodie nam hot nhất hiện nay và cách phối chuẩn streetwear giúp outfit nổi bật hơn",
            author: "Trần Hoàng Nam",
            date: "18 Thg 2, 2024",
            avatar: "/images/avatar/ava1.png",
            image: "/images/blog/blog14.jpg",
        },
        {
            id: 15,
            category: "Thời trang",
            title: "Phong cách thời trang Hàn Quốc cho nam với những cách mix đồ đơn giản nhưng cực cuốn",
            author: "Lê Đức Phúc",
            date: "10 Thg 2, 2024",
            avatar: "/images/avatar/ava6.png",
            image: "/images/blog/blog15.jpg",
        },
        {
            id: 16,
            category: "Thời trang",
            title: "Top local brand Việt Nam nổi bật dành cho nam giới yêu thích streetwear và phong cách cá tính",
            author: "Phạm Gia Long",
            date: "3 Thg 2, 2024",
            avatar: "/images/avatar/ava2.png",
            image: "/images/blog/blog16.jpg",
        },
        {
            id: 17,
            category: "Đời sống",
            title: "Mix đồ đơn giản cho nam mỗi ngày với những item basic nhưng vẫn cực kỳ thời trang",
            author: "Đặng Quốc Hoàng",
            date: "25 Thg 1, 2024",
            avatar: "/images/avatar/ava3.png",
            image: "/images/blog/blog17.jpg",
        },
        {
            id: 18,
            category: "Thời trang",
            title: "Top áo thun nam đẹp và dễ phối đồ nhất giúp bạn nâng cấp phong cách thời trang hằng ngày",
            author: "Ngô Thành Minh",
            date: "18 Thg 1, 2024",
            avatar: "/images/avatar/ava4.png",
            image: "/images/blog/blog18.jpg",
        },
        {
            id: 19,
            category: "Thời trang",
            title: "Quần jean nam nên chọn kiểu nào để vừa hợp xu hướng vừa dễ phối với nhiều outfit khác",
            author: "Vũ Anh Tuấn",
            date: "10 Thg 1, 2024",
            avatar: "/images/avatar/ava1.png",
            image: "/images/blog/blog19.jpg",
        },
        {
            id: 20,
            category: "Thể thao",
            title: "Phong cách street style nam hiện đại với những gợi ý phối đồ cực chất dành cho giới trẻ",
            author: "Bùi Hải Đăng",
            date: "2 Thg 1, 2024",
            avatar: "/images/avatar/ava6.png",
            image: "/images/blog/blog20.jpg",
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-left-icon lucide-chevrons-left"><path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" /></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-right-icon lucide-chevrons-right"><path d="m6 17 5-5-5-5" /><path d="m13 17 5-5-5-5" /></svg>
                </button>
            </div>
        </div>
    )
}
