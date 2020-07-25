/* eslint-disable no-undef */
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { parse } from 'url';
import axios from 'axios';
import * as actions from './actions';

function malAuth() {
  return axios.get('http://localhost:8080/api/mal', {
    params: {
      code: parse(window.location.href, true).query.code,
      code_verifier: localStorage.getItem('codeVerifier'),
    },
    headers: {
      authorization: localStorage.getItem('token')
    }
  }).then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* malAuthRequest() {
  const { error, response } = yield call(malAuth);
  if (error) {
    yield put(actions.mal_auth_post_err(error));
  } else {
    // yield call([localStorage, localStorage.clear], 'codeVerifier');
    yield put(actions.mal_auth_post_res(response));
  }
}

function* malAuthWatcher() {
  yield takeLatest(actions.mal_auth_post, malAuthRequest);
}

export default function* malAuthSaga() {
  yield all([malAuthWatcher()]);
}
