import { combineReducers } from 'redux';
import login from './loginReducer';
import order from './orderReducers';


const rootReducer = combineReducers({
  login, order
});

export default rootReducer;
