/* eslint-disable no-undef */
import {
  call, put, takeLatest, all
} from 'redux-saga/effects';
import axios from 'axios';

import * as fetchDled from './actions';

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
    yield put(fetchDled.sync_err(error));
  } else {
    yield put(fetchDled.sync_rec(response));
  }
}

function* syncLocalWatcher() {
  yield takeLatest(fetchDled.sync_req, startLocalSync);
}

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

function animeSearch(searchURL) {
  const config = {
    method: 'get',
    url: searchURL,
    headers: {
      authorization: localStorage.getItem('token')
    }
  };
  return axios(config)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* fetchAnimeResult(search) {
  console.log(search);
  const searchURL = `http://localhost:8080/api/files/search?anime=${search.payload}`;
  const { response, error } = yield call(animeSearch, searchURL);

  if (response) {
    yield put(fetchDled.search_rec(response));
  } else {
    yield put(fetchDled.search_err(error));
  }
}

function* animeSearchWatcher() {
  yield takeLatest(fetchDled.search_req, fetchAnimeResult);
}

function linkAttempt(item) {
  const dataForPosting = {
    ...item.linkingItem,
    searchTitle: item.referenceItem
  };
  const linkingURL = 'http://localhost:8080/api/files/link';
  const config = {
    method: 'POST',
    url: linkingURL,
    data: dataForPosting,
    headers: {
      authorization: localStorage.getItem('token')
    }
  };
  return axios(config)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* fetchLinkResults(action) {
  const { response, error } = yield call(linkAttempt, action.payload);
  if (response) {
    yield put(fetchDled.link_succ(response));
  } else {
    yield put(fetchDled.link_fail(error));
  }
}

function* linkingWatcher() {
  yield takeLatest(fetchDled.link_init, fetchLinkResults);
}

export default function* saga() {
  yield all([
    fetchingWatcher(),
    animeSearchWatcher(),
    linkingWatcher(),
    syncLocalWatcher()
  ]);
}
