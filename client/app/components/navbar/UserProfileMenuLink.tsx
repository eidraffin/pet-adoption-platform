'use client';

interface UserProfileMenuLinkProps {
    label: string;
    onClick: () => void;
    imageSrc?: string; 
}

const UserProfileMenuLink: React.FC<UserProfileMenuLinkProps> = ({
    label,
    onClick,
    imageSrc

}) => {
    
    return (
        <div
            onClick={onClick}
            className="flex items-center px-5 py-4 cursor-pointer hover:bg-gray-100 transition"
            style={{ padding: '20px' }}
        >
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={label}
                    className="w-8 h-8 mr-4 rounded-full"
                />
            )}
            <span>{label}</span>
        </div>
    )
}

export default UserProfileMenuLink;