/* eslint-disable no-undef */
import {
  call, put, take,
} from 'redux-saga/effects';
import axios from 'axios';

import * as animeDetails from './actions';

function details(mal_id) {
  return axios.get(`http://localhost:8080/api/anime?mal_id=${mal_id}`, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });
}

function* animeDetailsReq(mal_id) {
  try {
    const response = yield call(details, mal_id);
    yield put(animeDetails.res(response.data));
  } catch (error) {
    yield put(animeDetails.err(err));
  }
}

export default function* animeDetailsWatcher() {
  const { payload } = yield take(animeDetails.req);
  yield animeDetailsReq(payload);
}
