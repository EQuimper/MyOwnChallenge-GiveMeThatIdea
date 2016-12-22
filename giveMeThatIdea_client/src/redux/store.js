import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import promise from 'redux-promise-middleware';
import reducers from './reducers';
import { loadState, saveState } from '../helpers/localStorage';

const routingMiddleware = routerMiddleware(browserHistory);

const persistedState = loadState();

const middlewares = [
  promise(),
  thunk,
  routingMiddleware
];

const middlewareDev = [
  createLogger()
];

// Set var for all the middleware + redux chrome extension
let enhancers;

if (process.env.NODE_ENV !== 'production') {
  enhancers = compose(
    applyMiddleware(...middlewares, ...middlewareDev),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
} else {
  enhancers = compose(applyMiddleware(...middlewares));
}

// Create the store with the (reducer, initialState, compose)
const store = createStore(
  reducers,
  persistedState,
  enhancers
);

store.subscribe(throttle(() => saveState({
  auth: store.getState().auth
}), 1000));

// Make the history work with browserHistory
export const history = syncHistoryWithStore(browserHistory, store);

export { store };
