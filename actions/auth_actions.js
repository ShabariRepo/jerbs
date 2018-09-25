import { AsyncStorage } from 'react-native';
import {
    FACEBOOK_LOGIN_SUCCESS
} from './types';

// how to use AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token);
export const facebookLogin = () => {
    // redux is dumped when user closes app
    // so to persist data save to async storage
    // async storage is like LOCAL STORAGE from browser

    return async function (dispatch) {
        // redux thunk says you can return a function from action creator and thunk will call the function and pass dispatch
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            // if token exists dispatch an action saying FB login is done
        } else {
            // else start FB login process

        }
    }
}