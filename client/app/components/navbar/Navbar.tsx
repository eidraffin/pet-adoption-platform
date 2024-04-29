import Link from "next/link";

import Image from "next/image";

import SearchFilters from "./SearchFilters";

import UserNav from "./UserNav";

import AddPetButton from "./AddPetButton";

import { getUserId } from "@/app/lib/actions";

const Navbar = async () => {

    const userId = await getUserId();

    return (
        <nav className="w-full fixed top-0 left-0 py-12 border-b bg-stone-100 z-10">

            <div className="max-w-[1650px] mx-auto px-8">

                <div className="flex justify-between items-center">

                    <Link href="/">
                        <Image 
                            src="/Nextjs-logo.png"
                            alt="logo"
                            width={180}
                            height={38}
                        />
                    </Link>

                    <div className="flex space-x-8">
                        <SearchFilters />
                    </div>

                    <div className="flex items-center-x-6 space-x-8">

                        <Link href="/">
                        <div className="p-2 cursor-pointer text-xl font-bold rounded-xl hover:underline hover:-translate-y-2 duration-500 transition-all">
                        
                                Home
                            </div>
                        </Link>

                        {/*<PetProductButton/>*/}

         
                        <AddPetButton
                            userId={userId}
                        />

                        <UserNav
                            userId={userId}
                        />
                        
                    </div>     

                </div>

            </div>

        </nav>
    )
}

export default Navbar;
