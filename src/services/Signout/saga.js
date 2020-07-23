/* eslint-disable no-undef */
import { all, takeLatest, call } from 'redux-saga/effects';
import { signout } from './actions';

function* signoutHandler() {
  yield call([localStorage, localStorage.clear], 'token');
}

function* signoutWatcher() {
  yield takeLatest(signout, signoutHandler);
}

export default function* signoutSaga() {
  yield all([signoutWatcher()]);
}
