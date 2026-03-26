interface BlogCardProps {
    blog: {
        id: number;
        title: string;
        author: string;
        image: string;
        category?: string;
        avatar?: string;
        date?: string;
        createdAt?: string;
    }
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:-translate-y-3 transition duration-300 cursor-pointer border border-gray-100 overflow-hidden h-full flex flex-col">
            <div className="m-3 rounded-xl h-48 overflow-hidden bg-gray-50">
                <img
                    src={blog.image || "/images/placeholder.jpg"}
                    alt={blog.title}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-110"
                />
            </div>

            <div className="p-4 pt-1 flex-1 flex flex-col">
                <div>
                    <span className="text-[10px] font-bold text-white bg-pink-500 rounded px-2 py-1 uppercase tracking-wider">
                        {blog.category || "Tin tức"}
                    </span>
                </div>
                <h3 className="font-bold mt-3 text-gray-900 line-clamp-2 hover:text-pink-600 transition-colors flex-1">
                    {blog.title}
                </h3>   
                <div className="flex items-center gap-3 mt-4 text-sm text-gray-500 border-t pt-3 border-gray-50">
                    {blog.avatar ? (
                        <img src={blog.avatar} className="w-8 h-8 rounded-full object-cover shadow-sm" alt="ava" />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-black uppercase">
                            {blog.author?.[0] || "A"}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-[12px] leading-none">{blog.author}</span>
                        <span className="text-[10px] text-gray-400 mt-1">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("vi-VN") : blog.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}