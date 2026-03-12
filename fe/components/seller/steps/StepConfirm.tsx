interface StepStoreProps {
    storeName: string;
    storeDescription: string;
    primaryCategory: string;
    onChange: (field: string, value: string) => void;
    prevStep: () => void;
}
export default function StepStore({ storeName, storeDescription, primaryCategory, onChange, prevStep }: StepStoreProps) {
    return (
        <div className="bg-white mt-0.5r">
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


                    <div className="w-[40px] h-[40px] rounded-full bg-[#FFF4E6] text-white flex items-center justify-center">2</div>
                    <span className="text-[#262626]">Store Details</span>

                    <div className="ml-4 mr-4 w-[32px] h-[2px] bg-[#FFE9CC]"></div>


                    <div className="w-[40px] h-[40px] rounded-full bg-[#D19F42] text-white flex items-center justify-center">3</div>
                    <span className="text-[#D19F42]">Confirmation</span>
                </div>
            </div>
            <div className="flex flex-col items-center bg-[#E8FFF0]">
                <div className="w-16 h-16 mt-10 flex items-center justify-center rounded-full bg-teal-600 text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>
                </div>
                <h2 className="text-2xl font-semibold mt-6">
                    Welcome to OutfitsLab!
                </h2>

                <p className="text-gray-500 mt-2">
                    Your store <span className="font-medium">"dsfasdf"</span> has been created successfully.
                </p>
                <div className="mt-6 border border-orange-200 rounded-xl p-6 text-center w-[420px] bg-white">
                    <p className="text-gray-400 text-sm mb-1">
                        Email Confirmation
                    </p>
                    <p className="font-semibold mb-2">
                        fsdfads
                    </p>
                    <p className="text-gray-400 text-sm">
                        Check your email for account verification and setup instructions
                    </p>
                </div>

                <div className="flex flex-col gap-4 mt-6 w-[420px]">
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-full font-medium">
                        Start Adding Products
                    </button>
                    <button
                        type="button"
                        onClick={prevStep}
                        className="border border-yellow-600 text-yellow-600 py-3 rounded-full font-medium hover:bg-yellow-50">
                        Back to Home
                    </button>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 mt-8 w-[420px]">
                    <h3 className="font-semibold text-lg mb-3">
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li>✅ Complete your store setup</li>
                        <li>→ Upload your first 3D models and products</li>
                        <li>→ Set up your store branding</li>
                        <li>→ Go live and start selling!</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

