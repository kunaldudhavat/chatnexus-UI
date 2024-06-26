import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Change this line to import `thunk` as a named export
import authReducer from '../reducers/authReducer';
import chatReducer from '../reducers/chatReducer';
import messageReducer from "../reducers/messageReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
