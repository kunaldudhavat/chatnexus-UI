import React from 'react';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';

const HomePage = () => {
    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar />
            <div className="border-l border-gray-700 flex flex-col flex-1">
                <ChatHeader chatName="John Doe" status="Online" />
                <ChatMessages />
                <MessageInput />
            </div>
        </div>
    );
};

export default HomePage;
