interface StepInfoProps {
    nextStep: () => void;
}
export default function StepInfo({ nextStep }: StepInfoProps) {
    return (
        <div className="mt-0.5 bg-white">
            <div className="w-full flex flex-col">
                <p className="ml-[348px] mt-3 text-[36px] font-bold text-[#262626]">
                    Mở cửa hàng của bạn trên OutfitsLab
                </p>
                <p className="ml-[348px] mt-1 mb-6 text-[16px] text-[#4d4d4d]">
                    Tham gia cùng hàng ngàn nhà sáng tạo khác và bắt đầu bán các thiết kế của bạn.
                </p>
            </div>

            <div className=" w-full h-[89px] bg-white flex flex-col justify-center">
                <div className="ml-[473px] flex items-center gap-1">

                    <div className="w-[40px] h-[40px] rounded-full bg-[#D19F42] text-white flex items-center justify-center">1</div>
                    <span className="text-[#D19F42]">Thông tin của bạn</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>

                    <div className="w-[40px] h-[40px] rounded-full bg-[#008080] text-white flex items-center justify-center">2</div>
                    <span className="text-[#262626]">Chi tiết cửa hàng</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>

                    <div className="w-[40px] h-[40px] rounded-full bg-[#008080] text-white flex items-center justify-center">3</div>
                    <span className="text-[#262626]">Xác nhận thông tin</span>
                </div>
            </div>
            {/* dòng 2 */}
            <div className="min-h-screen border border-[#FFE9CC] bg-gradient-to-r from-[#FFEAFD] to-[#BFFFF7] p-4 max-h-full">
                <div className="flex justify-center items-center mt-10 ">
                    <div className="w-[832px] h-[566px] border border-[#FFE9CC] rounded-[24px] bg-white p-10">

                        <h1 className="font-semibold text-[24px]">Thông tin của bạn</h1>

                        <div className="grid grid-cols-2 gap-7 w-full mt-[50px]">
                            <div className="flex flex-col items-start gap-1 mb-4">
                                <label htmlFor="First Name" className="mb-1 text-[14px] block font-semibold">Họ</label>
                                <input type="text"
                                    placeholder="Nguyễn Văn"
                                    className="w-full h-[50px] rounded-[16px] border border-[#FFE9CC] bg-[#FFFBF5] px-4 py-2 "
                                />
                            </div>
                            <div className="flex flex-col items-start gap-1 mb-4">
                                <label htmlFor="Last Name" className="mb-1 text-[14px] block font-semibold">Tên</label>
                                <input type="text"
                                    placeholder="A"
                                    className="w-full h-[50px] rounded-[16px] border border-[#FFE9CC] bg-[#FFFBF5] px-4 py-2 "
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-7 w-full mt-1">
                            <div className="flex flex-col items-start gap-1 mb-4">
                                <label htmlFor="Email Address" className="mb-1 text-[14px] block font-semibold">Email</label>
                                <input type="email"
                                    placeholder="you@gmail.com"
                                    className="w-full h-[50px] rounded-[16px] border border-[#FFE9CC] bg-[#FFFBF5] px-4 py-2 "
                                />
                            </div>
                            <div className="flex flex-col items-start gap-1 mb-4">
                                <label htmlFor="Phone Number" className="mb-1 text-[14px] block font-semibold">Số điện thoại</label>
                                <input type="number"
                                    placeholder="+84 123 456 789"
                                    className="w-full h-[50px] rounded-[16px] border border-[#FFE9CC] bg-[#FFFBF5] px-4 py-2 "
                                />
                            </div>
                        </div>

                        <div className="w-full h-[118px] flex flex-col justify-center border border-[#FFE9CC] bg-[#FFF4E6] rounded-2xl px-6">
                            <h1 className="font-semibold text-[30px]">Lý do chúng tôi cần thông tin</h1>
                            <p className="text-gray-500 text-[14px]">Chúng tôi sử dụng thông tin của bạn để tạo tài khoản người bán và giúp khách hàng liên hệ với bạn về các giao dịch mua hàng của họ.</p>
                        </div>

                        <h1 className="mt-8">
                            <button onClick={nextStep}
                                className="text-center text-white flex flex-col justify-center mt-3 border border-[#BD8928] bg-[#BD8928] rounded-full  w-full h-[50px]">
                                Tiếp tục bước tiếp theo →
                            </button>
                        </h1>

                    </div>
                </div>
            </div>
        </div>
    );
}