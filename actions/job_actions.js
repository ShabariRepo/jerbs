import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
    FETCH_JOBS
} from './types';

const JOB_ROOT_URL = 'https://api.indeed.com/ads/apisearch?';
// const for query params for indeed
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1, // make sure to include lat long for each job returned
    radius: 10, // in miles
    q: 'javascript'
};

// helper function to create the query string with qs
const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOB_ROOT_URL}${query}`;
}

// because its a network call its an async action creator (redux thunk)
    // whenever we return a function with an action creator with redux thunk
    // function will be called with the dispatcher
export const fetchJobs = (region) => async dispatch => {
    try{
        let zip = await reverseGeocode(region);
        const url = buildJobsUrl(zip);
        // what we want is nested in a property called data so deconstruct from it
        let { data } = await axios.get(url);
        console.log(data);

        // call dispatcher to update the payload
        dispatch({ type: FETCH_JOBS, payload: data });
    } catch(err){
        console.log(err);
    }

    // make a request to indeed using axios
};