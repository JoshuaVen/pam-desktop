/* eslint-disable no-undef */
import {
  call, put, take
} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from './actions';

function fetchDledAnime() {
  const token = localStorage.getItem('token');
  const config = {
    method: 'get',
    url: 'http://localhost:8080/api/files/downloaded_list',
    headers: {
      authorization: token
    }
  };
  return axios(config);
}

function* fetchDledResults() {
  try {
    const response = yield call(fetchDledAnime);
    console.log(response.data);
    yield put(actions.success(response.data));
  } catch (error) {
    console.log(error);
    yield put(actions.failed(error));
  }
}

function syncLocalList(localList) {
  return axios.post('http://localhost:8080/api/files/uploadList', localList, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });
}

function* startLocalSync(localList) {
  try {
    const response = yield call(syncLocalList, localList);
    console.log(response);
    yield put(actions.sync_rec(response.data));
  } catch (error) {
    console.log(error);
    yield put(actions.sync_err(error));
  }
}

function* localSyncWatcher() {
  const { payload } = yield take(actions.sync_req);
  yield startLocalSync(payload);
}

export default function* saga() {
  yield* localSyncWatcher();
  yield* fetchDledResults();
}
