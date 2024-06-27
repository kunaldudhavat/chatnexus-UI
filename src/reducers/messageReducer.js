import { SET_MESSAGES, ADD_MESSAGE } from '../actions/messageActions';

const initialState = {
    messages: [],
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return { ...state, messages: action.payload };
        case ADD_MESSAGE:
            console.log('Reducer ADD_MESSAGE called with payload:', action.payload);
            return { ...state, messages: [...state.messages, { ...action.payload }] };
        default:
            return state;
    }
};

export default messageReducer;