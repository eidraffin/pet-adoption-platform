'use client'

import React, { useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import useAdoptionRequestModal from "@/app/hooks/useAdoptionRequestModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

export type Pet = {
  id: string;
  adopter_name: string;
  address: string;
  contact_number: string;
  has_pet: boolean;
  reason_for_adoption: string;
};

interface AdoptionRequestModalProps {
  userId: string | null;
  pet: Pet;
}

const AdoptionRequestModal: React.FC<AdoptionRequestModalProps> = ({
  pet,
  userId,

}) => {
  const loginModal = useLoginModal();
  const adoptionRequestModal = useAdoptionRequestModal();
  const router = useRouter(); 

  const [dataAdopter, setDataAdopter] = useState('');
  const [dataAddress, setDataAddress] = useState('');
  const [dataContact, setDataContact] = useState('');
  const [dataHasPet, setDataHasPet] = useState(false);
  const [dataReasonForAdoption, setDataReasonForAdoption] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

//======================== success toast message ============================

const showMessage = (isSuccess: boolean) => {
    let message, textColor;
    if (isSuccess) {
        message = "Adoption request successful";
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
    }, 3000);
};
//=================================================


  const performAdoptionRequest = async () => {
    if (!userId) {
      loginModal.open();
      return; 
    }

    if (!dataAdopter || !dataAddress || !dataContact || !dataReasonForAdoption) {
      setErrorMessage('Please fill out all fields.');
      return; 
    }

    const formData = new FormData();
    formData.append('adopter_name', dataAdopter);
    formData.append('address', dataAddress);
    formData.append('contact_number', dataContact);
    formData.append('has_pet', String(dataHasPet));
    formData.append('reason_for_adoption', dataReasonForAdoption);

    try {
      const response = await apiService.post(
        `/api/pets/${pet.id}/adopt/`,
        formData
      );

      if (response.success) {
        console.log("Adoption request successful");
        router.push(`/pets/${pet.id}?adoption_request=true`);
        adoptionRequestModal.close()
        showMessage(true);

      } else {
        console.error("Adoption request failed");
        showMessage(false);

      }
    } catch (error) {
      console.error("Error performing adoption request:", error);

    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
  
    if (type === "checkbox") {
      setDataHasPet((e.target as HTMLInputElement).checked);
    } else {
      switch(name) {
        case "adopter_name":
          setDataAdopter(value);
          break;
        case "address":
          setDataAddress(value);
          break;
        case "contact_number":
          setDataContact(value);
          break;
        case "reason_for_adoption":
          setDataReasonForAdoption(value);
          break;
        default:
          break;
      }
    }
  };


  return (
    <Modal
      isOpen={adoptionRequestModal.isOpen}
      close={adoptionRequestModal.close}
      label="Adoption Request Form"
      content={

        <>
          <h2 className="mb-6 text-2xl font-semibold">Fill up this form</h2>
          {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

          <div className="pt-3 pb-6 space-y-4">

            <div className="flex flex-col space-y-2">
              <label>Your Name</label>
              <input
                type="text"
                name="adopter_name"
                value={dataAdopter}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label>Contact number</label>
              <input
                type="number"
                name="contact_number"
                value={dataContact}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label>Your address</label>
              <input
                type="text"
                name="address"
                value={dataAddress}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label>Do you currently have any pets?</label>
              <select
                value={String(dataHasPet)}
                onChange={handleInputChange}
                name="has_pet"
                className="w-full p-4 border border-gray-600 rounded-xl"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label>Reason for adoption?</label>
              <textarea
                name="reason_for_adoption"
                value={dataReasonForAdoption}
                onChange={handleInputChange}
                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
              ></textarea>
            </div>
          </div>

          <CustomButton
            label="Submit"
            onClick={performAdoptionRequest}
            />

        </>
      }

    />

  );
  
};

export default AdoptionRequestModal;
