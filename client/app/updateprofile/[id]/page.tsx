'use client';

import Link from 'next/link';
import { ChangeEvent, useState, useEffect } from 'react';
import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';
import Image from 'next/image';


interface UserProps {
    id: string;
    uname: string;
    avatar_url: string;
}


const UserAccountUpdatePage: React.FC<UserProps> = ({id, uname, avatar_url}) => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [errors, setErrors] = useState<string[]>([]); //username er jonno
    const [dataImage, setDataImage] = useState<File | null>(null);
    const [error, setError] = useState<string>(''); //delete er jonno

    
    const defaultUserAccount = {
        name: '',
        avatar_url: '',
    };

    const [useraccount, setUserAccount] = useState(defaultUserAccount);

    //=> pore lekhsilam Fetch user account data if userId is available

    let iid = '' 
    useEffect(() => {
        const fetchUserAccount = async () => {
            const userId = await getUserId();
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
    }, []);















//============================ update username ===================================

    const updateInfo = async () => {
        const userId = await getUserId();

        console.log('Name:', name); // Log name value

        const formData = {
            name: name,
        }

        console.log('FormData:', formData)
        
        try {
            const response = await apiService.patch(`/api/update/${userId}/change-username/`, (formData))

            console.log('Response:', response);
            if (response.success) {
                console.log('SUCCESS :D');
            } else {
                console.log('Error');
                setErrors(['Error updating profile']);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors(['Error updating profile']);
        }

    };

//===================================== update avatar ==================================

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];
            setAvatar(tmpImage); // Update avatar state
        }
    }

    const updateAvatar = async () => {
        const userId = await getUserId();
        console.log('Avatar:', avatar);
        if (avatar) {
            const formData = new FormData();
            formData.append('avatar', avatar); 
            console.log('Form data:', formData);
            
            try {
                const response = await apiService.patch(`/api/update/${userId}/update-avatar/`, formData);
                console.log('Response:', response);
                if (response.success) {
                    console.log('SUCCESS :D');
                } else {
                    console.log('Error');
                    setErrors(['Error updating profile']);
                }
            } catch (error) {
                console.error('Error:', error);
                setErrors(['Error updating profile']);
            }
        } else {
            console.log('No image selected');
        }
    };


//========================================== delete account ==========================================    
    const deleteAccount = async () => {
        const userId = await getUserId();
        const isConfirmed = window.confirm("Are you sure you want to delete your account?");
        if (isConfirmed) {
            try {
                const response = await apiService.delete(`/api/update/${userId}/delete-account/`);
                if (response.status === 204) {
                    return <Link href='/'>Homepage</Link>;
                } else {
                    console.log('Error deleting account');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
};
        


    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">{useraccount.name.toUpperCase() ||'User'}</h1>
            <form className="flex flex-col gap-4">
                <img           
                    src={useraccount.avatar_url}
                    alt='profile'
                    className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
                />
            <div className='pt-3 pb-6 space-y-4'>
                <span className='text-sky-700 font-semibold'>Upload profile photo</span>                    
                <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>                        
                    <input
                        type="file"
                        accept='image/*'
                        onChange={setImage}
                    />
                </div>

                {avatar && (
                    <div className='w-[200px] h-[150px] relative'>
                        <Image
                            fill
                            alt="Uploaded image"
                            src={URL.createObjectURL(avatar)}
                            className='w-full h-full object-cover rounded-xl'
                        />
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={updateAvatar}
                className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:bg-black"
            >
                Save Photo
            </button>



                <input
                    type="text"
                    placeholder="Username"
                    className="border p-3 rounded-lg"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        console.log('Input Value:', e.target.value);
                    }}
                    
                />
                {errors.map((error, index) => (
                    <div
                        key={index}
                        className="p-5 mb-4 bg-mutemart-dark text-white rounded-xl opacity-80"
                    >
                        {error}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={updateInfo}
                    className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:bg-black"
                >
                    Update
                </button>
            </form>
            <br />
            <div className="flex justify-between mt-5">
                {error && <div className="text-red-700">{error}</div>}                
                <span                 
                 className="text-red-700 font-semibold cursor-pointer hover:text-red-700 hover:font-extrabold"
                 onClick={deleteAccount}
                 >                    
                    Delete Account
                </span>
            </div>
        </div>
    );
};

export default UserAccountUpdatePage;
