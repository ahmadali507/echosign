import { combineReducers } from 'redux';
import AuthReducer from './authSlice';

const rootReducer = combineReducers({
    auth: AuthReducer,
});
 
export default rootReducer