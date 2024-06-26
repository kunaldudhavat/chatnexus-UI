import { chatApi } from '../api/api';
import { handleApiError } from '../api/api';

export const SET_CHATS = 'SET_CHATS';
export const ADD_CHAT = 'ADD_CHAT';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';

export const fetchChats = () => async (dispatch) => {
    try {
        const response = await chatApi.getUserChats();
        dispatch({ type: SET_CHATS, payload: response.data });
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error fetching chats:', errorMessage);
    }
};

export const createChat = (userId) => async (dispatch) => {
    try {
        const response = await chatApi.createChat(userId);
        dispatch({ type: ADD_CHAT, payload: response.data });
        dispatch({ type: SET_CURRENT_CHAT, payload: response.data });
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error creating chat:', errorMessage);
    }
};

export const setCurrentChat = (chatId) => async (dispatch) => {
    try {
        const response = await chatApi.getChatById(chatId);
        dispatch({ type: SET_CURRENT_CHAT, payload: response.data });
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error setting current chat:', errorMessage);
    }
};
