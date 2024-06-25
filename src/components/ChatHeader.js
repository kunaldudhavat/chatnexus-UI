import React from 'react';
import { BiVideo, BiPhone, BiSearch } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';

const ChatHeader = ({ chatName, status }) => {
    return (
        <div className="flex items-center justify-between p-4 h-16 bg-gray-900 text-white border-b border-gray-700">
            <div className="flex items-center space-x-4">
                <div className="bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center">
                    <FiUser className="text-2xl text-gray-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{chatName}</h3>
                    <p className="text-sm text-gray-400">{status}</p>
                </div>
            </div>
            <div className="flex space-x-4">
                <BiVideo className="text-2xl cursor-pointer" />
                <BiPhone className="text-2xl cursor-pointer" />
                <BiSearch className="text-2xl cursor-pointer" />
            </div>
        </div>
    );
};

export default ChatHeader;
