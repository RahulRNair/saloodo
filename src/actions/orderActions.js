import * as types from './index';
import { getData, updateData, getUsers } from '../services/authenticationService';

export const fetchOrdersSuccess = (orders) => {
  return {
    type: types.FETCH_ORDER_SUCCESS,
    payload: { orders }
  }
};

export const fetchUsersSuccess = (users) => {
  return {
    type: types.FETCH_USERS_SUCCESS,
    payload: { users }
  }
};

export const updateOrderSuccess = (orders) => {
  return {
    type: types.UPDATE_ORDER_SUCCESS,
    payload: { orders }

  }
};

export function fetchUsers() {
  return dispatch => {
    return getUsers()
      .then(json => {
        dispatch(fetchUsersSuccess(json));
        return json;
      })
  };
}
export function fetchOrders() {
  return dispatch => {
    return getData()
      .then(json => {
        dispatch(fetchOrdersSuccess(json));
        return json;
      })
  };
}

export function updateOrder(data) {
  return dispatch => {
    return updateData(data)
      .then(json => {
        dispatch(updateOrderSuccess(json));
        return json;
      })
  };
}
