/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import {
  call, put, takeLatest, select, take, delay, all
} from 'redux-saga/effects';
import axios from 'axios';
import { eventChannel, END } from 'redux-saga';

import * as signin from './actions';

function fetchSigninResults(action) {
  return axios.post('http://localhost:8080/api/signin', action.payload.formProps)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* signinResults(action) {
  const { error, response } = yield call(fetchSigninResults, action);
  yield delay(1400);
  if (error) {
    yield put(signin.failed('Entered credentials do not match!'));
  } else {
    yield call(action.payload.history.push, '/auth');
    yield call([localStorage, localStorage.setItem], 'token', response.data.token);
    yield put(signin.success(response));
  }
}

function* signinHandler(action) {
  const { auth } = yield select();
  if (auth.attempts > 0) {
    yield signinResults(action);
  } else {
    yield put(signin.deny());
  }
}

function countdown(secs) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        emitter(END);
      }
    }, 1000);
    return () => { clearInterval(iv); };
  });
}

function* timeoutHandler() {
  const { auth } = yield select();
  const chan = yield call(countdown, auth.timeout);
  try {
    while (true) {
      yield take(chan);
      yield put(signin.updateTimeout());
    }
  } finally {
    yield put(signin.reallow());
  }
}

function* timeoutWatcher() {
  yield takeLatest(signin.deny, timeoutHandler);
}

function* signinWatcher() {
  yield takeLatest(signin.request, signinHandler);
}

export default function* signinSaga() {
  yield all([
    signinWatcher(), timeoutWatcher()
  ]);
}
