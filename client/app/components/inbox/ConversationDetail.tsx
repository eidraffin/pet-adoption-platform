'use client';

import { ConversationType } from "@/app/inbox/page";

import useWebSocket, {ReadyState} from "react-use-websocket";

import { useEffect, useState, useRef } from "react";

import { MessageType } from "@/app/inbox/[id]/page";

import { UserType } from "@/app/inbox/page";


interface ConversationDetailProps {
    token: string;
    userId: string;
    conversation: ConversationType;
    messages: MessageType[];
}


const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    messages,
    conversation
    
}) => {

    const messagesDiv = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState('');    
    const myUser = conversation.users?.find((user) => user.id == userId)
    const otherUser = conversation.users?.find((user) => user.id != userId)
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

    //connect to web sockets
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,
      },
    )


    useEffect(() => {
        console.log("Connection state changed", readyState);
    }, [readyState]);    


    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            
            const message: MessageType = {
                id: '',
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                conversationId: conversation.id
            }

            setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
        }


        scrollToBottom();
    }, [lastJsonMessage]);


    const sendMessage = async () => {

        console.log('sendMessage'),

        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id
            }
        });

        setNewMessage('');

        setTimeout(() => {
            scrollToBottom()
        }, 50);

    }

    
    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    }

    
    return (
        <>
            <div 
                ref={messagesDiv}
                className="max-h-[800px] overflow-auto flex flex-col space-y-4"
            >

                {messages.map((message, index) => (
                    <div
                        key={index}
                        
                        className={`w-[80%] py-4 px-6 rounded-full ${message.created_by.name === myUser?.name ? 'ml-[20%] bg-gradient-to-r from-sky-200 to-sky-400' : 'bg-gradient-to-r from-stone-100 to-stone-200'} h-auto`}

                    >
                        <p className="font-bold text-gray-700">{message.created_by.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}

                {realtimeMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`w-[80%] py-4 px-6 rounded-full ${message.name == myUser?.name ? 'ml-[20%] bg-gradient-to-r from-sky-200 to-sky-400' : 'bg-gradient-to-r from-stone-100 to-stone-200'} h-auto`}

                    >
                        <p className="font-bold text-gray-700">{message.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}

            </div>

            <div className="mt-8 py-6 px-6 flex space-x-5 rounded-full">
                <input type="text"
                    placeholder="Type your message..."
                    className="flex-grow p-8 bg-gray-200 rounded-full"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}                   
                />

                <button
                    onClick={sendMessage}
                    className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-700 transition duration-300 ease-in-out"
                    style={{flex: "0 0 13%"}}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="ml-2">Send</span>
                </button>
                                    
               
            </div>
        </>
    )
}

export default ConversationDetail;