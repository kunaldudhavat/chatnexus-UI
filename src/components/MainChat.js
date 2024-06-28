// src/components/MainChat.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWebSocket } from '../hooks/useWebSocket';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import SearchSidebar from './SearchSidebar';
import { fetchChats, setCurrentChat } from '../actions/chatActions';
import { setSearchResults } from '../actions/searchActions';

const MainChat = () => {
    const dispatch = useDispatch();
    const currentChat = useSelector((state) => state.chat.currentChat);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    useWebSocket();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedChats = await dispatch(fetchChats());
            const storedChatId = localStorage.getItem('currentChatId');
            if (storedChatId && fetchedChats.length > 0) {
                dispatch(setCurrentChat(parseInt(storedChatId)));
            }
        };
        fetchData();
    }, [dispatch]);

    const handleSearchClick = () => {
        setIsSearchOpen(true);
        dispatch(setSearchResults([])); // Reset search results when opening the search sidebar
    };

    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar />
            <div className="border-l border-gray-700 flex flex-1 relative">
                <div className={`flex flex-col flex-1 ${isSearchOpen ? 'border-r border-gray-700' : ''}`}>
                    {currentChat ? (
                        <>
                            <ChatHeader onSearchClick={handleSearchClick} />
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
                {isSearchOpen && (
                    <div className="w-96 h-full">
                        <SearchSidebar onClose={() => setIsSearchOpen(false)} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainChat;
