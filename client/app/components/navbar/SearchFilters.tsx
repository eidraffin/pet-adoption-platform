'use client'

// Import necessary modules
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useSearchModal, { SearchQuery } from '@/app/hooks/useSearchModal';

const SearchFilters = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const searchModal = useSearchModal();

    // State variables for other filters
    const [location, setLocation] = useState('');
    const [age, setAge] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [species, setSpecies] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [breed, setBreed] = useState<string>('');
    const [spayed_neutered, setSpayedNeutered] = useState<boolean>(false);
    const [is_vaccinated, setVaccinated] = useState<boolean>(false);

    const handleKeywordSearch = () => {
        const newSearchQuery: SearchQuery = {
            // Set keyword search query
            keyword: searchQuery,
            // Set other filters
            location,
            age,
            price,
            species,
            gender,
            size,
            breed,
            spayed_neutered,
            is_vaccinated,
        };

        // Set the search query and close the modal
        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    };

    return (
        <div className="h-[48px] lg:h-[64] flex flex-row items-center justify-between border-slate-300 border-2 rounded-full">
            <div className="hidden lg:block">
                <div className="flex flex-row items-center justify-between">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none w-full lg:w-64 border-none px-4 py-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="p-2">
                <div
                    className="cursor-pointer p-2 lg:p-4 bg-airbnb hover:bg-stone-100 transition rounded-full text-black"
                    onClick={handleKeywordSearch}
                >
                    <FaSearch />
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
