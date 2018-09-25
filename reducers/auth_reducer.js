import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type){
        case FACEBOOK_LOGIN_SUCCESS:
            return { token: action.payload };
        // this one will probably never get called but w.e we'll handle it
        case FACEBOOK_LOGIN_FAIL:
            return { token: null };
        default:
            return state;
    }
}