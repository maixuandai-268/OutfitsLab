"use client"

import { useState } from "react"
import BlogCard from "./BlogCard"

export default function BlogList() {
    const blogs = Array(30).fill(0)
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 6
    const totalPages = Math.ceil(blogs.length / postsPerPage)
    const start = (currentPage - 1) * postsPerPage
    const end = start + postsPerPage
    const currentBlogs = blogs.slice(start, end)
    return (
        <div className="mt-1 ">
            <h2 className="text-xl font-semibold mb-6">
                Latest Post
            </h2>
            <div className="grid grid-cols-3 gap-6">
                {currentBlogs.map((_, index) => (
                    <BlogCard key={index} />
                ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-10">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded disabled:opacity-40"
                >
                    ←
                </button>
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1
                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded transition
                ${currentPage === page
                                    ? "bg-black text-white"
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
                    →
                </button>
            </div>
        </div>
    )
}