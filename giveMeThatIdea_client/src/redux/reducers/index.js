import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import { AuthReducer, IdeasReducer } from '../../modules';

const apiReducer = combineReducers({
  ideas: IdeasReducer
});

export default combineReducers({
  auth: AuthReducer,
  routing: routerReducer,
  form: formReducer,
  toastr: toastrReducer,
  api: apiReducer
});
