import { getUserId } from "../lib/actions";

import apiService from "../services/apiService";

import React, { useState, useEffect } from 'react';

import Conversation from "../components/inbox/Conversation";

export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
}

export type ConversationType = {
    id: string;
    users: UserType[];
}

const InboxPage = async () => {
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You aren't authenticated...</p>
            </main>
        )
    }

    const conversations = await apiService.get('/api/chat/')

    return (

        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            
            <div className="relative">
                <h1 className="my-6 text-4xl font-bold text-stone-800 inline-block relative z-10">Conversation</h1>
                <div className="absolute w-full h-2 bg-sky-900 bottom-0 left-0 z-0"></div>
            </div>

            {conversations.map((conversation: ConversationType) => {

                return (
                    <Conversation 
                        userId={userId}
                        key={conversation.id}
                        conversation={conversation}
                    />
                )
            })}

        </main>
    )
}

export default InboxPage;