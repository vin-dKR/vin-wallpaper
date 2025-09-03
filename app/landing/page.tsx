"use client"

import Home from "@/components/landing/Home";
import CTADetails from "@/components/ctaDetails/CTADetails";
import Gallary from "@/components/gallary/Gallary";

export default function Page() {
    return (
        <div className="bg-white h-full flex flex-col justify-center px-2 md:px-4">
            <Home />
            <CTADetails />
            <Gallary />
        </div>
    )
}
