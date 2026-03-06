"use client"
import { useState } from "react";
import StepInfo from "@/components/seller/steps/StepInfo";

export default function BecomPage() {
    const [name, setName] = useState("");
    const [formData, setFormData] = useState({ name: "" });
    return (
        <div className="min-h-screen bg-[#FFFBF5]">
            <StepInfo name={""} />
        </div>
    )
}