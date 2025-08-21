const MiddleSandwich = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <foreignObject x="-122.706" y="-125.172" width="302.413" height="302.413"><div style={{ backdropFilter: "blur(63px)", clipPath: "url(#bgblur_0_21_20_clip_path)", height: "100%", width: "100%" }}></div></foreignObject><g filter="url(#filter0_d_21_20)" data-figma-bg-blur-radius="126.005">
                    <rect x="3.29893" y="0.833771" width="50.4021" height="50.4021" rx="8.82037" fill="url(#paint0_linear_21_20)" />
                </g>
                <defs>
                    <filter id="filter0_d_21_20" x="-122.706" y="-125.172" width="302.413" height="302.413" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="2.52011" />
                        <feGaussianBlur stdDeviation="1.26005" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.00784314 0 0 0 0 0.0588235 0 0 0 0 0.415686 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_21_20" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_21_20" result="shape" />
                    </filter>
                    <clipPath id="bgblur_0_21_20_clip_path" transform="translate(122.706 125.172)"><rect x="3.29893" y="0.833771" width="50.4021" height="50.4021" rx="8.82037" />
                    </clipPath><linearGradient id="paint0_linear_21_20" x1="28.815" y1="-9.87669" x2="28.815" y2="66.0415" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#020F6A" />
                        <stop offset="1" stopColor="#041DD0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}

export default MiddleSandwich
