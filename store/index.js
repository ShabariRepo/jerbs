// index store
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers'; // do not have to specify index.js
import { Location } from "expo";

const store = createStore(
    reducers, // number of reducers
    {}, // default state empty in the beginning
    compose( // applies all the middle ware used in the app
        applyMiddleware(thunk)
    )
);

// to set api key for google maps api
Location.setApiKey("AIzaSyABug706K7aycanQ10S2TNL86_eKg2DXLY");
// location reverse geocode returns like this
// Array [
//     Object {
//       "city": "Santa Cruz",
//       "country": "USA",
//       "isoCountryCode": "US",
//       "name": "1840a",
//       "postalCode": "95062",
//       "region": "California",
//       "street": "17th Avenue",
//     },

export default store;