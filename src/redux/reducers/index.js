import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
//import User from './User';

export const reducers = history => {
  return combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth
    //user: User
  });
};
