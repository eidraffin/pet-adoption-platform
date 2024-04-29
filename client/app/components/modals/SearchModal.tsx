'use client'

import { useState } from "react";

import Modal from "./Modal";

import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";

import CustomButton from "../forms/CustomButton";

const SearchModal = () => {
    
    let content = (<></>);

    const searchModal = useSearchModal();

    const districts = [
        "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Jamalpur",
        "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Mymensingh",
        "Narayanganj", "Narsingdi", "Netrokona", "Rajbari", "Shariatpur",
        "Sherpur", "Tangail", "Bogra", "Joypurhat", "Naogaon", "Natore",
        "Nawabganj", "Pabna", "Rajshahi", "Sirajgonj", "Dinajpur", "Gaibandha",
        "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur",
        "Thakurgaon", "Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali",
        "Pirojpur", "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong",
        "Comilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur",
        "Noakhali", "Rangamati", "Habiganj", "Maulvibazar", "Sunamganj",
        "Sylhet", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna",
        "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"
    ];

    const pet_category = ['Cat', 'Dog', 'Rabbit', 'Bird' ];

    const [location, setLocation] = useState<string>('');

    const [age, setAge] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [species, setSpecies] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [breed, setBreed] = useState<string>('');
    const [spayed_neutered, setSpayedNeutered] = useState<boolean>(false);
    const [is_vaccinated, setVaccinated] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');

    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            location: location,
            age: age,
            breed:breed,
            species: species,
            gender: gender,
            size: size,
            price: price,
            keyword: keyword,
            spayed_neutered: spayed_neutered,
            is_vaccinated: is_vaccinated,
        };

        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    };



    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocation = e.target.value;
        setLocation(newLocation);
        // Update the search query with the new location
        searchModal.setQuery({ ...searchModal.query, location: newLocation });
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setAge(isNaN(value) ? 0 : value);
        searchModal.setQuery({...searchModal.query, age: isNaN(value) ? 0 : value});
    };

    const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSpecies(e.target.value);
        searchModal.setQuery({...searchModal.query, species: e.target.value});
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
        searchModal.setQuery({...searchModal.query, gender: e.target.value});
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = e.target.value;
        setSize(newSize);
        searchModal.setQuery({ ...searchModal.query, size: newSize });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setPrice(isNaN(value) ? 0 : value);
        searchModal.setQuery({...searchModal.query, price: isNaN(value) ? 0 : value});
    };

    const handleSpayedNeuteredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpayedNeutered(e.target.checked);
        searchModal.setQuery({ ...searchModal.query, spayed_neutered: e.target.checked });
    };
    
    const handleVaccinatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVaccinated(e.target.checked);
        searchModal.setQuery({ ...searchModal.query, is_vaccinated: e.target.checked });
    };

    
    const contentLocation = (
        <>
            <h2 className="mb-6 text-3xl font-semibold">Filter by</h2>

            <div className='flex flex-col'>
                <label htmlFor="location" className="block text-md font-medium text-gray-700 mb-2">
                    Location
                </label>
                <select
                    id="location"
                    value={location}
                    onChange={handleLocationChange}
                    className='w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500'
                >
                    <option value="">Select a location</option>
                    {districts.map((district, index) => (
                        <option key={index} value={district}>{district}</option>
                    ))}                
                </select>

                <div className="mt-6 space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="age" className="block text-md font-medium text-gray-700 mb-2">Age</label>
                        <input
                            id="age"
                            type="number"
                            value={age}
                            onChange={handleAgeChange}
                            className='w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500'
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="species" className="block text-md font-medium text-gray-700 mb-2">Species</label>
                        <select
                            value={species}
                            onChange={handleSpeciesChange}
                            className='w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500'
                        >   
                            <option value="">Select animal</option>
                            {pet_category.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-6 flex flex-col">
                        <label htmlFor="gender" className="block text-md font-medium text-gray-700 mb-2">Gender</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={handleGenderChange}
                            className='w-full p-4 border border-gray-300 rounded-xl'
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="size" className="block text-md font-medium text-gray-700 mb-2">Size</label>
                        <select
                            value={size}
                            onChange={handleSizeChange}
                            className='w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500'
                        >   
                            <option value="">Pet Size</option>
                            <option value="Very Smol">Very Smol</option>
                            <option value="Small">Small</option>
                            <option value="Regular">Regular</option>
                            <option value="Large">Large</option>
                            <option value="ExtraLarge">Extra Large</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="price" className="block text-md font-medium text-gray-700 mb-2">Price</label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={handlePriceChange}
                            className='w-full p-4 border border-gray-300 rounded-xl'
                        />
                    </div>






                    <div className="flex items-center">
                        <input
                            id="spayed_neutered"
                            type="checkbox"
                            checked={spayed_neutered}
                            onChange={handleSpayedNeuteredChange}
                            className="mr-2 rounded h-5 w-5 text-blue-700 focus:ring-blue-700 border-gray-300"
                        />
                        <label htmlFor="spayed_neutered" className="block text-md font-medium text-gray-700">Spayed/Neutered</label>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="is_vaccinated"
                            type="checkbox"
                            checked={is_vaccinated}
                            onChange={handleVaccinatedChange}
                            className="mr-2 rounded h-5 w-5 text-blue-700 focus:ring-blue-700 border-gray-300"
                        />
                        <label htmlFor="is_vaccinated" className="block text-md font-medium text-gray-700">Vaccinated</label>
                    </div>

                    <CustomButton
                        label="Search"
                        onClick={closeAndSearch}
                    />
                </div>
            </div>
        </>
    );

   if (searchModal.step == 'location') {
       content = contentLocation;
    }

    return (
        <Modal
            label="Search"
            content={content}
            close={searchModal.close}
            isOpen={searchModal.isOpen}
        />
    )
}

export default SearchModal;
