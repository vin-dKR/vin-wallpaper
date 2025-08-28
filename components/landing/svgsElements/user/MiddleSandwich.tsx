const MiddleSandwich = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <foreignObject x="-102.381" y="-104.127" width="251.508" height="251.508">
                    <div
                        style={{
                            backdropFilter: "blur(52.4px)",
                            clipPath: "url(#bgblur_0_212_24_clip_path)",
                            height: "100%",
                            width: "100%"
                        }}>
                    </div>
                </foreignObject><g filter="url(#filter0_d_212_24)" data-figma-bg-blur-radius="104.795">
                    <rect x="2.41418" y="0.667831" width="41.918" height="41.918" rx="7.33566" fill="url(#paint0_linear_212_24)" />
                </g>
                <defs>
                    <filter id="filter0_d_212_24" x="-102.381" y="-104.127" width="251.508" height="251.508" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="2.0959" />
                        <feGaussianBlur stdDeviation="1.04795" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 0.0588235 0 0 0 0 0.415686 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_212_24" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_212_24" result="shape" />
                    </filter>
                    <clipPath id="bgblur_0_212_24_clip_path" transform="translate(102.381 104.127)"><rect x="2.41418" y="0.667831" width="41.918" height="41.918" rx="7.33566" />
                    </clipPath><linearGradient id="paint0_linear_212_24" x1="23.6352" y1="-8.23975" x2="23.6352" y2="54.8993" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#020F6A" />
                        <stop offset="1" stopColor="#041DD0" />
                    </linearGradient>
                </defs>
            </svg>
        </div >
    )
}

export default MiddleSandwich
