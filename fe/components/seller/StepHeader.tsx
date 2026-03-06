import Image from "next/image";

export default function StepHeader() {
    return (
        <header className="w-full bg-[#FFFBF5] border-b border-[#FFE9CC]">
            <div className="h-[74px] max-w-7xl mx-auto px-6 flex items-center justify-center">
                <Image
                    src="/images/logo.png"
                    alt="OutfitsLab"
                    width={260}
                    height={50}
                    priority
                    className="object-contain"
                />
            </div>
        </header>
    );
}
