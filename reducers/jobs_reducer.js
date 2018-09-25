import {
    FETCH_JOBS
} from '../actions/types';

const INITIAL_STATE = {
    results: []
};

// fetch the list of jobs returned by indeed api
export default function(state = INITIAL_STATE, action){
    switch (action.type){
        case FETCH_JOBS:
            // this will replace the jobs in the current list
            // if we want to append we can do that here as well
            return action.payload;
        default:
            return state;
    }
}