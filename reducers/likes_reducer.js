import _ from 'lodash';
import { REHYDRATE } from 'redux-persist';
import { 
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from "../actions/types";

export default function (state = [], action) {
    switch(action.type){
        case REHYDRATE:
            return action.payload.likedJobs || [];
        case LIKE_JOB:
            // this uses lodash to return an array of job the person liked & all the jobs the person liked before
            // comparing the keys by jobkey
            // only return the unique jobs found between the two
            return _.uniqBy([
                action.payload, ...state
            ], 'jobkey');
        case CLEAR_LIKED_JOBS:
            return []; // blow away the existing list of saved jobs
        default:
            return state;
    }
}