import {
  call, put, takeLatest
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
  }).then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* fetchAnimeResult(search) {
  const searchAnime = search.payload;
  const { response, error } = yield call(animeSearch, searchAnime);

  if (response) {
    yield put(actions.search_rec(response));
  } else {
    yield put(actions.search_err(error));
  }
}

export default function* animeSearchWatcher() {
  yield takeLatest(actions.search_req, fetchAnimeResult);
}
