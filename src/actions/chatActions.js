// src/actions/chatActions.js
import { chatApi } from '../api/api';
import { handleApiError } from '../api/api';

export const SET_CHATS = 'SET_CHATS';
export const ADD_CHAT = 'ADD_CHAT';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';

export const fetchChats = () => async (dispatch, getState) => {
    try {
        const response = await chatApi.getUserChats();
        const currentUser = getState().auth.user;

        const chatsWithLatestMessages = response.data
            .map(chat => {
                const latestMessage = chat.messages[chat.messages.length - 1];
                return { ...chat, latestMessage };
            })
            .filter(chat => chat.users.some(user => user.id !== currentUser.id)); // Filter out chats with only the current user

        dispatch({ type: SET_CHATS, payload: chatsWithLatestMessages });
    } catch (error) {
        const errorMessage = handleApiError(error);
    }
};

export const createChat = (userId) => async (dispatch) => {
    try {
        const response = await chatApi.createChat(userId);
        const newChat = { ...response.data, latestMessage: null };
        dispatch({ type: ADD_CHAT, payload: newChat });
        dispatch({ type: SET_CURRENT_CHAT, payload: newChat });
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error creating chat:', errorMessage);
    }
};

export const setCurrentChat = (chatId) => async (dispatch) => {
    try {
        const response = await chatApi.getChatById(chatId);
        const currentChat = response.data;
        dispatch({ type: SET_CURRENT_CHAT, payload: currentChat });
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error setting current chat:', errorMessage);
    }
};
