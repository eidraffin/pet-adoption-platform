import PetList from "../components/pets/PetList";

import { getUserId } from "../lib/actions";

const MyPetPage = async () => {

    const userId = await getUserId();

    return (
        
        <main className="max-w-[1500px] mx-auto px-6 pb-6">

            <div className="relative">
                <h1 className="my-6 text-4xl font-bold text-stone-800 inline-block relative z-10">Added Pets</h1>
                <div className="absolute w-full h-2 bg-sky-900 bottom-0 left-0 z-0"></div>
            </div>

             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <PetList
                    useraccount_id={userId}
                />
             </div>
        </main>
    )
}        

export default MyPetPage;