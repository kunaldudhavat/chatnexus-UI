const initialState = {
    chats: [],
    error: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CHATS_SUCCESS':
            return { ...state, chats: action.payload, error: null };
        case 'FETCH_CHATS_FAIL':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default chatReducer;
