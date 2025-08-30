import GradientButton from "../customReusableUi/GradientButton";
import Navbar from "../navbar/Navbar";
import BlurredText from "./homeComponents/BlurredText";
import Pattern from "./homeComponents/Dots";
import TagMessges from "./homeComponents/TagMessage";

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
                    {/* Center big glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blueBg w-[60vw] h-[40vh] blur-[8vh] rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 w-[65vw] h-[15vh] blur-[10vh] rounded-full" />

                    {/* Corner glows */}
                    <div className="absolute top-[10%] left-[15%] bg-blueBg w-[30vw] h-[17vh] rounded-full blur-[5vh]" />
                    <div className="absolute top-[5%] right-[10%] bg-blueBg w-[22vw] h-[10vh] rounded-full blur-[4vh]" />
                    <div className="absolute bottom-[8%] left-[12%] bg-blueBg w-[28vw] h-[14vh] rounded-full blur-[5vh]" />
                    <div className="absolute bottom-[5%] right-[8%] bg-white w-[22vw] h-[10vh] rounded-full blur-[12vh]" />

                    {/* Bottom big glow */}
                    <div className="absolute bottom-[-10%] left-1/4 bg-blueBg w-[26vw] h-[12vh] rounded-full blur-[10vh]" />

                    {/* Top center */}
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 bg-blueBg w-[28vw] h-[12vh] rounded-full blur-[5vh]" />
                </div>

                {/* Background white glow */}
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white w-[40vw] h-[30vh] md:h-[40vh] blur-[15vh]" />


                {/* Pattern on top */}
                <Pattern />
            </div>

            <div className="relative mt-5">
                <Navbar />
            </div>


            <TagMessges />
            <BlurredText />
            <GradientButton text="Integrate your X account now" />

        </div>

    )
}
