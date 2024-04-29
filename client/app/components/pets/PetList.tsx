'use client';

import { useEffect, useState } from "react";

import PetListDetail from "./PetListDetail";

import apiService from "@/app/services/apiService";

import { useSearchParams } from 'next/navigation';

import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";

export type PetType = {
    id: string;
    name: string;
    price: number;
    location: string; 
    image_url: string;
    age: number;
    gender: string;
    species: string;
    is_vaccinated: boolean;
    is_favorite: boolean;
    breed: string;
    size: string;
    spayed_nutered: boolean;
    behaviour: string;
    other_medical_history: string;
    created_at: Date;
    useraccount: {
        id: string;
        name: string;
        avatar_url: string;
    };
}

interface PetListProps {
    useraccount_id?: string | null;
    favorites?: boolean | null;
}

const PetList: React.FC<PetListProps> = ({
    useraccount_id,
    favorites,

}) => {

    const [pet, setPet] = useState<PetType[]>([]);
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const location = searchModal.query.location;
    const age = searchModal.query.age;
    const size = searchModal.query.size; 
    const species = searchModal.query.species;
    const gender = searchModal.query.gender;
    const price = searchModal.query.price;
    const spayed_neutered = searchModal.query.spayed_neutered;
    const is_vaccinated = searchModal.query.is_vaccinated;
    const keyword = searchModal.query.keyword
    const [pets, setPets] = useState<any[]>([]);

    const searchQuery = useSearchModal();



    const markFavorite = (id: string, is_favorite: boolean) => {
        const tempPet = pet.map((pet: PetType) => {
            if (pet.id == id) {
                pet.is_favorite = is_favorite

                if (is_favorite) {
                    console.log('added to list of favorited properties')
                } else {
                    console.log('removed from list')
                }
            }

            return pet;
        })

        setPet(tempPet);
    }

//==========================================================================    
/*
    useEffect(() => {
        // Fetch all pets initially or when the component mounts
        getFilteredPets('');
    }, []);

    const getFilteredPets = async (searchQuery) => {
        // Fetch pets based on the searchQuery
        const url = `/api/pets/?search=${searchQuery}`;
        const response = await apiService.get(url);
        setPets(response.data);
    };*/
//==========================================================================    


//=================== retreive pets, advanced filter result ================
    const getProperties = async () => {
        let url = '/api/pets/';

        if (useraccount_id) {
            url += `?useraccount_id=${useraccount_id}`

        } else if (favorites) {
            url += '?is_favorites=true'

        } else {
            let urlQuery = '';

            if (location) {
                urlQuery += '&location=' + location;
            }

            if (age) {
                urlQuery += '&age=' + age;
            }

            if (species) {
                urlQuery += '&species=' + species;
            }

            if (size) {
                urlQuery += '&size=' + size;
            }

            if (price) {
                urlQuery += '&price=' + price;
            }
            
            if (gender) {
                urlQuery += '&gender=' + gender;
            }
            
            if (spayed_neutered !== undefined) {
                urlQuery += '&spayed_neutered=' + spayed_neutered; 
            }
            
            if (is_vaccinated !== undefined) {
                urlQuery += '&is_vaccinated=' + is_vaccinated; 
            }

            if (keyword) {
                urlQuery += '&keyword=' + keyword;
            }
           

            if (urlQuery.length) {
                console.log('Query:', urlQuery);
                urlQuery = '?' + urlQuery.substring(1);

                url += urlQuery;
            }
        }

//===========================================================================







        const tempPet = await apiService.get(url)

        setPet(tempPet.data.map((pet: PetType) => {
            if (tempPet.favorites.includes(pet.id)) {
                pet.is_favorite = true
            } else {
                pet.is_favorite = false
            }

            return pet
        }));
    };


    useEffect(() => {
        getProperties();
    }, [searchModal.query]);

   /* useEffect(() => {
        getFilteredPets();
    }, [searchModal.query]);*/

    return (
        <>
            {pet.map((pet) => {
                return (
                    <PetListDetail
                        key={pet.id}
                        pet={pet}
                        markFavorite={(is_favorite: any) => markFavorite(pet.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}

export default PetList;
