import _ from 'lodash';
import { 
    LIKE_JOB 
} from "../actions/types";

export default function (state = [], action) {
    switch(action.type){
        case LIKE_JOB:
            // this uses lodash to return an array of job the person liked & all the jobs the person liked before
            // comparing the keys by jobkey
            // only return the unique jobs found between the two
            return _.uniqBy([
                action.payload, ...state
            ], 'jobkey')
        default:
            return state;
    }
}