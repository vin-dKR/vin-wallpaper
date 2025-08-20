import Image from "next/image"

const Navbar = () => {
    const navItems = [
        {
            id: 1,
            item: "Features",
        }, {
            id: 2,
            item: "Pricing",
        }, {
            id: 3,
            item: "Showcase",
        },
    ]
    return (
        <div className="flex items-center justify-center space-x-45 w-full t-4 gap-2 mx-auto">
            <Image
                src="/imgs/logo-main.png"
                alt="Main Logo"
                width={45}
                height={45}
                className="object-contain cursor-pointer"
            />

            <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-white to-blue-700 overlow-hidden">
                <div className="flex flex-row gap-20 px-20 py-2 rounded-xl backdrop-blur-3xl bg-gradient-to-b from-white from-2% via-blue-800 to-indigo-900">
                    {navItems.map((navItem) => (
                        <div key={navItem.id} className="text-xl text-shadow-lg cursor-pointer">
                            {navItem.item}
                        </div>
                    ))}
                </div>
            </div>


            <Image
                src="/imgs/user-logo.png"
                alt="User Logo"
                width={45}
                height={45}
                className="object-contain cursor-pointer"
            />
        </div>

    )
}

export default Navbar
