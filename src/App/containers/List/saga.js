/* eslint-disable no-undef */
import {
  call, put, takeLatest, fork, cancel, take
} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from './actions';
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
    yield put(actions.failed(error));
  }
  yield put(actions.success(response));
}

function* fetchingWatcher() {
  yield takeLatest(actions.request, fetchDledResults);
}

function* searchThenLink() {
  const linkWatcher = yield* link();
  const searchWatcher = yield* search();
  yield take([actions.link_reset, actions.link_fail, actions.link_succ]);
  yield cancel(searchWatcher);
  yield cancel(linkWatcher);
}

function* syncThenFetch() {
  const localWatcher = yield* local();
  const fetchWatcher = yield* fetchingWatcher();
  yield take([actions.failed, actions.success]);
  yield cancel(localWatcher);
  yield cancel(fetchWatcher);
}

export default function* saga() {
  yield fork(searchThenLink);
  yield fork(syncThenFetch);
}
