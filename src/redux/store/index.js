//import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { history } from './history';

import { reducers } from '../reducers';
import * as sagas from './sagas';

let defaultState = {
  session: {},
  users: [],
};

const devMode = process.env.NODE_ENV === 'development';
//const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, routeMiddleware, sagaMiddleware];

if (devMode) {
  middlewares.push(logger);
}

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  const store = createStore(reducers(history), initialState, bindMiddleware(middlewares));
  for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
  }
  return store;
}
export default configureStore;
export { history };

/*
function configureStore1(preloadedState = defaultState) {
  const store = configureStore({
    reducers(history),
    devTools: devMode,
    middlewares,
    preloadedState,
  });
  for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
  }
  return store;
}

export default configureStore1;
export { history };
*/
/*
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducers from '../reducers';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  const store = createStore(reducers(history), initialState, bindMiddleware([routeMiddleware, thunk]));
  return store;
}
export default configureStore;
export { history };
*/
