import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WebSocketService from '../services/WebSocketService';
import { FiPaperclip, FiSmile, FiSend } from 'react-icons/fi';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const currentChat = useSelector((state) => state.chat.currentChat);
    const currentUser = useSelector((state) => state.auth.user);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && currentChat && currentUser) {
            const messageData = {
                content: message,
                chatId: currentChat.id,
                userId: currentUser.id,
                timestamp: new Date().toISOString(),
            };

            // Send message via WebSocket
            WebSocketService.sendMessage('/app/message', messageData);

            // Clear input field
            setMessage('');
        }
    };

    if (!currentChat) {
        return null;
    }

    return (
        <form className="flex items-center p-4 bg-gray-900 border-t border-gray-700" onSubmit={handleSendMessage}>
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