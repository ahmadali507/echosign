import { combineReducers } from 'redux';
import AuthReducer from './authSlice';
import UserReducer from './userSlice';
import FriendReducer from './friendSlice';
import ChatReducer from './chatSlice';

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    chat: ChatReducer,
    friend: FriendReducer,
});

export default rootReducer