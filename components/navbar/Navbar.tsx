"use client"
import { useState } from "react"
import RenderSVGLogo from "./svgsElements/logo/RenderSVG"
import RenderSvgUser from "./svgsElements/user/RenderSvg"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { id: 1, item: "Features" },
        { id: 2, item: "Pricing" },
        { id: 3, item: "Showcase" },
    ]

    return (
        <nav className="w-full px-4 bg-transparent">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Left Logo */}
                <RenderSVGLogo />

                {/* Desktop Menu */}
                <div className="hidden md:flex relative rounded-xl p-[1px] bg-gradient-to-b from-white to-blue-950">
                    <div className="flex flex-row gap-20 px-20 py-2 rounded-xl backdrop-blur-3xl bg-gradient-to-b from-white/50 via-blue-800 to-indigo-900">
                        {navItems.map((navItem) => (
                            <div
                                key={navItem.id}
                                className="text-xl cursor-pointer hover:text-blue-300 transition"
                            >
                                {navItem.item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right User Icon (always visible) */}
                <RenderSvgUser />

                {/* Hamburger for Mobile */}
                <button
                    className="md:hidden flex flex-col space-y-1 ml-4"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                </button>
            </div>

            {/* Mobile Menu (dropdown) */}
            {isOpen && (
                <div className="md:hidden mt-3 flex flex-col items-center gap-4 rounded-xl backdrop-blur-3xl bg-gradient-to-b from-white/50 via-blue-800 to-indigo-900 py-4">
                    {navItems.map((navItem) => (
                        <div
                            key={navItem.id}
                            className="text-lg cursor-pointer hover:text-blue-300 transition"
                        >
                            {navItem.item}
                        </div>
                    ))}
                </div>
            )}
        </nav>
    )
}

export default Navbar
