import CircularGallery from "../ui/CircularGallery"

const Gallary = () => {
    return (
        <div className="w-full bg-gradient-to-t from-blue-800 to-transparent mt-30 h-220 rounded-4xl overflow-hidden">
            <CircularGallery bend={2} textColor="#ffffff" borderRadius={0.04} scrollEase={0.02} />
        </div>
    )
}

export default Gallary
