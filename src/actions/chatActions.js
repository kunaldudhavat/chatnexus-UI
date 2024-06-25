import { chatApi } from '../api/api';

export const fetchChats = () => async (dispatch) => {
    try {
        const response = await chatApi.getChats();
        dispatch({ type: 'FETCH_CHATS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_CHATS_FAIL', payload: error.response.data });
    }
};
