import Header from "@/components/landing2/Header";

export default function Hero() {
    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-[#0C0817]">
            <Header />

            {/* Using grid for perfect centering */}
            <div className="grid place-items-center min-h-screen px-6">
                <div className="text-center"> {/* Adjust -mt-20 based on your header height */}
                    <h1 className="text-white font-bold text-5xl md:text-6xl lg:text-7xl max-w-4xl leading-tight">
                        @vin_wallpaper – Your X account,<br />
                        now an AI factory.
                    </h1>
                </div>
            </div>

        </div>
    );
}
