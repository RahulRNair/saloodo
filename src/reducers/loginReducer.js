import * as types from '../actions';
const initialState = {
  login_resp: [],
  error: null,
  logout:false
};
export default function(state = initialState, action) {
  switch(action.type) {

    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        login_resp: action.payload.items,
      };
    case types.LOGIN_USER_ERROR:
      return { ...state, login_resp: action.payload.items, };
    default:
      return state;
  }
};
