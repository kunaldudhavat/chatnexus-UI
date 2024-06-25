import {
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    LOGOUT
} from '../actions/authActions';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        case SIGN_UP_FAIL:
        case SIGN_IN_FAIL:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null
            };
        default:
            return state;
    }
};

export default authReducer;
