import PetList from "../components/pets/PetList";

import { getUserId } from "../lib/actions";

const MyFavoritesPage = async () => {

    const userId = await getUserId();

    if (!userId) {

        return (

            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You aren't authenticated...</p>
            </main>
        )
    }

    return (

        <main className="max-w-[1500px] max-auto px-6 pb-12">

            <div className="relative">
                <h1 className="my-6 text-4xl font-bold text-stone-800 inline-block relative z-10">Favourites</h1>
                <div className="absolute w-full h-2 bg-sky-900 bottom-0 left-0 z-0"></div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <PetList 
                    favorites={true}
                />
            </div>

        </main>
    )
}

export default MyFavoritesPage;