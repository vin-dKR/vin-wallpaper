"use client";

import ShinyText from "../ui/ShinyText";

interface GradientButtonProps {
    text: string;
    className?: string;
    onClick: () => void;
    position?: "center" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const GradientButton = ({
    text,
    onClick,
    className,
    position = "center",
}: GradientButtonProps) => {
    const positionClasses: Record<NonNullable<GradientButtonProps["position"]>, string> = {
        center: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        left: "absolute left-0 top-1/2 -translate-y-1/2",
        right: "absolute right-0 top-1/2 -translate-y-1/2",
        "top-left": "absolute left-0 top-0",
        "top-right": "absolute right-0 top-0",
        "bottom-left": "absolute left-0 bottom-0",
        "bottom-right": "absolute right-0 bottom-0",
    };

    return (
        <button
            onClick={onClick}
            className={`${positionClasses[position]} flex flex-col cursor-pointer 
                  transition-transform duration-300 ease-out text-white ${className}`}
        >
            {/* Blurred background */}
            <div className="absolute text-sm md:text-xl blur-lg bg-gradient-to-b from-white to-blueBg rounded-full p-4 z-0 scale-105 transition-all duration-300 ease-out opacity-70">
                {text}
            </div>

            {/* Foreground */}
            <div className="relative text-[8px] md:text-xl z-10 bg-gradient-to-b from-white to-black rounded-xl p-[2px] transition-all duration-300 ease-out">
                <div className="bg-gradient-to-br from-white from-5% to-blueBg to-60% px-6 py-2 rounded-xl">
                    <span className="font-bold text-shadow-xl">
                        <ShinyText
                            text={text}
                            disabled={false}
                            speed={3}
                            className=''
                        />
                    </span>
                </div>
            </div>
        </button>
    );
};

export default GradientButton
