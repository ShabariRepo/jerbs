import axios from 'axios';

import {
    FETCH_JOBS
} from './types';

// because its a network call its an async action creator (redux thunk)
    // whenever we return a function with an action creator with redux thunk
    // function will be called with the dispatcher
export const fetchJobs = (region) => async dispatch => {
    // make a request to indeed using axios
    
};