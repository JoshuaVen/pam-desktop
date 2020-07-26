/* eslint-disable no-undef */
import {
  call, put, takeLatest, fork
} from 'redux-saga/effects';
import axios from 'axios';
import * as fetchDled from './actions';
import link from './sagaLink';
import search from './sagaSearch';
import local from './sagaLocal';

function fetchDledAnime() {
  const token = localStorage.getItem('token');
  const config = {
    method: 'get',
    url: 'http://localhost:8080/api/files/downloaded_list',
    headers: {
      authorization: token
    }
  };
  return axios(config)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* fetchDledResults() {
  const { error, response } = yield call(fetchDledAnime);
  if (error) {
    yield put(fetchDled.failed(error));
  } else {
    yield put(fetchDled.success(response));
  }
}

function* fetchingWatcher() {
  yield takeLatest(fetchDled.request, fetchDledResults);
}

function* searchThenLink() {
  yield* link();
  yield* search();
}

function* syncThenFetch() {
  yield* local();
  yield* fetchingWatcher();
}

export default function* saga() {
  yield fork(searchThenLink);
  yield fork(syncThenFetch);
}
