import Image from "next/image"

const Top = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <Image
                src="/imgs/User.png"
                alt="user png"
                width={20}
                height={20}
                className="w-auto scale-210"
            />
        </div>
    )
}

export default Top
