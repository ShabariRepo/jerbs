import { combineReducers } from "redux";
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_reducer';

// redux should always have at least one reducer by default
// reducer cannot return nothing it HAS to return an object in this case at least empty one
export default combineReducers({
    auth, // same as auth: auth es6
    jobs,
    likedJobs
});