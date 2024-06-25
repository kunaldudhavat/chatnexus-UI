import React, { useState } from 'react';
import { FiPaperclip, FiSmile, FiSend } from 'react-icons/fi';

const MessageInput = () => {
    const [message, setMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Send message logic here
            setMessage('');
        }
    };

    return (
        <form className="flex items-center p-4 bg-gray-900 border-t border-gray-700" onSubmit={sendMessage}>
            <input
                type="text"
                placeholder="Type a message"
                className="flex-1 p-2 rounded-lg bg-gray-800 text-white focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex space-x-4 items-center ml-4">
                <FiPaperclip className="text-2xl cursor-pointer text-gray-400" />
                <FiSmile className="text-2xl cursor-pointer text-gray-400" />
                <button type="submit" className="focus:outline-none">
                    <FiSend className="text-2xl cursor-pointer text-gray-400" />
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
