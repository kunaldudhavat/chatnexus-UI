// src/reducers/chatReducer.js
import { SET_CHATS, ADD_CHAT, SET_CURRENT_CHAT } from '../actions/chatActions';

const initialState = {
    chats: [],
    currentChat: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS:
            return { ...state, chats: action.payload };
        case ADD_CHAT:
            return { ...state, chats: [...state.chats, action.payload] };
        case SET_CURRENT_CHAT:
            return { ...state, currentChat: action.payload };
        default:
            return state;
    }
};

export default chatReducer;
