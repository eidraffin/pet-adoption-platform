'use client';

import { useState } from 'react';

import Image from 'next/image';

import useSearchModal, {SearchQuery} from '../hooks/useSearchModal';


const Categories = () => {

    const searchModal = useSearchModal();
    const [species, setSpecies] = useState('');

    const _setSpecies = (_species: string) => {
        setSpecies(_species);
    
        const query: SearchQuery = {
            location: searchModal.query.location,
            age: searchModal.query.age,
            price:searchModal.query.price,
            gender: searchModal.query.gender,
            breed: searchModal.query.breed,
            size: searchModal.query.size,
            //behaviour: searchModal.query.behaviour,
            spayed_neutered: searchModal.query.spayed_neutered,
            is_vaccinated: searchModal.query.is_vaccinated,
            keyword: searchModal.query.keyword,
            species: _species
            //other_medical_history: searchModal.query.other_medical_history,
        };
    
        searchModal.setQuery(query);
    };

  

    return (
        <div className="pt-12 cursor-pointer pb-6 flex justify-center items-center border-b-4 space-x-10">
            <div 
                onClick={() => _setSpecies('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-4 ${species == '' ? 'border-black' : 'border-white'} opacity-80 hover:border-gray-200 hover:opacity-100 transform transition-transform hover:scale-110`}>
                <Image
                    src="/all-category.jpg"
                    alt="Category - All"
                    width={80}
                    height={80}
                />

                <span className='text-md'>All</span>
            </div>
            
            <div 
                onClick={() => _setSpecies('Cat')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-4 ${species === 'Cat' ? 'border-black' : 'border-white'} opacity-80 hover:border-gray-200 hover:opacity-100 transform transition-transform hover:scale-110`}>
                <Image
                    src="/cat-category.jpg"
                    alt="Category - Cat"
                    width={80}
                    height={80}
                />

                <span className='text-md'>Cats</span>
            </div>

            <div 
                onClick={() => _setSpecies('Dog')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-4 ${species == 'Dog' ? 'border-black' : 'border-white'} opacity-80 hover:border-gray-200 hover:opacity-100 transform transition-transform hover:scale-110`}>
                <Image
                    src="/dog-category.jpg"
                    alt="Category - Dog"
                    width={80}
                    height={80}
                />

                <span className='text-md'>Dogs</span>
            </div>

            <div 
                onClick={() => _setSpecies('Rabbit')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-4 ${species== 'Rabbit' ? 'border-black' : 'border-white'} opacity-80 hover:border-gray-200 hover:opacity-100 transform transition-transform hover:scale-110`}>
                <Image
                    src="/rabbit-category.jpg"
                    alt="Category - Rabbits"
                    width={80}
                    height={80}
                />

                <span className='text-md'>Rabbits</span>
            </div>

            <div
                onClick={() => _setSpecies('Bird')} 
                className={`pb-4 flex flex-col items-center space-y-2 border-b-4 ${species == 'Bird' ? 'border-black' : 'border-white'} opacity-80 hover:border-gray-200 hover:opacity-100 transform transition-transform hover:scale-110`}>
                <Image
                    src="/bird-category.jpg"
                    alt="Category - Birds"
                    width={80}
                    height={80}
                />

                <span className='text-md'>Birds</span>
            </div>

        </div>

   
    )
}

export default Categories;