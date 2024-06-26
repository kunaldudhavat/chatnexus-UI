import { SET_MESSAGES, ADD_MESSAGE } from '../actions/messageActions';

const initialState = {
    messages: [],
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            console.log('SET_MESSAGES:', action.payload); // Log the data
            return { ...state, messages: action.payload };
        case ADD_MESSAGE:
            console.log('ADD_MESSAGE:', action.payload); // Log the data
            return { ...state, messages: [...state.messages, action.payload] };
        default:
            return state;
    }
};

export default messageReducer;
