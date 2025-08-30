"use client"

interface GradientButtonProps {
    text: string
    className?: string
    onClick: () => void
}

const GradientButton = ({ text, onClick, className }: GradientButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`absolute left-1/2 top-2/3 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer 
                       transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-1 ${className}`}>

            {/* Blurred background version */}
            <div className="absolute text-[5px] md:text-xl blur-lg bg-gradient-to-b from-white to-blueBg rounded-full p-4 z-0 scale-105 transition-all duration-300 ease-out hover:scale-125 opacity-70">
                {text}
            </div>

            {/* Foreground main content */}
            <div className="relative text-[5px] md:text-xl z-10 bg-gradient-to-b from-white to-black rounded-xl p-[2px] transition-all duration-300 ease-out">
                <div className="bg-gradient-to-br from-white from-5% to-blueBg to-60% px-6 py-2 rounded-xl">
                    <span className="font-bold text-shadow-xl">
                        {text}
                    </span>
                </div>
            </div>
        </button>
    )
}

export default GradientButton
