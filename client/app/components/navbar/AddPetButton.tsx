'use client'

import useAddPetModal from "@/app/hooks/useAddPetModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface AddPetButtonProps {
    userId?: string | null;
}

const AddPetButton: React.FC<AddPetButtonProps> = ({
    userId
}) => {
    
    const loginModal = useLoginModal();
    const addPropertyModal = useAddPetModal();

    const AdvertisePet = () => {
        if (userId) {
            addPropertyModal.open()
        } else {
            loginModal.open();
        }    
    }

    return (
        <div
            onClick={AdvertisePet} 
            className="p-2 cursor-pointer text-xl font-bold rounded-xl hover:underline hover:-translate-y-2 duration-500 transition-all"
        >
            Add Pet
        </div>
    )
}

export default AddPetButton;