import Image from "next/image";

import ContactButton from "@/app/components/ContactButton";

import PropertyList from "@/app/components/pets/PetList";

import apiService from "@/app/services/apiService";

import { getUserId } from "@/app/lib/actions";



const UserAccountDetailPage = async ({ params }: { params: { id: string }}) => {

    const useraccount = await apiService.get(`/api/auth/${params.id}`)

    const userId = await getUserId();

    return (
        
        <main className="max-w-[1500px] mx-auto px-6 pb-6">

            <div className="relative">
                <h1 className="my-6 text-4xl font-bold text-stone-800 inline-block relative z-10"> </h1>
                <div className="absolute w-full h-2 bg-sky-900 bottom-0 left-0 z-0"></div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">

                <aside className="col-span-1 mb-4">

                    <div className="flex flex-col items-center p-6 border border-gray-300 shadow-xs">

                        <Image
                            src={useraccount.avatar_url || "/profile_pic_1.jpg"}
                            width={200}
                            height={200}
                            alt="User name"
                            className="rounded-full"
                        />

                        <h1 className="mt-6 text-2xl">{useraccount.name ? useraccount.name.toUpperCase() : 'Anonymous User'}</h1>

                        {userId != params.id && (
                            <ContactButton 
                                userId={userId}
                                useraccountId={params.id}
                            />
                        )}

                        <br />
                        {userId == params.id && (
 
                                <a 
                                    href={`/updateprofile/${userId}`} 
                                    className="bg-emerald-700 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline relative overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-emerald-800 hover:text-gray-100"
                                    >
                                    <span className="block">Edit Profile</span>
                                </a>
                        )}

                    </div>  

                </aside> 
                
                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <PropertyList 
                            useraccount_id={params.id}
                        />

                    </div>    
                </div>
            </div>                
        </main>

    )
}

export default UserAccountDetailPage;