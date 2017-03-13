import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer';
import usersReducer from './users_reducer';
import chatReducer from './chat_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  usersReducer,
  chatReducer,
});

export default rootReducer;
