import { combineReducers } from 'redux';
import AuthReducer from './authSlice';
import UserReducer from './userSlice';
import FriendReducer from './friendSlice';

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    friend: FriendReducer,
});

export default rootReducer