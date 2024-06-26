// src/components/ChatMessages.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../actions/messageActions';

const ChatMessages = () => {
    const dispatch = useDispatch();
    const currentChat = useSelector((state) => state.chat.currentChat);
    const messages = useSelector((state) => state.message.messages);
    const currentUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (currentChat) {
            dispatch(fetchMessages(currentChat.id));
        }
    }, [currentChat, dispatch]);

    if (!currentChat) {
        return (
            <div className="flex-1 p-4 flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Welcome to ChatNexus</h2>
                    <p>Select a chat or start a new conversation</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
            <div className="flex flex-col space-y-2">
                {messages && messages.length > 0 ? (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${
                                message.user.id === currentUser.id ? 'self-end bg-green-600' : 'self-start bg-gray-800'
                            } text-white p-3 rounded-lg max-w-xs`}
                        >
                            <p>{message.content}</p>
                            <span className="text-xs text-gray-400 block mt-1">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400">No messages yet</div>
                )}
            </div>
        </div>
    );
};

export default ChatMessages;
