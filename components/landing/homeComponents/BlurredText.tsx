const BlurredText = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-center flex-col md:flex-row gap-0 md:gap-6 py-4 rounded-xl text-lg md:text-[5vw] font-epilougeThin">
            {/* First word with blur */}
            <div className="relative text-blur">
                <span
                    className="text-[clamp(1em,5vw,90px)] text-white relative z-5"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 30%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, white 0%, white 50%, transparent 100%)',
                    }}
                >
                    quick
                </span>
                <div
                    className="absolute top-0 left-0 text-[clamp(1em,5vw,90px)] text-white pointer-events-none w-full"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 20%, white 100%)',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, white 50%, white 100%)',
                        filter: 'blur(4px)',
                        zIndex: 5,
                    }}
                >
                    quick
                </div>
            </div>


            {/* Middle parallelogram */}
            <span className="parallelogram">
                <span className="parallelogram-text pl-1 pr-2 lg:pr-4 italic text-[clamp(1em,5vw,90px)]">x.com</span>
            </span>

            {/* Last word with blur */}
            <div className="relative text-blur">
                <span
                    className="text-[clamp(1em,5vw,90px)] text-white relative z-5"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 30%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, white 0%, white 50%, transparent 100%)',
                    }}
                >
                    image bot
                </span>
                <div
                    className="absolute top-0 left-0 text-[clamp(1em,5vw,90px)] text-white pointer-events-none w-full"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 20%, white 100%)',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, white 50%, white 100%)',
                        filter: 'blur(4px)',
                        zIndex: 5,
                    }}
                >
                    image bot
                </div>
            </div>
        </div>
    </div>
);

export default BlurredText;

