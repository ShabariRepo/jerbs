// index store
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers'; // do not have to specify index.js

const store = createStore(
    reducers, // number of reducers
    {}, // default state empty in the beginning
    compose( // applies all the middle ware used in the app
        applyMiddleware(thunk)
    )
);

export default store;