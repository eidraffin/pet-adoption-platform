interface CustomButtonProps {
    label: string;
    className?: string;
    onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onClick

}) => {

    return (
        
        <div 
            onClick={onClick}
            className={`w-full py-4 bg-sky-950 hover:bg-black text-white text-center rounded-xl transition cursor-pointer ${className} transition-transform hover:scale-105`}
        >
            {label}

        </div>
    )
}

export default CustomButton;