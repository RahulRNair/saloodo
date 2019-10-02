import { takeLatest } from 'redux-saga/effects';
import { loginSaga, ordersSaga, updateordersSaga, usersSaga } from './appSaga';

import * as types from '../actions';

export default function* watchUserAuthentication() {
  yield takeLatest(types.LOGIN_USER, loginSaga);
  yield takeLatest(types.FETCH_ORDER, ordersSaga);
  yield takeLatest(types.UPDATE_ORDER, updateordersSaga);
  yield takeLatest(types.FETCH_USERS, usersSaga);
}
