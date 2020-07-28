/* eslint-disable no-undef */
import {
  call, put, take, cancel
} from 'redux-saga/effects';
import axios from 'axios';
import listSaga from '../../containers/List/saga';
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
  return axios(config);
}

function* fetchLinkResults(item) {
  try {
    const response = yield call(linkAttempt, item);
    yield put(actions.link_succ(response.data));
  } catch (error) {
    console.log(error);
    yield put(actions.link_fail(error));
  }
}

export default function* linkingWatcher() {
  const { payload } = yield take(actions.link_init);
  yield* fetchLinkResults(payload);
  yield* listSaga();
}
