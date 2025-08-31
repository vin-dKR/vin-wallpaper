"use client"

import dynamic from "next/dynamic"
import GradientButton from "../customReusableUi/GradientButton"

const Pattern = dynamic(() => import("../landing/homeComponents/Dots"), { ssr: false })

const CTADetails = () => {
    return (
        <div className="mt-40">
            <h1 className="text-center text-xl md:text-5xl text-black font-black">Integrate in just 1 step</h1>

            <div className="relative mt-10 h-200 rounded-4xl overflow-hidden border-2">
                <div className="absolute inset-0 z-10 opacity-20 sm:opacity-10">
                    <Pattern />
                </div>
                <div className="absolute -bottom-[50%] left-[0%] bg-blueBg w-[60vw] h-[100vh] rounded-full blur-[10vh]" />
                <div className="absolute bottom-[0%] left-[0%] bg-blueBg w-[30vw] h-[60vh] rounded-full blur-[10vh]" />

                <div className="absolute block sm:hidden top-[0%] left-[0%] bg-blueBg w-[30vw] h-[60vh] rounded-full blur-[10vh]" />
                <div className="absolute block sm:hidden top-[0%] left-[10%] bg-blueBg w-[30vw] h-[60vh] rounded-full blur-[10vh]" />
                <div className="absolute block sm:hidden top-[0%] left-[20%] bg-blueBg w-[40vw] h-[60vh] rounded-full blur-[10vh]" />
                <div className="absolute block sm:hidden top-[0%] right-[0%] bg-blueBg w-[50vw] h-[60vh] rounded-full blur-[10vh]" />
                <div className="absolute block sm:hidden top-[0%] left-[0%] bg-white w-[20vw] h-[30vh] rounded-full blur-[10vh]" />
                <div className="absolute block sm:hidden -top-[0%] left-[0%] bg-white w-[20vw] h-[30vh] rounded-full blur-[10vh]" />
                <div className="absolute block sm:hidden -bottom-[50%] left-[0%] bg-black w-[30vw] h-[40vh] rounded-full blur-[0vh]" />

                <div className="absolute top-[0%] left-[10%] bg-white w-[20vw] h-[30vh] rounded-full blur-[20vh]" />

                <div className="absolute -bottom-[50%] left-[0%] bg-blueBg w-[50vw] h-[80vh] rounded-full blur-[5vh]" />
                <div className="absolute -bottom-[50%] left-[0%] bg-blueBg w-[40vw] h-[60vh] rounded-full blur-[5vh]" />
                <div className="absolute -bottom-[50%] left-[0%] bg-blueBg w-[30vw] h-[60vh] rounded-full blur-[5vh]" />
                <div className="absolute -bottom-[50%] left-[0%] bg-blueBg w-[30vw] h-[60vh] rounded-full blur-[5vh]" />
                <div className="absolute -bottom-[50%] left-[0%] bg-blueBg w-[30vw] h-[60vh] rounded-full blur-[5vh]" />
                <div className="absolute -bottom-[50%] left-[10%] bg-black/80 w-[40vw] h-[80vh] rounded-full blur-[20vh]" />
                <div className="absolute -bottom-[50%] left-[10%] bg-black/80 w-[40vw] h-[80vh] rounded-full blur-[20vh]" />
                <div className="absolute -bottom-[50%] right-[0%] bg-blueBg w-[40vw] h-[70vh] rounded-full blur-[20vh]" />
                <div className="absolute -bottom-[50%] right-[0%] bg-blueBg w-[40vw] h-[60vh] rounded-full blur-[10vh]" />



                <div className="relative z-20 h-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 px-2 md:px-10 py-10 md:py-20 h-full">
                        <div className="col-span-2 py-10 md:py-20 px-10 md:px-30">
                            <h1 className="text-3xl md:text-6xl text-white text-shadow-md font-bold">Your Bot is Ready. Just Plug In Your 𝕏 Keys.</h1>

                            <p className="text-xl md:text-3xl mt-10 md:mt-20 text-shadow-md">We handle everything. All you need is your 𝕏 API Token & Secret Key — you&apos;re good to go.</p>

                            <div className="relative w-full bg-gray-200 mt-25">
                                <GradientButton
                                    text="integrate bot to your X account"
                                    position="left"
                                    onClick={() => alert("Left!")}
                                />
                            </div>
                        </div>

                        <div className="">
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CTADetails
