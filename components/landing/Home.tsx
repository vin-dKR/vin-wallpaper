import Navbar from "../navbar/Navbar";
import Pattern from "./Dots";

export default function Home() {
    return (
        <div className="relative bg-blueBg relative mx-auto w-[94vw] md:w-[98vw] h-[90vh] md:h-[95vh] rounded-b-4xl overflow-hidden ">
            <div className="absolute inset-0 border border-t-blueBg border-black/90 m-[1px] rounded-b-4xl" />
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    WebkitMaskImage:
                        "radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "cover",
                    maskImage:
                        "radial-gradient(circle at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
                    maskRepeat: "no-repeat",
                    maskSize: "cover",
                }}
            >
                {/* Glow blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blueBg w-350 h-120 blur-[200px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blueBg w-350 h-120 blur-[200px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 w-350 h-120 blur-[200px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 w-150 h-60 blur-[200px]" />
                    <div className="absolute top-[10%] left-[15%] bg-blueBg w-[300px] h-[120px] rounded-full blur-[180px]" />
                    <div className="absolute top-[5%] right-[10%] bg-blueBg w-[260px] h-[100px] rounded-full blur-[150px]" />
                    <div className="absolute bottom-[8%] left-[12%] bg-blueBg w-[400px] h-[160px] rounded-full blur-[220px]" />
                    <div className="absolute bottom-[5%] right-[8%] bg-white w-[280px] h-[120px] rounded-full blur-[180px]" />
                    <div className="absolute bottom-[-20%] left-1/4 bg-blueBg w-300 h-100 rounded-full blur-[100px]" />
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 bg-blueBg w-[320px] h-[140px] rounded-full blur-[200px]" />
                </div>
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-350 h-180 md:h-220 blur-[200px]" />

                {/* Pattern on top */}
                <Pattern />
            </div>

            <div className="relative mt-5">
                <Navbar />
            </div>
        </div>

    )
}
