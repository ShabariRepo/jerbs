import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
    FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL
} from './types';

const appId = '2291451647545234';

// how to use AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token);

// redux is dumped when user closes app
// so to persist data save to async storage
// async storage is like LOCAL STORAGE from browser

// instead of async function(dispatch)
// if there is a single argument passed in then you don't need the parenthesis
export const facebookLogin = () => async dispatch => {
    // redux thunk says you can return a function from action creator and thunk will call the function and pass dispatch
    let token = await AsyncStorage.getItem('fb_token');
    
    if (token) {
        console.log(token);
        // if token exists dispatch an action saying FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        // else start FB login process
        doFacebookLogin(dispatch);
    }
};

// handle the opening of the modal and login
// async is earlier cuz its just one function compared to the above
const doFacebookLogin = async dispatch => {
    // first arg is app id and second is the permissions, could ask for more but basic is public_profile
    // result from facebook shows type and token property (was originally let type = )
    let fb_response = await Facebook.logInWithReadPermissionsAsync(appId, {
        permissions: ['public_profile']
    });

    //console.log(fb_response);
    //if the user enters incorrect then its a bust or they cancelled
    if(fb_response.type === 'cancel'){
        // dispatch is given by redux-thunk
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    // else save the token to the AsyncStorage & dispatch action success
    await AsyncStorage.setItem('fb_token', fb_response.token);

    // dont really have to wait for the above so can remove the await for performance
    // just best practice to wait
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: fb_response.token });
};