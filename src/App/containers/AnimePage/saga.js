/* eslint-disable no-undef */
import {
  takeLatest, call, put, take, cancel
} from 'redux-saga/effects';
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
    return yield put(animeDetails.err(error));
  }
  return yield put(animeDetails.res(response.data));
}

export default function* animeDetailsWatcher() {
  const detailsWatcher = yield takeLatest(animeDetails.req, animeDetailsReq);
  yield take([animeDetails.res, animeDetails.err]);
  yield cancel(detailsWatcher);
}
