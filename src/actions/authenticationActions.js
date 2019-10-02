import * as types from './index';

import {loginUserService } from '../services/authenticationService';


export const fetchLoginSuccess = (items) => {
  return {
    type: types.LOGIN_USER_SUCCESS,
    payload: { items }
  }
};


export function login(users) {
  return dispatch => {
    return loginUserService(users)
      .then(json => {
        dispatch(fetchLoginSuccess(json.data));
        return json.data;
      })
  };
}
