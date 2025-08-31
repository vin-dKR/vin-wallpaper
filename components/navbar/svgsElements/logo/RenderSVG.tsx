import Base from "./Base"
import MiddleSandwich from "./MiddleSandwich"
import Top from "./Top"

const RenderSVGLogo = () => {
    return (
        <div className="relative w-15 h-15 scale-80">
            <Base className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <MiddleSandwich className="absolute mt-[1px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <Top className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
    )
}

export default RenderSVGLogo
