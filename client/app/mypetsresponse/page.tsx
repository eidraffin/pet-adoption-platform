'use client'

import React, { useEffect, useState } from 'react';

import apiService from '@/app/services/apiService';

import { getUserId } from '../lib/actions';

import Link from 'next/link';



interface AdoptionRequest {
  id: string;
  adopter_name: string;
  address: string;
  contact_number: string;
  has_pet: boolean;
  reason_for_adoption: string;
  adoption_status: boolean;
  created_by: string;
  pet: {
    id: string;
    name: string;
    image_url: string;
  };
}



const MyPetResponsesPage: React.FC = () => {

  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const userId = await getUserId();
        console.log("this is the user id:", userId);

        if (userId !== null) {
          const response = await apiService.get(`/api/adopt_req/${userId}/all_adoption_requests/`);
          console.log("this is the response data:", response);

          if (response.data && response.data.length > 0) {
            setAdoptionRequests(response.data);

          } else {
            console.error('No adoption requests found.');
          }

        } else {
          console.error('User ID is null.');
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        
      }
    };

    fetchData();
  }, []);

  return (

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="relative">
                <h1 className="my-6 text-4xl font-bold text-stone-800 inline-block relative z-10">Responses</h1>
                <div className="absolute w-full h-2 bg-sky-900 bottom-0 left-0 z-0"></div>
            </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adoptionRequests && adoptionRequests.length > 0 ? (
            adoptionRequests.map(request => (
              <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={request.pet.image_url} alt={request.pet.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                <div className="p-4">
                <div className="p-4" style={{ minHeight: '12rem' }}>
                  <div className="text-xl font-bold mb-2">{request.adopter_name} requested for {request.pet.name}</div>
                  <br />
                  <hr />
                  <hr />
                  <br />
                  <ul className="list-disc pl-4">
                    <li className="text-lg mb-2"><strong>Contact:</strong> {request.contact_number}</li>
                    <li className="text-lg mb-2"><strong>Location:</strong> {request.address}</li>
                    <li className="text-lg mb-2"><strong>Pet Experience: </strong> {request.has_pet ? 'Yes' : 'No'}</li>
                    <li className="text-lg mb-2"><strong>Reason for adoption:</strong> {request.reason_for_adoption}</li>
                  </ul>
                  <div className="flex items-center justify-between mt-4">
                    {/* Add ContactButton and Visit Profile button here */}
                  </div>
                </div>
                    <Link href={`/useraccount/${request.created_by}`}>
                      <button className="bg-sky-900 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline relative overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-sky-950 hover:text-gray-100">
                        Visit Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No adoption requests found.</div>
          )}
        </div>
      </div>
    );
    
}  
export default MyPetResponsesPage;