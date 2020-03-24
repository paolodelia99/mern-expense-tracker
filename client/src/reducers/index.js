import { combineReducers } from 'redux';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import alert from './AlertReducer'

export default combineReducers({
    auth,
    profile,
    alert
});