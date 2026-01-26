import Header from "@/components/landing2/Header";

export default function Hero() {
    return (
        <div className="relative w-full min-h-[500px] overflow-hidden bg-[#0C0817]">
            <Header />

            <div className="flex items-center justify-center h-full px-6">
                <h1 className="text-white text-center font-bold text-5xl max-w-4xl">
                    @vin_wallpaper – Your X account,<br />
                    now an AI factory.
                </h1>
            </div>

        </div>
    );
}
