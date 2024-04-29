import Image from "next/image";

import apiService from "../services/apiService";

import Link from "next/link";

const MyAdoptionRequestsPage = async () => {

    const adoption_request = await apiService.get('/api/auth/myadoptionrequests/')

    console.log(adoption_request,'dwwwwwww')

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">

            <div className="relative">
                <h1 className="my-6 text-4xl font-bold text-stone-800 inline-block relative z-10">Adoption Requests</h1>
                <div className="absolute w-full h-2 bg-sky-900 bottom-0 left-0 z-0"></div>
            </div>

            <div className="mt-6 space-y-4">

                {adoption_request.map((adopt_req: any) => {

                    return (      

                        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">

                            <div className="col-span-1">

                                <div className="relative overflow-hidden aspect-square rounded-xl">

                                    <Image
                                        fill
                                        src={adopt_req.pet.image_url}
                                        className="hover:scale-110 object-cover transition h-full w-full"
                                        alt="petto"
                                    />

                                </div>
                                
                            </div>

                            <div className="col-span-1 md:col-span-3">


                                <h2 className="mb-4 text-2xl font-bold text-gray-800">{adopt_req.pet.name}</h2>
                                
                                <ul className="divide-y divide-gray-200">
                                    <li className="py-2 flex items-center">
                                        <span className="font-bold mr-2">Location:</span>
                                        <span>{adopt_req.pet.location}</span>
                                    </li>

                                    <li className="py-2 flex items-center">
                                        <span className="font-bold mr-2">Gender:</span>
                                        <span>{adopt_req.pet.gender}</span>
                                    </li>

                                    <li className="py-2 flex items-center">
                                        <span className="font-bold mr-2">Age:</span>
                                        <span>{adopt_req.pet.age}</span>
                                    </li>
                                    
                                    <li className="py-2 flex items-center">
                                        <span className="font-bold mr-2">Adoption Fee:</span>
                                        <span>{adopt_req.pet.price} BDT</span>
                                    </li>
                                </ul>


                                <Link 
                                    href={`/pets/${adopt_req.pet.id}`}
                                    className="mt-6 inline-block cursor-pointer py-4 px-6 font-semibold bg-sky-900 text-white rounded-xl hover:bg-sky-850 transition-transform hover:scale-105"


                                >
                                    Go to pet
                                </Link>

                                
                            </div>
                        </div>
                    )
                })} 

            </div>


        </main>
    )
}

export default MyAdoptionRequestsPage;

///////////////