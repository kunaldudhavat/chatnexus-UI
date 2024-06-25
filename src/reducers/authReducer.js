const initialState = {
    token: localStorage.getItem('token') || null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_UP_SUCCESS':
        case 'SIGN_IN_SUCCESS':
            return { ...state, token: action.payload, error: null };
        case 'SIGN_UP_FAIL':
        case 'SIGN_IN_FAIL':
            return { ...state, error: action.payload };
        case 'SIGN_OUT':
            return { ...state, token: null, error: null };
        default:
            return state;
    }
};

export default authReducer;
