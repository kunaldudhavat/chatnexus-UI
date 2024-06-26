// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiBot, BiPlus, BiDotsVerticalRounded, BiSearch } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { Menu } from '@headlessui/react';
import { ResizableBox } from 'react-resizable';
import { HiChat } from "react-icons/hi";
import { fetchChats, createChat, setCurrentChat } from '../actions/chatActions';
import { userApi } from '../api/api';
import { logout } from '../actions/authActions';
import Profile from './Profile';
import 'react-resizable/css/styles.css';

const Sidebar = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chat.chats);
    const currentUser = useSelector((state) => state.auth.user);
    const currentChat = useSelector((state) => state.chat.currentChat);

    useEffect(() => {
        dispatch(fetchChats());

        // Retrieve the stored chat ID from local storage
        const storedChatId = localStorage.getItem('currentChatId');
        if (storedChatId) {
            dispatch(setCurrentChat(parseInt(storedChatId)));
        }
    }, [dispatch]);

    useEffect(() => {
        // Store the current chat ID in local storage
        if (currentChat) {
            localStorage.setItem('currentChatId', currentChat.id);
        }
    }, [currentChat]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('currentChatId');
    };

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            try {
                const response = await userApi.searchUsers(query);
                const filteredResults = response.data.filter(user => user.id !== currentUser.id);
                setSearchResults(filteredResults);
            } catch (error) {
                console.error('Error searching users:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleUserClick = async (userId) => {
        try {
            const newChat = await dispatch(createChat(userId));
            dispatch(setCurrentChat(newChat.id));
            setSearchQuery('');
            setSearchResults([]);
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    };

    const handleChatClick = (chatId) => {
        dispatch(setCurrentChat(chatId));
    };

    // Debugging logs
    console.log('Sidebar: chats:', chats);

    return (
        <ResizableBox
            width={400}
            height={Infinity}
            minConstraints={[300, Infinity]}
            maxConstraints={[600, Infinity]}
            axis="x"
            resizeHandles={['e']}
            className="bg-gray-900 text-white flex flex-col"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 h-16 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                        <HiChat className="text-3xl" />
                        <h2 className="text-xl font-bold">ChatNexus</h2>
                    </div>
                    <div className="flex space-x-3">
                        <BiBot className="text-2xl cursor-pointer" />
                        <BiPlus className="text-2xl cursor-pointer" />
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full text-sm font-medium text-white">
                                    <BiDotsVerticalRounded className="text-2xl cursor-pointer" />
                                </Menu.Button>
                            </div>
                            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 border border-gray-700 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => setShowProfile(true)}
                                                className={`${
                                                    active ? 'bg-gray-700 text-white' : 'text-gray-300'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            >
                                                Profile
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${
                                                    active ? 'bg-gray-700 text-white' : 'text-gray-300'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            >
                                                Create a Group
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogout}
                                                className={`${
                                                    active ? 'bg-gray-700 text-white' : 'text-gray-300'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            >
                                                Log out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
                {showProfile ? (
                    <Profile closeProfile={() => setShowProfile(false)} />
                ) : (
                    <>
                        <div className="p-4 border-b border-gray-700">
                            <div className="relative">
                                <BiSearch className="absolute top-3 left-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search or start new chat"
                                    className="w-full bg-gray-800 rounded-full p-2 pl-10 text-white focus:outline-none"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {searchResults.length > 0 ? (
                                searchResults.map((user) => (
                                    <div
                                        key={user.id}
                                        className={`p-4 flex items-center justify-between cursor-pointer ${
                                            currentChat && currentChat.users.some(u => u.id === user.id)
                                                ? 'bg-gray-700'
                                                : 'hover:bg-gray-700'
                                        }`}
                                        onClick={() => handleUserClick(user.id)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center">
                                                <FiUser className="text-2xl text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                                <p className="text-sm text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : chats.length > 0 ? (
                                chats
                                    .filter(chat => chat.users.some(user => user.id !== currentUser.id)) // Filter out chats with only the current user
                                    .map((chat) => (
                                        <div
                                            key={chat.id}
                                            className={`p-4 flex items-center justify-between cursor-pointer ${
                                                currentChat && currentChat.id === chat.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                                            }`}
                                            onClick={() => handleChatClick(chat.id)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center">
                                                    <FiUser className="text-2xl text-gray-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold">
                                                        {chat.isGroupChat ? chat.chatName : chat.users.find(user => user.id !== currentUser.id).name}
                                                    </h3>
                                                    <p className="text-sm text-gray-400">
                                                        {chat.latestMessage ? `${chat.latestMessage.content} - ${new Date(chat.latestMessage.timestamp).toLocaleTimeString()}` : 'No messages yet'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    No chats available
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </ResizableBox>
    );
};

export default Sidebar;
