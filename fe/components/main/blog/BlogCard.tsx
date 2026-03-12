

export default function BlogCard() {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-3 transition duration-300 cursor-pointer">
            <a href="https://icondenim.com/blogs/shop-thoi-trang/top-15-shop-ao-local-brand-nam"
                target="_blank"
                rel="noopener noreferrer">

                <img
                    src="/images/sanpham.png"
                    className="w-full h-[160px] object-cover"
                />
                <div className="p-4">
                    <span className="text-xs text-blue-500">
                        Technology
                    </span>
                    <h3
                        className="font-semibold mt-2 hover:text-red-300">
                        The Impact of Technology on the Workplace: How Technology is Changing
                    </h3>
                    <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
                        <img
                            src="/images/avatar1.png"
                            className="w-8 h-8 rounded-full"
                        />
                        <span>Jason Francisco</span>
                        <span>August 20, 2022</span>
                    </div>
                </div>
            </a>
        </div>
    );
}