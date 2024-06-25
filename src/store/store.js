import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import chatReducer from '../reducers/chatReducer';
// Import other reducers

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    // Add other reducers here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
