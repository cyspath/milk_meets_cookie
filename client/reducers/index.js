import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer';
import usersReducer from './users_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  usersReducer,
});

export default rootReducer;
