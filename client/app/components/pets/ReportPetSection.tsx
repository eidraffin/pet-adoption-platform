'use client'

import React, { useState } from 'react';
import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';

export type Pet ={
    id: string;
}


interface ReportPetSectionProps {
    userId: string | null;
    pet: Pet;
}

const ReportPetSection: React.FC<ReportPetSectionProps> = ({ pet, userId }) => {
    const loginModal = useLoginModal();
    const [dataReport, setDataReport] = useState('');


//=========================success message============================
    const showMessage = (isSuccess: boolean) => {
        let message, textColor;
        if (isSuccess) {
            message = "Report submitted successfully";
            textColor = "text-blue-700";
        } else {
            message = "Something went wrong. Please try again later.";
            textColor = "text-red-700"; 
        }
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 bg-white ${textColor} p-2 rounded-xl shadow-xl font-semibold`;
        notification.textContent = message;
        document.body.appendChild(notification);
    
        // Hide message after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    };

//=======================================================================================

    const performReport = async () => {
        if (userId) {
            if (dataReport) {
                const formData = new FormData();
                formData.append('report_message', dataReport);
                
                const response = await apiService.post(`/api/pets/${pet.id}/report/`, formData);

                if (response.success) {
                    console.log('report successful');
                    showMessage(true);
                } else {
                    console.log('something went wrong...');
                    showMessage(false);
                }
            }
        } else {
            loginModal.open();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performReport();
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDataReport(e.target.value);
    };

    return (
        <div className="py-6 flex items-center space-y-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-20"
            >
                <textarea
                    placeholder="report any discrepancies..."
                    className="w-full rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    value={dataReport}
                    onChange={handleChange}
                ></textarea>

                <input
                    type="submit"
                    className="px-2.5 py-1.5 rounded-md text-white text-sm bg-red-800 hover:bg-black"
                    value="Report"
                />
            </form>
        </div>
    );
};

export default ReportPetSection;
