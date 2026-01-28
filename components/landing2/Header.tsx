import StarSvg from "../ui/landing-2/Star";
import HeaderShape from "./HeaderShape";

export default function Header() {
    return (
        <div className="relative w-full">

            {/* Floating POST shape */}
            <div className="absolute left-0 top-0 z-20 pointer-events-none">
                <HeaderShape />
            </div>

            {/* Main Header Bar */}
            <div className="relative z-10 h-20 rounded-full border border-[#0C0817] bg-gradient-to-r from-[#181624]/50 to-[#1a1728]/70 backdrop-blur-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] top-2 right-2">
                <div className="flex flex-row w-full h-full justify-between items-center !px-4">
                    {/* Left section - empty for now */}
                    <div className="w-20"></div>

                    {/* Center navigation */}
                    <div className="flex items-center h-full justify-center gap-14">
                        <a href="#" className="relative group">
                            <span className="text-gray-300 text-lg font-medium tracking-wide group-hover:text-white transition-all duration-300 ease-out">
                                Home
                            </span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                        </a>
                        <a href="#" className="relative group">
                            <span className="text-gray-300 text-lg font-medium tracking-wide group-hover:text-white transition-all duration-300 ease-out">
                                APIs
                            </span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                        </a>
                    </div>

                    {/* Right section */}
                    <div className="flex flex-row items-center gap-8">
                        {/* Star rating */}
                        <div className="flex items-center gap-3 !px-3 !py-2 rounded-full bg-gradient-to-r from-[#0C0817]/50 to-[#151222]/50 border border-gray-800/50 backdrop-blur-sm">
                            <div className="relative">
                                <StarSvg />
                                <div className="absolute inset-0 animate-pulse bg-yellow-500/20 rounded-full blur-sm"></div>
                            </div>
                            <span className="text-yellow-300 font-bold text-lg tracking-wider drop-shadow-[0_2px_4px_rgba(255,215,0,0.3)]">
                                20
                            </span>
                        </div>

                        {/* 𝕏 in circle - centered with cool effects */}
                        <div className="relative group">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-black via-gray-900 to-gray-800 border-2 border-gray-700/50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6),_0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:border-blue-500/70 group-hover:shadow-[inset_0_2px_12px_rgba(29,161,242,0.2),_0_0_24px_rgba(29,161,242,0.3)]">
                                <span className="text-2xl font-bold text-white tracking-tighter leading-none drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">
                                    𝕏
                                </span>
                            </div>
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 w-14 h-14 rounded-full bg-blue-500/0 group-hover:bg-blue-500/20 blur-xl transition-all duration-500 -z-10"></div>
                            {/* Ring effect */}
                            <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-transparent group-hover:border-blue-500/30 transition-all duration-500 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
