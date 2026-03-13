export default function BlogHero() {
    return (
        <div className="max-w-6xl mx-auto mt-5">
            <div className="relative">
                <a href="https://icondenim.com/blogs/shop-thoi-trang/top-15-shop-ao-local-brand-nam">
                    <img
                        src="/images/Shop.png"
                        className="w-full h-[420px] object-cover rounded-xl"
                    />
                    <div className="absolute left-10 -bottom-16 bg-white p-6 rounded-xl shadow-lg w-[420px]">
                        <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded">
                            Thời trang
                        </span>
                        <h2 className="text-2xl font-bold mt-3">
                            Thời trang nam 4.0: Sau "ăn ngon, mặc đẹp" sẽ là "ăn sạch, mặc xanh"
                        </h2>
                        <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
                            <img
                                src="/images/avatar.png"
                                className="w-8 h-8 rounded-full"
                            />
                            <span>Nguyễn Văn A</span>
                            <span>21 Thg 2, 2025</span>
                        </div>
                    </div>
                </a>
            </div>
            <div className="h-40"></div>
        </div>
    );
}

