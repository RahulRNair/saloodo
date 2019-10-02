import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers';

//import configureStore from './store/configureStore';
import './index.css';

import App from './container/App';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
//console.log("storestore);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
