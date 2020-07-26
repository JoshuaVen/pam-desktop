import {
  call, put, takeLatest, all, select
} from 'redux-saga/effects';
import axios from 'axios';

import * as actions from './actions';


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
    yield put(actions.link_succ(response));
  } else {
    yield put(actions.link_fail(error));
  }
}

export default function* linkingWatcher() {
  yield takeLatest(actions.link_init, fetchLinkResults);
}
