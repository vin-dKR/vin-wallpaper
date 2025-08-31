const MiddleSandwich = ({ className }: { className: string }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="w-[56px] h-[55px] bg-gradient-to-b from-[#020F6A] to-[#041DD0] rounded-xl" />
        </div>
    )
}

export default MiddleSandwich
