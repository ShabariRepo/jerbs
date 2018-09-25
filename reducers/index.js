import { combineReducers } from "redux";

// redux should always have at least one reducer by default
// reducer cannot return nothing it HAS to return an object in this case at least empty one
export default combineReducers({
    auth: () => {
        return {}
    }
});