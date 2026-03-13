interface BlogCardProps {
    blog: {
        id: number
        title: string
        author: string
        image: string
    }
}
export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:-translate-y-3 transition duration-300 cursor-pointer">
            <a href="https://icondenim.com/blogs/shop-thoi-trang/top-15-shop-ao-local-brand-nam"
                target="_blank"
                rel="noopener noreferrer">
                <div className="m-3 rounded-xl h-48 overflow-hidden">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full rounded-xl object-cover"
                    />
                </div>

                <div className="p-4">
                    <span className="text-xs text-white bg-pink-500 rounded px-2 py-1">
                        {blog.category}
                    </span>
                    <h3
                        className="font-semibold mt-2 hover:text-red-300">
                        {blog.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
                        <img
                            src={blog.avatar}
                            className="w-8 h-8 rounded-full"
                        />
                        <span>{blog.author}</span>
                        <span>{blog.date}</span>
                    </div>
                </div>
            </a>
        </div>
    );
}