import { authApi } from '../api/api';

// Action Types
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const LOGOUT = 'LOGOUT';

// Sign Up Action
export const signUp = (formData) => async (dispatch) => {
    try {
        const response = await authApi.signUp(formData);
        const { token } = response.data;
        localStorage.setItem('token', token);
        dispatch({ type: SIGN_UP_SUCCESS, payload: token });
    } catch (error) {
        dispatch({ type: SIGN_UP_FAIL, payload: error.response.data.message });
    }
};

// Sign In Action
export const signIn = (formData) => async (dispatch) => {
    try {
        const response = await authApi.signIn(formData);
        const { token } = response.data;
        localStorage.setItem('token', token);
        dispatch({ type: SIGN_IN_SUCCESS, payload: token });
    } catch (error) {
        dispatch({ type: SIGN_IN_FAIL, payload: error.response.data.message });
    }
};

// Logout Action
export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
};
