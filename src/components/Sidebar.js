import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiBot, BiPlus, BiDotsVerticalRounded, BiSearch } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { Menu } from '@headlessui/react';
import { ResizableBox } from 'react-resizable';
import Profile from './Profile';
import { fetchChats } from '../actions/chatActions';
import { logout } from '../actions/authActions'; // Import logout action
import 'react-resizable/css/styles.css';
import { HiChat } from 'react-icons/hi';

const Sidebar = () => {
    const [showProfile, setShowProfile] = useState(false);
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chat.chats);

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <ResizableBox
            width={400} // Adjusted width
            height={Infinity}
            minConstraints={[300, Infinity]} // Adjusted minimum width
            maxConstraints={[600, Infinity]} // Adjusted maximum width
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
                                                onClick={handleLogout} // Add the logout handler here
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
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {chats.map((chat) => (
                                <div key={chat.id} className="p-4 flex items-center justify-between hover:bg-gray-700 cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center">
                                            <FiUser className="text-2xl text-gray-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{chat.name}</h3>
                                            <p className="text-sm text-gray-400">{chat.lastMessage}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-400">{new Date(chat.updatedAt).toLocaleTimeString()}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </ResizableBox>
    );
};

export default Sidebar;
