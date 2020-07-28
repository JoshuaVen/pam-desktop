import { fork } from 'redux-saga/effects';
import link from './sagaLink';
import search from './sagaSearch';

export default function* saga() {
  yield fork(search);
  yield fork(link);
}
