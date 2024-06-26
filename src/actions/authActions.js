import { authApi, userApi } from '../api/api';

// Action Types
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';

export const loginSuccess = (token) => ({
    type: SIGN_IN_SUCCESS,
    payload: token,
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const fetchUser = () => async (dispatch) => {
    try {
        const response = await userApi.getProfile(); // Updated to use userApi
        dispatch(setUser(response.data));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export const signIn = (data) => async (dispatch) => {
    try {
        const response = await authApi.signIn(data);
        localStorage.setItem('token', response.data.token);
        dispatch(loginSuccess(response.data.token));
        dispatch(fetchUser());
    } catch (error) {
        dispatch({ type: SIGN_IN_FAIL, payload: error.response.data });
    }
};

export const signUp = (data) => async (dispatch) => {
    try {
        const response = await authApi.signUp(data);
        localStorage.setItem('token', response.data.token);
        dispatch({ type: SIGN_UP_SUCCESS, payload: response.data.token });
        dispatch(fetchUser());
    } catch (error) {
        dispatch({ type: SIGN_UP_FAIL, payload: error.response.data });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
};
