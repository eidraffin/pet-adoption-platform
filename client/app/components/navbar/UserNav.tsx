'use client';

import MenuLink from "./MenuLink";

import useLoginModal from "@/app/hooks/useLoginModal";

import useSignupModal from "@/app/hooks/useSignupModal";

import LogoutButton from "../LogoutButton";

import { useRouter } from "next/navigation";

import UserProfileMenuLink from "./UserProfileMenuLink";

import { useEffect, useState } from "react";

import apiService from "@/app/services/apiService";

import Image from "next/image";


interface UserNavProps {
    userId?: string | null;   
}


const UserNav: React.FC<UserNavProps> = ({
    userId

}) => {

    const router = useRouter();
    const loginModal = useLoginModal();
    const signupModal = useSignupModal();
    const [isOpen, setIsOpen] = useState(false)


    //============== default useraccount state =========================================

    const defaultUserAccount = {
        name: '',
        avatar_url: '',
    };

    const [useraccount, setUserAccount] = useState(defaultUserAccount);

    //=> pore lekhsilam Fetch user account data if userId is available

    useEffect(() => {
        const fetchUserAccount = async () => {
            try {
                if (userId) {
                    const useraccountData = await apiService.get(`/api/auth/${userId}`);
                    setUserAccount(useraccountData);
                }
            } catch (error) {
                console.error("Error fetching user account data:", error);
            }
        };

        fetchUserAccount();
    }, [userId]);
    //======================================================================================

    return (
        <div className="p-1 relative inline-block border rounded-full">

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center "
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: "2em", height: "2em" }}>
                    <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" fill="black" />
                </svg>
                <Image
                    fill
                    src='/profile_pic_1.jpg'
                    alt='ddd'
                    className="w-full rounded-full"
                />             
            </div>

            {isOpen && (

                <div className="w-[220px] absolute top-[60px] right-0 bg-white font-semibold border rounded-xl shadow-md flex flex-col cursor-pointer">

                    {userId ? (

                        <>
                            <UserProfileMenuLink
                                label={useraccount.name ? useraccount.name.toUpperCase() : 'Me'}//{useraccount.name.toUpperCase()} // Pass the user's name to UserProfileMenuLink
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push(`/useraccount/${userId}`);
                                }}
                                imageSrc={useraccount.avatar_url}
                            />
                            <hr />


                            <MenuLink
                                label='Added pets'
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push('/mypets');
                                }}
                            />

                            
                            <MenuLink
                                label="Responses"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push('/mypetsresponse');
                                }}

                            />        


                            <MenuLink
                                label='Inbox'
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push('/inbox');
                                }}
                            />

                            <MenuLink
                                label='Favorites'
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push('/myfavorites');
                                }}
                            />

                            <MenuLink
                                label='Requests'
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push('/myadoptionrequests');
                                }}
                            />

                            <hr />

                            <LogoutButton />

                        </>

                    ) : (

                        <>
                            <MenuLink 
                                label="Log in"
                                onClick={() => {
                                    console.log('clicked button')

                                    setIsOpen(false);
                                    loginModal.open()
                                }}
                            />

                            <MenuLink 
                                label="Sign up"
                                onClick={() => {
                                    console.log('clicked button')

                                    setIsOpen(false);
                                    signupModal.open()
                                }}
                            />
                        </>    

                        )}  
                    
                </div>
            )}
        </div>
    )
}

export default UserNav;