interface StepStoreProps {
    storeName: string;
    storeDescription: string;
    primaryCategory: string;
    onChange: (field: string, value: string) => void;
}

export default function StepStore({ storeName, storeDescription, primaryCategory, onChange }: StepStoreProps) {
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

                    <div className="w-[40px] h-[40px] rounded-full bg-[#FFF4E6] text-white flex items-center justify-center">1</div>
                    <span className="text-[#262626]">Your Information</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>


                    <div className="w-[40px] h-[40px] rounded-full bg-[#D19F42] text-white flex items-center justify-center">2</div>
                    <span className="text-[#D19F42]">Store Details</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>


                    <div className="w-[40px] h-[40px] rounded-full bg-[#008080] text-white flex items-center justify-center">3</div>
                    <span className="text-[#262626]">Confirmation</span>
                </div>
            </div>

            <div className="h-fullborder border-[#FFE9CC] bg-[#FFFBF5] p-4">
                <div className="flex justify-center items-center mt-10">
                    <div className="w-[832px] border border-[#FFE9CC] rounded-[24px] bg-white p-10">

                        <h1 className="font-semibold text-[24px]">Shop Details</h1>

                        <div className="mt-4 ">
                            <label htmlFor="Name" className="font-semibold text-[14px]">Store Name</label>
                            <input type="name"
                                placeholder="My Awesome Fashion Store"
                                className="w-full h-[50px] border border-[#FFE9CC] rounded-2xl flex flex-col justify-center bg-[#FFFBF5] pl-10 pr-4" />
                            <h1 className="mt-2 text-gray-500 text-[12px]">This is how customers will see your store</h1>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="Store Description" className="text-[14px] font-semibold">Store Description</label>
                            <input type="text"
                                placeholder="Describe your store..."
                                className="w-full h-[146px] border border-[#FFE9CC] rounded-2xl bg-[#FFFBF5] pl-4 pb-22" />
                            <h1 className="mt-2 text-gray-500 text-[12px]">0/500 characters</h1>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="Primary Category" className="text-[14px] font-semibold">Primary Category</label>
                            <div className="relative w-full">
                                <select
                                    value={primaryCategory}
                                    onChange={(e) => onChange('primaryCategory', e.target.value)}
                                    className="w-full h-[50px] border border-[#FFE9CC] rounded-2xl bg-[#d9d9d9] pl-2 pr-8 appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Choose option...</option>
                                    <option value="clothing">Lựa chọn 1</option>
                                    <option value="accessories">Lựa chọn 2</option>
                                    <option value="shoes">Lựa chọn 3</option>
                                    <option value="bags">Lựa chọn 4</option>
                                </select>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    ▼
                                </span>
                            </div>
                        </div>
                        {/* dòng 4 */}
                        <div className="mt-4">
                            <label className="text-[14px] font-semibold">Store Logo</label>
                            <div className="w-full h-[152px] mt-2 border-2 border-[#FFE9CC] rounded-xl bg-[#FFF4E6] flex flex-col items-center justify-center cursor-pointer">
                                <span className="text-xl">⬆</span>
                                <p className="text-[14px] font-medium">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-[12px] text-gray-600">
                                    PNG, JPG Max 5MB, Square recommended)
                                </p>

                            </div>
                        </div>
                        {/*  dòng 5 */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor="Password" className="block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="Password"
                                        name="Password"
                                        placeholder="••••••••"
                                        className="w-full h-14 pl-5 pr-5 rounded-2xl border border-[#FFE9CC] bg-[#FFFBF5] outline-none text-base transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="ConfirmPassword" className="block mb-2 text-sm font-semibold text-left text-[#2C2C2C]">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="ConfirmPassword"
                                        name="ConfirmPassword"
                                        placeholder="••••••••"
                                        className="w-full h-14 pl-5 pr-5 rounded-2xl border border-[#FFE9CC] bg-[#FFFBF5] outline-none text-base transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        {/* dòng 6 */}



                    </div>
                </div>
            </div>
        </div >
    );
}

