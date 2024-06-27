import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../actions/messageActions';
import WebSocketService from '../services/WebSocketService';

const ChatMessages = () => {
    const dispatch = useDispatch();
    const currentChat = useSelector((state) => state.chat.currentChat);
    const messages = useSelector((state) => state.message.messages);
    const currentUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (currentChat) {
            console.log(`Fetching messages for chat ID: ${currentChat.id}`);
            dispatch(fetchMessages(currentChat.id));

            WebSocketService.connect(() => {
                console.log(`Connected to WebSocket, subscribing to /group/${currentChat.id}`);
                WebSocketService.subscribe(`/group/${currentChat.id}`, (message) => {
                    console.log('Received message via WebSocket:', message);
                    dispatch({ type: 'ADD_MESSAGE', payload: message });
                });
            });

            return () => {
                console.log('Disconnecting from WebSocket');
                WebSocketService.disconnect();
            };
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
                {messages.map((message) => (
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
                ))}
            </div>
        </div>
    );
};

export default ChatMessages;