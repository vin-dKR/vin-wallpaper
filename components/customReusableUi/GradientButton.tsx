const GradientButton = ({ text }: { text: string }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center top-[20em]">
            {/* Blurred background version */}
            <div className="absolute blur-md bg-gradient-to-b from-white to-black rounded-xl p-4 z-0 scale-105">
                {text}
            </div>

            {/* Foreground main content */}
            <div className="relative z-10 bg-gradient-to-b from-white to-black rounded-xl p-[2px]">
                <div className="bg-gradient-to-br from-white from-5% to-blueBg to-60% px-6 py-2 rounded-xl">
                    <span className="font-bold text-shadow">
                        {text}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default GradientButton
