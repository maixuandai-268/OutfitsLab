"use client"

import { useState } from "react";
import StepInfo from "@/components/seller/steps/StepInfo";
import StepStore from "@/components/seller/steps/StepStore";
import StepConfirm from "@/components/seller/steps/StepConfirm";

export default function BecomePage() {

    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="min-h-screen">

            {step === 1 && (
                <StepInfo nextStep={nextStep} />
            )}

            {step === 2 && (
                <StepStore
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )}

            {step === 3 && (
                <StepConfirm
                    prevStep={prevStep}
                />
            )}

        </div>
    );
}