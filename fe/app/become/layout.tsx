import React from "react";
import Footer from "@/components/seller/steps/StepInfo";
import StepHeader from "@/components/seller/StepHeader";

export default function BecomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <StepHeader />
            {children}

        </div>
    );
}