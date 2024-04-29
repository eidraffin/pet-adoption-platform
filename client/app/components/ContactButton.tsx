'use client';

import useLoginModal from "../hooks/useLoginModal";

import { useRouter } from "next/navigation";

import apiService from "../services/apiService";


interface ContactButtonProps {
    userId: string | null;
    useraccountId: string;
}


const ContactButton: React.FC<ContactButtonProps> = ({
    userId,
    useraccountId

}) => {

    const loginModal = useLoginModal();

    const router = useRouter();

    const startConversation = async () => {
        if (userId) {
            const conversation = await apiService.get(`/api/chat/start/${useraccountId}/`)

            if (conversation.conversation_id) {
                router.push(`/inbox/${conversation.conversation_id}`)
            }
            
        } else {
            loginModal.open();
        }
    }

    return (

        <div 
            onClick={startConversation}
            className="mt-6 py-4 px-6 cursor-pointer font-semibold bg-sky-900 text-white rounded-xl hover:bg-sky-950 transition-transform hover:scale-105"
        >
            Message
        </div>
        
    )
}

export default ContactButton;