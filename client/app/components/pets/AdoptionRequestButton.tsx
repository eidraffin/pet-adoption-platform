'use client'

import useLoginModal from "@/app/hooks/useLoginModal";

import useAdoptionRequestModal from "@/app/hooks/useAdoptionRequestModal";

import { PetType } from "./PetList";


interface AdoptionRequestButtonProps {
    userId?: string | null;
    pet:PetType;
}

const AdoptionRequestButton: React.FC<AdoptionRequestButtonProps> = ({
    pet,
    userId,

}) => {
    const loginModal = useLoginModal();
    const adoptionRequestModal = useAdoptionRequestModal();


//=============================================================

    //const router = useRouter(); 
    //console.log("pet data:",pet)
    //console.log("pet user data:", useraccount.id)
    //console.log("user:",userId)

/*    
    const PetAdoptionRequest = () => {
        //adoptionRequestModal.open()
        //const currentRoute = router.asPath;
     
        if (userId) {
            adoptionRequestModal.open()
        } else {
            loginModal.open();
        }    
    }
*/

//=============================================================


    const handleAdoptButtonClick = () => {
        if (userId && userId !== pet.useraccount.id) {
            adoptionRequestModal.open();
        } else if (!userId) {
            loginModal.open();
        }
    };


    return (

        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl w-full h-full">
            
            <h2 className="mb-5 text-2xl font-semibold">{pet.species} Details</h2>
            
            <div className="mb-6">
                
                <ul>                    
                    <li className="mb-2">
                        <span className="font-semibold">Age:</span> {pet.age}
                    </li>
                    <li className="mb-2">
                        <span className="font-semibold">Gender:</span> {pet.gender}
                    </li>
                    <li className="mb-2">
                        <span className="font-semibold">Breed:</span> {pet.breed}
                    </li>
                    <li className="mb-2">
                        <span className="font-semibold">Size:</span> {pet.size}
                    </li>
                    <li className="mb-2">
                        <span className="font-semibold">Behaviour:</span> {pet.behaviour}
                    </li>
                    <li className="mb-2">
                        <span className="font-semibold">Vaccination:</span> {pet.is_vaccinated ? 'Yes' : 'No'}
                    </li>
                    <li className="mb-2">
                        <span className="font-semibold">Spayed/Neutered:</span> {pet.spayed_nutered ? 'Yes' : 'No'}
                    </li>
                    <li className="mb-2">
                        <span className="font-semibold">Medical History:</span> {pet.other_medical_history || 'None'}
                    </li>
                    <li className="mb-2">
                        <span className="font-semibold">Location:</span> {pet.location}
                    </li>
                    <li className="mb-2">
                        <span className="font-semibold">Adoption Fee:</span> {pet.price} BDT
                    </li>
                    <li className="mb-2">
                        <span className="font-semibold">Posted at:</span> {pet.created_at.toLocaleString()}
                    </li>
                </ul>

            </div>

            {userId !== pet.useraccount.id && (
                <button
                    onClick={handleAdoptButtonClick}
                    className="w-full py-3 text-lg text-white bg-green-800 hover:bg-black rounded-lg focus:outline-none focus:ring focus:ring-green-400 transform hover:scale-105 transition duration-300"
                >
                    Adopt
                </button>
            )}

        </aside>
    )
}

export default AdoptionRequestButton;