/* eslint-disable no-undef */
import {
  call, put, takeLatest, take, cancel
} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from './actions';

function animeSearch(searchAnime) {
  const data = {
    access_token: localStorage.getItem('access_token'),
    search: searchAnime
  };
  return axios.post('http://localhost:8080/api/files/search', data, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });
}

function* fetchAnimeResult(search) {
  try {
    const response = yield call(animeSearch, search);
    yield put(actions.search_rec(response));
  } catch (error) {
    yield put(actions.search_err(error));
  }
}

export default function* animeSearchWatcher() {
  const { payload } = yield take(actions.search_req);
  yield fetchAnimeResult(payload);
}
