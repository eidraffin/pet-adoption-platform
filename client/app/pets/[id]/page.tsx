import Image from "next/image";

import Link from "next/link";

import apiService from "@/app/services/apiService";

import { getUserId } from "@/app/lib/actions";

import AdoptionRequestButton from "@/app/components/pets/AdoptionRequestButton";

import AdoptionRequestModal from "@/app/components/modals/AdoptionRequestModal";

import ReportPetSection from "@/app/components/pets/ReportPetSection";



const PetDetailPage = async ({params}: { params: {id: string }}) => {

    const pet = await apiService.get(`/api/pets/${params.id}`);

    const userId = await getUserId();

    console.log("Image URL:", pet.image_url)

    console.log('userId', userId);

//{pet.useraccount.name.toUpperCase()}
//object-cover w-full h-full

    return (        

        <main className="max-w-[1500px] mx-auto px-6 pb-6">

            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">

                <Image
                    fill
                    src={pet.image_url}
                    className="object-cover w-full h-full"
                    alt="Pet Image"
                />    

            </div>

            <hr />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="py-6 pr-6 col-span-3">

                    <h1 className="mb-4 text-4xl">{pet.name.charAt(0).toUpperCase() + pet.name.slice(1)} {pet.species}</h1>

                    <span className="mb-6 block text-lg text-gray-600">

                    </span>

                    <hr />                    

                    <Link 
                        href={`/useraccount/${pet.useraccount.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                        {pet.useraccount.avatar_url && (
                            <Image
                                src={pet.useraccount.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="The user name"
                            />
                        )}

                        <p><strong>{pet.useraccount.name ? pet.useraccount.name.toUpperCase() : 'Anonymous'}</strong> is the owner</p>

                    </Link>

                    <hr />

                    <div className="mt-6 text-lg">
                        <h2 className="text-2xl font-semibold mb-2">About {pet.species}</h2>
                        <p className="mb-4">{pet.description}</p>
                    </div>
                    <hr /> 
                                
                </div>
                       
                <div className="py-6 flex items-center space-y-4">
                  
                    <AdoptionRequestButton
                        userId={userId}
                        pet={pet}
                    />

                    <AdoptionRequestModal
                        userId={userId}
                        pet={pet}
                    />
                        
                </div>
                           
                <div className="py-6 flex items-center space-y-4">
                                     
                    <ReportPetSection
                        userId={userId}
                        pet={pet}
                    />
                                          
                </div>                

            </div>

        </main>
        
    )
}

export default PetDetailPage;