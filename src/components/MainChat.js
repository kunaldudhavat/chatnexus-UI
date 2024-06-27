import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';

const MainChat = () => {
    const currentChat = useSelector((state) => state.chat.currentChat);
    const currentUser = useSelector((state) => state.auth.user);
    // Log currentChat to see if it's being set

    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar />
            <div className="border-l border-gray-700 flex flex-col flex-1">
                {currentChat ? (
                    <>
                        <ChatHeader />
                        <ChatMessages />
                        <MessageInput />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-white">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-2">Welcome to ChatNexus</h2>
                            <p>Select a chat or start a new conversation</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainChat;
