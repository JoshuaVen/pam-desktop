/* eslint-disable no-undef */
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import * as animeDetails from './actions';

function details(mal_id) {
  return axios.get(`http://localhost:8080/api/anime?mal_id=${mal_id}`, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  }).then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* animeDetailsReq(action) {
  const { error, response } = yield call(details, action.payload);
  if (error) {
    yield put(animeDetails.err(error));
  } else {
    yield put(animeDetails.res(response.data));
  }
}

export default function* animeDetailsWatcher() {
  yield takeLatest(animeDetails.req, animeDetailsReq);
}
