//import { combineReducers  } from "redux";
import { persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_reducer';

// redux persist v5 fix
const config = {

    key: 'jobkey',
  
    storage: AsyncStorage,
  
    whitelist: ['likedJobs']
  
  };

// redux should always have at least one reducer by default
// reducer cannot return nothing it HAS to return an object in this case at least empty one
export default persistCombineReducers(config, {
    auth, // same as auth: auth es6
    jobs,
    likedJobs
});