import { put, call } from 'redux-saga/effects';
import { loginUserService, getData, updateData, getUsers } from '../services/authenticationService';

import * as types from '../actions'

export function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload);
    yield [
      put({ type: types.LOGIN_USER_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}

export function* ordersSaga(payload) {
  try {
    const response = yield call(getData, payload);

    yield [
      put({ type: types.FETCH_ORDER_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.FETCH_ORDER_ERROR, error })
  }
}

export function* updateordersSaga(payload) {
  try {
    const response = yield call(updateData, payload);

    yield [
      put({ type: types.FETCH_ORDER_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.FETCH_ORDER_ERROR, error })
  }
}

export function* usersSaga(payload) {
  try {
    const response = yield call(getUsers, payload);

    yield [
      put({ type: types.FETCH_USERS_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.FETCH_USERS_ERROR, error })
  }
}
