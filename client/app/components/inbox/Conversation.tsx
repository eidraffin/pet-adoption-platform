'use client';

import { useRouter } from "next/navigation";

import { ConversationType } from "@/app/inbox/page";


interface ConversationProps {
    conversation: ConversationType;
    userId: string;
}


const Conversation: React.FC<ConversationProps> = ({
    conversation,
    userId
}) => {
  
    const router = useRouter();
    const otherUser = conversation.users.find((user) => user.id != userId) //{otherUser?.name}

    return (
        
        <div className="px-4 py-4 cursor-pointer border border-gray-300 rounded-xl shadow-inner">

            <p className="mb-6 text-xl font-medium">{otherUser?.name ? otherUser?.name.toUpperCase() : 'Anonymous User'}</p>

            <p 
                onClick={() => router.push(`/inbox/${conversation.id}`)}
                className="text-sky-800 font-semibold"
            >
                Go to conversation
            </p>
        </div>
    )
}

export default Conversation;