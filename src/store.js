import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import promise from 'redux-promise';
import {logger } from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(debug) {

    const middleware = debug ? [thunk, promise, logger ] : [thunk, promise ];
    const store = createStore(rootReducer, composeWithDevTools(
        applyMiddleware(...middleware)
    ));

    return store;
};

