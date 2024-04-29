'use client';

import Image from 'next/image';
import { ChangeEvent, useState, useEffect } from 'react';
import Modal from './Modal';
import CustomButton from '../forms/CustomButton';
import Categories from '../addpet/Categories';
import useAddPetModal from '@/app/hooks/useAddPetModal';
import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';


const AddPetModal = () => {

    //==================== States ========================//

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);

    const [dataCategory, setDataCategory] = useState('');   
    const [dataName, setDataName] = useState('');
    const [dataDescription, setDataDescription] = useState('');

    const [dataAge, setDataAge] = useState('');
    const [dataGender, setDataGender] = useState('');
    const [dataBreed, setDataBreed] = useState('');
    const [dataSize, setDataSize] = useState('');
    const [dataBehaviour, setDataBehaviour] = useState('');
   
    const [dataPrice, setDataPrice] = useState('');
    const [dataSpaneu, setDataSpaneu] = useState(false);
    const [dataVaccinated, setDataVaccinated] = useState(false);
    const [dataMedical, setDataMedical] = useState('');
    //const [dataLocation, setDataLocation] = useState('');

    const [dataImage, setDataImage] = useState<File | null>(null);

    const addPetModal = useAddPetModal();

    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    //========================== districts for drop down ===============================
    const locations = [
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

    const [dataLocation, setDataLocation] = useState<string>('');

    const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDataLocation(e.target.value);
    };


    //===================== Set Data ===========================//

    const setCategory = (category: string) => {
        setDataCategory(category)
    }

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];
            setDataImage(tmpImage);
        }
    }

    
    //====================== success toast message ==============================

    const showMessage = (isSuccess: boolean) => {
        let message, textColor;
        if (isSuccess) {
            message = "Pet added successfully. Check in My Pets.";
            textColor = "text-blue-700";
        } else {
            message = "Something went wrong. Please try again later.";
            textColor = "text-red-700"; 
        }
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 bg-white ${textColor} p-2 rounded-xl shadow-xl font-semibold`;
        notification.textContent = message;
        document.body.appendChild(notification);
    
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 4000);
    };




    // ======================== Form Submit ============================= //

    const submitForm = async () => {

        //=> check if any required fields are missing
        if (

            dataCategory === '' ||
            dataName === '' ||
            dataDescription === '' ||
            dataAge === '' ||
            !dataGender || 
            dataBreed === '' ||
            !dataSize || 
            dataBehaviour === '' ||
            dataSpaneu === null || 
            dataVaccinated === null || 
            dataLocation === '' ||
            dataPrice === '' ||
            dataImage === null

        ) {
            setErrorMessage('Please fill in all the required fields.');
             return;
        }

        setErrorMessage(null);


//=============================================================================
       /* console.log('submitForm');
        console.log("dataCategory:", dataCategory);
        console.log("dataName:", dataName);
        console.log("dataDescription:", dataDescription);
        console.log("dataAge:", dataAge);
        console.log("dataGender:", dataGender);
        console.log("dataBreed:", dataBreed);
        console.log("dataSize:", dataSize);
        console.log("dataBehaviour:", dataBehaviour);
        console.log("dataSpaneu:", dataSpaneu);
        console.log("dataVaccinated:", dataVaccinated);
        console.log("dataLocation:", dataLocation);
        console.log("dataPrice:", dataPrice);
        console.log("dataImage:", dataImage);
        
        console.log("This is the result of aaaaaa",
            dataCategory &&
            dataName &&
            dataDescription &&
        
            dataAge &&
            dataGender &&
            dataBreed &&
            dataSize &&
            dataBehaviour &&
        
            dataSpaneu &&
            dataVaccinated &&
            dataLocation &&
            dataPrice &&
        
            dataImage
        ); */
//=============================================================================

        if (
            dataCategory &&
            dataName &&
            dataDescription &&

            dataAge &&
            dataGender&&
            dataBreed &&
            dataSize &&
            dataBehaviour &&

            //dataSpaneu &&
            //dataVaccinated &&
            dataLocation &&
            dataPrice &&

            dataImage
            
        ) {

            const formData = new FormData();

            formData.append('species', dataCategory);
            formData.append('name', dataName);
            formData.append('description', dataDescription);

            formData.append('age', dataAge);
            formData.append('gender', dataGender);
            formData.append('breed', dataBreed);
            formData.append('size', dataSize);
            formData.append('behaviour', dataBehaviour);

            formData.append('spayed_neutered', dataSpaneu.toString());
            formData.append('is_vaccinated', dataVaccinated.toString());
            formData.append('other_medical_history', dataMedical);
            formData.append('location', dataLocation);
            formData.append('price', dataPrice);
            
            formData.append('image', dataImage);

            const response = await apiService.post('/api/pets/create/', formData);
            console.log('Response:', response)

            if (response.success) {
                console.log('SUCCESS :D');
                router.push('/?added=true');
                showMessage(true);
                addPetModal.close();

            } else {
                console.log('Error');
                showMessage(false);

                const tmpErrors: string[] = Object.values(response).map((error: any) => {
                    return error;
                })

                setErrors(tmpErrors)
            }
        }
    }



    //================================================== Contents ======================================================//

    const content = (

        <>

            {errorMessage && (
                <div className="text-red-600">{errorMessage}</div>
            )}


            {currentStep == 1 ? (
                <>
                    <h2 className='mb-6 text-2xl font-semibold'>Animal</h2>

                    <Categories
                        dataCategory={dataCategory}
                        setCategory={(category) => setCategory(category)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(2)}
                    />
                </>



            ) : currentStep == 2 ? (
                <>
                    <h2 className='mb-6 text-2xl font-semibold'>Describe your pet</h2>

                    <div className='pt-3 pb-6 space-y-4'>

                        <div className='flex flex-col space-y-2'>
                            <label>Pet Name</label>
                            <input
                                type="text"
                                value={dataName}
                                onChange={(e) => setDataName(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Description</label>
                            <textarea
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className='w-full h-[200px] p-4 border border-gray-600 rounded-xl'
                            ></textarea>
                        </div>
                        
                    </div>

                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(1)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(3)}
                    />
                </>



            ) : currentStep == 3 ? (
                <>
                    <h2 className='mb-6 text-2xl font-semibold'>Details</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <label>Age</label>
                            <input
                                type="number"
                                value={dataAge}
                                onChange={(e) => setDataAge(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Gender</label>
                            <select
                                value={dataGender}
                                onChange={(e) => setDataGender(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            >
                                <option>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Breed</label>
                            <input
                                type="text"
                                value={dataBreed}
                                onChange={(e) => setDataBreed(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Size</label>
                            <select
                                value={dataSize}
                                onChange={(e) => setDataSize(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            >   
                                <option>Pet Size</option>
                                <option value="Very Smol">Very Smol</option>
                                <option value="Small">Small</option>
                                <option value="Regular">Regular</option>
                                <option value="Large">Large</option>
                                <option value="ExtraLarge">Extra Large</option>
                            </select>
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Behaviour</label>
                            <input
                                type="text"
                                value={dataBehaviour}
                                onChange={(e) => setDataBehaviour(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                    </div>

                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(2)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(4)}
                    />
                </>



            ) : currentStep == 4 ? (
                <>
                    <h2 className='mb-6 text-2xl font-semibold'>Details</h2>

                    <div className='pt-3 pb-6 space-y-4'>

                        <div className='flex flex-col space-y-2'>
                        <label>Spayed/Neutered</label>
                            <select
                                value={dataSpaneu.toString()} // Convert boolean to string
                                onChange={(e) => setDataSpaneu(e.target.value === "true")}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Vaccination</label>
                            <select
                                value={dataVaccinated.toString()} // Convert boolean to string
                                onChange={(e) => setDataVaccinated(e.target.value === "true")}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className='flex flex-col space-y-2'>
                        <label>Medical History (Optional)</label>
                            <textarea
                                value={dataMedical}
                                onChange={(e) => setDataMedical(e.target.value)}
                                className='w-full h-[200px] p-4 border border-gray-600 rounded-xl'
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="location">Location</label>
                            <select
                                id="location"
                                value={dataLocation}
                                onChange={handleLocationChange}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            >
                                <option value="">Select Location</option>
                                {locations.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Adoption Fee</label>
                            <input
                                type="number"
                                value={dataPrice}
                                onChange={(e) => setDataPrice(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>   

                    </div>

                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(3)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(5)}
                    />
                </>



            ) : (

                <>
                    <h2 className='mb-6 text-2xl'>Upload Image</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
                            <input
                                type="file"
                                accept='image/*'
                                onChange={setImage}
                            />
                        </div>

                        {dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <Image
                                    fill
                                    alt="Uploaded image"
                                    src={URL.createObjectURL(dataImage)}
                                    className='w-full h-full object-cover rounded-xl'
                                />
                            </div>
                        )}
                    </div>

                    {errors.map((error, index) => {
                        return (
                            <div
                                key={index}
                                className='p-5 mb-4 bg-sky-800 text-white rounded-xl opacity-80'
                            >
                                {error}
                            </div>
                        )
                    })}

                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(4)}
                    />

                    <CustomButton
                        label='Submit'
                        onClick={submitForm}
                    />
                </>
            )}
        </>
    )


    return (
        <>
            <Modal
                isOpen={addPetModal.isOpen}
                close={addPetModal.close}
                label="Add Pet"
                content={content}
            />
        </>
    )
}


export default AddPetModal;