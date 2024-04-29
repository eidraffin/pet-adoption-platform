'use client';

import apiService from "../services/apiService";

interface FavoriteButtonProps {
    id: string;
    is_favorite: boolean;
    markFavorite: (is_favorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    id,
    is_favorite,
    markFavorite
}) => {

    const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
        
        e.stopPropagation();

        const response = await apiService.post(`/api/pets/${id}/toggle_favorite/`, {})

        markFavorite(response.is_favorite);

        showMessage(response.is_favorite);
    }


    const showMessage = (isFavorite: boolean) => {
        let message, textColor;
        if (isFavorite) {
            message = "Marked as favorites";
            textColor = "text-blue-700";
        } else {
            message = "Removed from favorites";
            textColor = "text-red-700"; 
        }
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 bg-white ${textColor} p-2 rounded-xl shadow-xl font-semibold`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }


    return (
            <div
                onClick={toggleFavorite}
                className={`absolute top-3 right-3 ${is_favorite ? 'text-gray-500' : 'text-white opacity-40'} hover:text-rose-800`}
            >

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" fill={is_favorite ? "#b30000" : "currentColor"} />
                </svg>
            </div>
    )
}

export default FavoriteButton;