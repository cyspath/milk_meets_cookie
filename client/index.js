import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import routes from './routes';
import * as actions from './actions/auth_actions';
import { AUTH_USER } from './actions/types';

// middlewares
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// initial check jwt sigin
const token = localStorage.getItem('token'); // pull token first, if token we auth user
if (token) { // update application state
  store.dispatch({ type: AUTH_USER }); // dispatch method we used before actually belong to store
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
  , document.querySelector('#root'));
