import { authApi } from '../api/api';

export const signUp = (data) => async (dispatch) => {
    try {
        const response = await authApi.signUp(data);
        const token = response.data.token;
        localStorage.setItem('token', token);
        dispatch({ type: 'SIGN_UP_SUCCESS', payload: token });
    } catch (error) {
        dispatch({ type: 'SIGN_UP_FAIL', payload: error.response.data });
    }
};

export const signIn = (data) => async (dispatch) => {
    try {
        const response = await authApi.signIn(data);
        const token = response.data.token;
        localStorage.setItem('token', token);
        dispatch({ type: 'SIGN_IN_SUCCESS', payload: token });
    } catch (error) {
        dispatch({ type: 'SIGN_IN_FAIL', payload: error.response.data });
    }
};

export const signOut = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: 'SIGN_OUT' });
};
