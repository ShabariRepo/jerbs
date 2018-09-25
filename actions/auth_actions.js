import { AsyncStorage } from 'react-native';
import {
    FACEBOOK_LOGIN_SUCCESS
} from './types';

// how to use AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token);
export const facebookLogin = async () => {
    // redux is dumped when user closes app
    // so to persist data save to async storage
    // async storage is like LOCAL STORAGE from browser

}