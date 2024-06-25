import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Change this line to import `thunk` as a named export
import authReducer from '../reducers/authReducer';
import chatReducer from '../reducers/chatReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    // Add other reducers here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
