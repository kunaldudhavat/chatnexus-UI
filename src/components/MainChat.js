import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWebSocket } from '../hooks/useWebSocket';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { fetchChats, setCurrentChat } from '../actions/chatActions';

const MainChat = () => {
    const dispatch = useDispatch();
    const currentChat = useSelector((state) => state.chat.currentChat);
    useWebSocket();

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching chats in MainChat...");
            const fetchedChats = await dispatch(fetchChats());
            console.log("Fetched chats: ", fetchedChats);
            const storedChatId = localStorage.getItem('currentChatId');
            console.log("Stored chat ID in MainChat: ", storedChatId);
            if (storedChatId && fetchedChats.length > 0) {
                dispatch(setCurrentChat(parseInt(storedChatId)));
            }
        };
        fetchData();
    }, [dispatch]);

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
