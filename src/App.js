import React from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import MessageInput from './components/MessageInput';
import './index.css';

const App = () => {
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

export default App;

