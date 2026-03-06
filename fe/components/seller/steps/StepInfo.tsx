interface StepInfoProps {
    name: string;
}
export default function StepInfo({ name }: StepInfoProps) {
    return (
        <div className="mt-0.5 bg-white">
            <div className="w-full flex flex-col">
                <p className="ml-[348px] mt-3 text-[36px] font-bold text-[#262626]">
                    Open your outfitslab store
                </p>
                <p className="ml-[348px] mt-1 mb-6 text-[16px] text-[#4d4d4d]">
                    Join thousands of creators and start selling your designs
                </p>
            </div>

            <div className=" w-full h-[89px] border border-[#FFE9CC] bg-white flex flex-col justify-center">
                <div className="ml-[473px] flex items-center gap-1">

                    <div className="w-[40px] h-[40px] rounded-full bg-[#D19F42] text-white flex items-center justify-center">1</div>
                    <span className="text-[#D19F42]">Your Information</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>

                    <div className="w-[40px] h-[40px] rounded-full bg-[#008080] text-white flex items-center justify-center">2</div>
                    <span className="text-[#262626]">Store Details</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>

                    <div className="w-[40px] h-[40px] rounded-full bg-[#008080] text-white flex items-center justify-center">3</div>
                    <span className="text-[#262626]">Confirmation</span>
                </div>
            </div>

            <div className="h-fullborder border-[#FFE9CC] bg-[#E8FFF0] p-4">
                <div className="flex justify-center items-center mt-10">
                    <div className="w-[832px] h-[566] border border-[#FFE9CC] rounded-[24px] bg-white p-10">

                        <h1 className="font-semibold text-[24px]">Your Information</h1>

                        <div className="grid grid-cols-2 gap-7 w-full mt-[50px]">
                            <div className="flex flex-col items-start gap-1 mb-4">
                                <label htmlFor="First Name" className="mb-1 text-[14px] block font-semibold">First Name</label>
                                <input type="text"
                                    placeholder="John"
                                    className="w-full h-[50px] rounded-[16px] border border-[#FFE9CC] bg-[#FFFBF5] px-4 py-2 "
                                />
                            </div>
                            <div className="flex flex-col items-start gap-1 mb-4">
                                <label htmlFor="Last Name" className="mb-1 text-[14px] block font-semibold">Last Name</label>
                                <input type="text"
                                    placeholder="Doe"
                                    className="w-full h-[50px] rounded-[16px] border border-[#FFE9CC] bg-[#FFFBF5] px-4 py-2 "
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-7 w-full mt-1">
                            <div className="flex flex-col items-start gap-1 mb-4">
                                <label htmlFor="Email Address" className="mb-1 text-[14px] block font-semibold">Email Address</label>
                                <input type="email"
                                    placeholder="you@example.com"
                                    className="w-full h-[50px] rounded-[16px] border border-[#FFE9CC] bg-[#FFFBF5] px-4 py-2 "
                                />
                            </div>
                            <div className="flex flex-col items-start gap-1 mb-4">
                                <label htmlFor="Phone Number" className="mb-1 text-[14px] block font-semibold">Phone Number</label>
                                <input type="number"
                                    placeholder="+1 (555) 123-4567"
                                    className="w-full h-[50px] rounded-[16px] border border-[#FFE9CC] bg-[#FFFBF5] px-4 py-2 "
                                />
                            </div>
                        </div>

                        <div className="w-full h-[118px] flex flex-col justify-center border border-[#FFE9CC] bg-[#FFF4E6] rounded-2xl px-6">
                            <h1 className="font-semibold text-[30px]">Why we need this</h1>
                            <p className="text-gray-500 text-[14px]">We use your information to create your seller account and help customers contact you about their purchases.</p>
                        </div>

                        <h1 className="mt-8 border border-[#BD8928] bg-[#BD8928] rounded-full  w-full h-[50px]">

                            <a href="StepStore" className="text-center text-white flex flex-col justify-center mt-3">Continue to Store Details →</a>
                        </h1>

                    </div>
                </div>
            </div>
        </div>
    );
}