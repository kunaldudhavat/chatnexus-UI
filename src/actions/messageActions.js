import { messageApi } from '../api/api';
import { handleApiError } from '../api/api';

export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const fetchMessages = (chatId) => async (dispatch) => {
    try {
        const response = await messageApi.getMessages(chatId);
        console.log('fetchMessages: response.data:', response.data); // Log the data
        dispatch({ type: SET_MESSAGES, payload: response.data });
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error fetching messages:', errorMessage);
    }
};

export const sendMessage = (data) => async (dispatch) => {
    try {
        const response = await messageApi.sendMessage(data);
        console.log('sendMessage: response.data:', response.data); // Log the data
        dispatch({ type: ADD_MESSAGE, payload: response.data });
    } catch (error) {
        const errorMessage = handleApiError(error);
        console.error('Error sending message:', errorMessage);
    }
};
