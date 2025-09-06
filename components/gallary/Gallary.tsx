import Pattern from "../landing/homeComponents/Dots"
import CircularGallery from "../ui/CircularGallery"
import Noise from "../ui/Noise"

const Gallary = () => {
    return (
        <div className="relative w-full bg-gradient-to-t from-blue-800 to-transparent mt-30 h-220 rounded-4xl overflow-hidden z-0">
            <div className="relative w-full h-full rounded-4xl overflow-hidden z-0">
                <div className="absolute inset-0 z-1 opacity-20 sm:opacity-10">
                    <Pattern />
                </div>

                {/* Group for gradients + noise */}
                <div className="absolute inset-0 z-0">
                    {/* White glow - top left */}
                    <div className="absolute top-0 left-0 h-[50%] w-[50%] 
                        bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,1),transparent_70%)] 
                        backdrop-blur-3xl pointer-events-none z-10" />

                    {/* White glow - top right */}
                    <div className="absolute top-0 right-0 h-[50%] w-[50%] 
                        bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,1),transparent_70%)] 
                        backdrop-blur-3xl pointer-events-none z-10" />

                    {/* Strong main radial gradient (blue) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[200%] w-full 
                        bg-[radial-gradient(circle_at_center,rgba(26,20,203,0.7),transparent_70%)] 
                        backdrop-blur-3xl z-20" />

                    {/* Larger, softer gradient */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[250%] w-full 
                        bg-[radial-gradient(circle_at_center,rgba(26,20,203,0.4),transparent_80%)] 
                        backdrop-blur-3xl z-30" />

                    {/* Even larger, faint glow */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[300%] w-full 
                        bg-[radial-gradient(circle_at_center,rgba(26,20,203,0.2),transparent_90%)] 
                        backdrop-blur-3xl z-40" />

                    <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[300%] w-full 
                        bg-[radial-gradient(circle_at_center,rgba(26,20,203,0.2),transparent_90%)] 
                        backdrop-blur-3xl z-40" />

                    <div className="absolute -bottom-[50%] right-[40%] bg-blueBg w-[60vw] h-[90vh] rounded-full blur-[5vh] z-[40]" />
                    <div className="absolute -bottom-[50%] right-[50%] bg-blueBg w-[60vw] h-[90vh] rounded-full blur-[5vh] z-[40]" />
                    <div className="absolute -bottom-[50%] right-[60%] bg-blueBg w-[60vw] h-[90vh] rounded-full blur-[5vh] z-[40]" />
                    <div className="absolute -bottom-[50%] left-[70%] bg-blueBg w-[60vw] h-[90vh] rounded-full blur-[5vh] z-[40]" />
                    <div className="absolute -bottom-[50%] left-1/2 -translate-x-1/2 bg-blueBg w-[70vw] h-[120vh] rounded-full blur-[20vh] z-[40]" />

                    {/* ===== Dark glow at bottom middle ===== */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[100%] w-[100%] 
                        bg-[radial-gradient(circle_at_bottom,rgba(26,20,203,0.3),transparent_90%)] 
                         z-40 pointer-events-none" />

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[100%] w-[100%] 
                        bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.3),transparent_70%)] 
                        backdrop-blur-md z-40 pointer-events-none" />

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[100%] w-[100%] 
                        bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.5),transparent_80%)] 
                        backdrop-blur-2xl z-40 pointer-events-none" />

                    {/* Noise overlay ONLY on gradients */}
                </div>

                <div className="relative h-full w-full z-100">
                    <CircularGallery bend={2} textColor="#ffffff" borderRadius={0.04} scrollEase={0.02} />
                </div>
            </div>
        </div>
    )
}

export default Gallary

