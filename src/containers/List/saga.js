/* eslint-disable no-undef */
import {
  call, put, takeLatest, all, select
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

function animeSearch(searchAnime) {
  const data = {
    access_token: localStorage.getItem('access_token'),
    search: searchAnime
  };
  return axios.post('http://localhost:8080/api/files/search', data, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  }).then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* fetchAnimeResult(search) {
  const searchAnime = search.payload;
  const { response, error } = yield call(animeSearch, searchAnime);

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
    id: item.tobeInserted.id,
    searchTitle: item.searchTitle,
    access_token: localStorage.getItem('access_token')
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
