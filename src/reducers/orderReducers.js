import * as types from '../actions';
const initialState = {
  orders: [],
  error: null,
  users:[]
};
export default function(state = initialState, action) {
  switch(action.type) {
      case types.FETCH_ORDER_SUCCESS:
        return {
          ...state,
          orders: action.payload.orders,
        };
      case types.UPDATE_ORDER_SUCCESS:
          return {
              ...state,
              orders: action.payload.orders,
          }
      case types.FETCH_USERS_SUCCESS:
          return {
              ...state,
              users: action.payload.users,
          }

      default:
          return state;
    }
};
