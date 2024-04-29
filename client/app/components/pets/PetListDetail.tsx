import Image from "next/image";
import { PetType } from "./PetList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface PetProps {
    pet: PetType
    markFavorite?: (is_favorite: boolean) => void;    
}

const PetListDetail:React.FC<PetProps> = ({
    pet,
    markFavorite   
    
}) => {
    const router = useRouter();


    return (
        <div
             
            className="bg-white rounded-lg overflow-hidden shadow-2xl hover:shadow-2xl transition duration-300"
        >
            <div className="relative overflow-hidden aspect-square">
                <Image
                    onClick={() => router.push(`/pets/${pet.id}`)}
                    src={pet.image_url}
                    alt="Pet Image"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 transform hover:scale-105"
                />    

                {markFavorite && (
                    <div className="absolute top-2 right-2">
                        <FavoriteButton
                            id={pet.id}
                            is_favorite={pet.is_favorite}
                            markFavorite={(is_favorite) => markFavorite(is_favorite)}
                        />
                    </div>
                )}
            </div>

            <div className="p-4">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">{pet.name}</h2>
                <p className="text-gray-600 mb-4"><span className="text-gray-800 font-semibold"></span> {pet.species}</p>
                <hr className="border-t-2 border-gray-400 my-4" />
                <div className="space-y-2">
                    <p className="text-gray-700"><span className="font-semibold">Location:</span> {pet.location}</p>                    
                    <p className="text-gray-700"><span className="font-semibold">Age:</span> {pet.age} years</p>
                    <p className="text-gray-700"><span className="font-semibold">Gender:</span> {pet.gender}</p>
                    {/*<p className="text-gray-700"><span className="font-semibold">Size:</span> {pet.size}</p>*/}
                    <p className="text-gray-700"><span className="font-semibold">Vaccination:</span> {pet.is_vaccinated ? 'Yes' : 'No'}</p>
                    <p className="text-gray-700"><span className="font-semibold">Adoption Fee:</span> {pet.price} BDT</p>
                    
                </div>
            </div>
    
            
            <div className="bg-gray-100 px-4 py-2 flex justify-end items-center">

                <button onClick={() => router.push(`/pets/${pet.id}`)} className="bg-sky-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline relative overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-sky-950 hover:text-white">
                    <span>View Details</span>
                </button>

            </div>
            
        </div>
    );
};



export default PetListDetail;