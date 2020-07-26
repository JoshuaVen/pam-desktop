/* eslint-disable no-undef */
import {
  call, put, takeLatest
} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from './actions';

function syncLocalList(localList) {
  return axios.post('http://localhost:8080/api/files/uploadList', localList, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  }).then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* startLocalSync(action) {
  const { error, response } = yield call(syncLocalList, action.payload);
  if (error) {
    yield put(actions.sync_err(error));
  } else {
    yield put(actions.sync_rec(response));
  }
}

export default function* syncLocalWatcher() {
  yield takeLatest(actions.sync_req, startLocalSync);
}
