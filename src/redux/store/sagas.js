import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';

import { history } from './history';
import * as mutations from './mutations';
const url = process.env.NODE_ENV === 'production' ? `` : `http://localhost:8888`;
/*
const autheticate = async () => {
  return }
function* success(result) {
  console.log(res.data)
  yield put(mutations.setState(result.state));
  yield put(
    mutations.processAuthenticateUser(
      mutations.AUTHENTICATED, {
        id: 'U1', // todo... get ID from response
        token: result.token,
    }),
  );
  
}

const errorOutcome = (error) => {
  console.log(error.response.data)
}
*/
const errorOutcome = (error) => {
  console.log(error)
}
const success = (result) => {
  console.log(result)
}

export function* userAuthenticationSaga() {
  console.log('---XYZ---')
  console.log(url)
  console.log('---ABC---')
  //let result = null;
  while (true) {
    
    console.log('--u--');
    const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
    
    console.log('--o--');
    console.log(username);
    console.log(password);
    console.log('--o--');

    try {
      let data1 = JSON.stringify({
        username: username,
        password: password
      });

      let result = axios.post(
          url  + `/authenticate`, 
          data1, 
          {headers : { "Content-Type" : "application/json" }
        }).then((result) => success(result))
        .catch((error) => errorOutcome(error))
        .finally(() => {
          console.log('finally');
        });
      yield put(mutations.setState(result.state));
      yield put(
          mutations.processAuthenticateUser(
            mutations.AUTHENTICATED, {
              id: 'U1', // todo... get ID from response
            token: result.token,
          }),
      );
      history.push(`/sample-page`);
      
      


    }
    catch (error) {
      console.log('Did I come here?')
      console.error(error);
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}

export function* userAccountCreationSaga() {
  while (true) {
    const { username, password } = yield take(mutations.REQUEST_USER_ACCOUNT_CREATION);
    try {
      const { data } = yield axios.post(url + `/user/create`, { username, password });
      console.log(data);

      yield put(mutations.setState({ ...data.state, session: { id: data.userID } }));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

      history.push('/dashboard');
    }
    catch (error) {
      console.error(error.response.data);
      yield put(mutations.processAuthenticateUser(mutations.USERNAME_RESERVED));
    }
  }
}
