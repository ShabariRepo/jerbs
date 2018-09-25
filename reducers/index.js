import { combineReducers } from "redux";
import auth from './auth_reducer';

// redux should always have at least one reducer by default
// reducer cannot return nothing it HAS to return an object in this case at least empty one
export default combineReducers({
    auth // same as auth: auth es6
});