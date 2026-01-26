import HeaderShape from "./HeaderShape";

export default function Header() {
    return (
        <div className="relative w-full">

            {/* Floating POST shape */}
            <div className="absolute left-0 top-0 z-20 pointer-events-none">
                <HeaderShape />
            </div>

            {/* Main Header Bar */}
            <div className="relative z-10 h-20 rounded-full border border-[#0C0817] bg-[#181624]/50 top-2 right-2">
                <div className="rounded-full backdrop-blur-md flex items-center justify-between px-6 text-white h-full">
                    ...
                </div>
            </div>

        </div>
    );
}

