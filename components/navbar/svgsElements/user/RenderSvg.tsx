import Base from "./Base"
import MiddleSandwich from "../logo/MiddleSandwich"
import Top from "./Top"

const RenderSvgUser = () => {
    return (
        <div className="relative w-15 h-15 scale-80 hidden md:block">
            <Base className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <MiddleSandwich className="absolute mt-[1px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <Top className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
    )
}

export default RenderSvgUser
