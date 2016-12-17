import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducers from './reducers';
import { loadState, saveState } from '../helpers/localStorage';

const routingMiddleware = routerMiddleware(browserHistory);

const persistedState = loadState();

const middlewares = [
  createLogger(),
  thunk,
  routingMiddleware
];

// Set var for all the middleware + redux chrome extension
const enhancers = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

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
