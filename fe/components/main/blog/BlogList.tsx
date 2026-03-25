"use client"
import { useState, useEffect } from "react"
import BlogCard from "./BlogCard"

const staticBlogs = [
    { id: 101, category: "Thời trang", title: "Gợi Ý Các Phụ Kiện Hoàn Hảo Khi Phối Đồ Với Giày Thể Thao Nam", author: "Nguyễn Hùng Hải", date: "21 Thg 2, 2026", avatar: "/images/avatar/ava1.png", image: "/images/blog/blog1.jpg" },
    { id: 102, category: "Thể thao", title: "Bật mí cách phối đồ với giày jordan nam thu hút mọi ánh nhìn", author: "Trần Nhật Minh", date: "14 Thg 1, 2026", avatar: "/images/avatar/ava2.png", image: "/images/blog/blog2.jpg" },
    { id: 103, category: "Thời trang", title: "Top Những Mẫu Áo Khoác Hoodie Cặp Nam Nữ Siêu Cute", author: "Phạm Gia Hùng", date: "23 Thg 12, 2025", avatar: "/images/avatar/ava3.png", image: "/images/blog/blog3.jpg" },
    { id: 104, category: "Đời sống", title: "Độ Bền Và Sự Ấm Áp Đầy Mê Hoặc Của Áo Hoodie Nam Siêu Dày", author: "Lê Hồng Lan", date: "2 Thg 11, 2025", avatar: "/images/avatar/ava4.png", image: "/images/blog/blog4.jpg" },
    { id: 105, category: "Thời trang", title: "Local Brand Có Hoodie Đẹp Nhất ở Sài Gòn Thời Điểm Hiện Tại", author: "Đặng Anh Tuấn", date: "25 Thg 10, 2025", avatar: "/images/avatar/ava5.png", image: "/images/blog/blog5.jpg" },
    { id: 106, category: "Thời trang", title: "Các phong cách thời trang nam HOT nhất 2025: Tìm gu chuẩn", author: "Bùi Hải Nam", date: "16 Thg 10, 2025", avatar: "/images/avatar/ava6.png", image: "/images/blog/blog6.jpg" },
];

export default function BlogList() {
    const [allBlogs, setAllBlogs] = useState<any[]>(staticBlogs);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        const savedData = localStorage.getItem("outfitslab_full_storage");
        if (savedData) {
            const adminBlogs = JSON.parse(savedData);
            setAllBlogs([...adminBlogs, ...staticBlogs]);
        }
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
                </button>
            </div>
        </div>
    )
}