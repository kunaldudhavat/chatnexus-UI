import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../actions/messageActions';
import { FiPaperclip, FiSmile, FiSend } from 'react-icons/fi';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const currentChat = useSelector((state) => state.chat.currentChat);
    const currentUser = useSelector((state) => state.auth.user);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() && currentChat && currentUser) {
            const newMessage = {
                chatId: currentChat.id,
                senderId: currentUser.id,
                content: message,
            };
            const response = await dispatch(sendMessage(newMessage));
            console.log('handleSendMessage response:', response); // Log the response
            setMessage('');
        }
    };

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
