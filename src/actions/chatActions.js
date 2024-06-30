import { chatApi } from '../api/api';
import { handleApiError } from '../api/api';

export const SET_CHATS = 'SET_CHATS';
export const ADD_CHAT = 'ADD_CHAT';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
export const UPDATE_CHAT_LATEST_MESSAGE = 'UPDATE_CHAT_LATEST_MESSAGE';

export const fetchChats = () => async (dispatch, getState) => {
    try {
        const response = await chatApi.getUserChats();

        if (!Array.isArray(response.data)) {
            throw new Error('Invalid response format');
        }

        const currentUser = getState().auth.user;

        if (!currentUser) {
            console.error('Current user is not defined');
            return;
        }

        const chatsWithLatestMessages = response.data.map(chat => {
            const latestMessage = chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
            console.log('Processing chat:', chat);
            return {
                ...chat,
                isGroup: chat.group,
                chatName: chat.group ? (chat.chatName || 'Unnamed Group') : chat.users.find(user => user.id !== currentUser.id)?.name || 'User',
                latestMessage: latestMessage ? { ...latestMessage, timestamp: new Date(latestMessage.timestamp) } : null
            };
        });

        dispatch({ type: SET_CHATS, payload: chatsWithLatestMessages });
        return chatsWithLatestMessages;
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error fetching chats:', errorMessage);
        throw error;
    }
};

export const createChat = (userId) => async (dispatch) => {
    try {
        const response = await chatApi.createChat(userId);
        const newChat = { ...response.data, latestMessage: null, isGroupChat: false };
        dispatch({ type: ADD_CHAT, payload: newChat });
        dispatch({ type: SET_CURRENT_CHAT, payload: newChat });
        return newChat;
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error creating chat:', errorMessage);
        throw error;
    }
};

export const createGroupChat = (groupData) => async (dispatch) => {
    try {
        const response = await chatApi.createGroupChat(groupData);
        const newGroupChat = {
            ...response.data,
            latestMessage: null,
            isGroupChat: true,
            chatName: groupData.chatName || response.data.chatName || 'Unnamed Group'
        };
        dispatch({ type: ADD_CHAT, payload: newGroupChat });
        dispatch({ type: SET_CURRENT_CHAT, payload: newGroupChat });
        return newGroupChat;
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error creating group chat:', errorMessage);
        throw error;
    }
};

export const setCurrentChat = (chatId) => async (dispatch, getState) => {
    try {
        const { chats } = getState().chat;
        let currentChat = chats.find(chat => chat.id === chatId);

        if (!currentChat) {
            const response = await chatApi.getChatById(chatId);
            currentChat = response.data;
        }

        dispatch({ type: SET_CURRENT_CHAT, payload: currentChat });
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error setting current chat:', errorMessage);
    }
};

export const updateChatLatestMessage = (chatId, message) => ({
    type: UPDATE_CHAT_LATEST_MESSAGE,
    payload: { chatId, message }
});
