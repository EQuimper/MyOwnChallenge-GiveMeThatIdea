import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SIGNUP_USER,
  SIGNUP_USER_ERROR,
  SIGNUP_USER_SUCCESS
} from './actions';

const INITIAL_STATE = {
  user: null,
  token: null,
  loading: false,
  message: null,
  error: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state,
        loading: true
      };
    case LOGIN_USER_SUCCESS:
      return {
        message: null,
        error: false,
        user: action.user,
        token: action.token,
        loading: false
      };
    case LOGIN_USER_ERROR:
      return { ...state,
        message: action.message,
        error: true
      };
    case SIGNUP_USER:
      return { ...state,
        loading: true
      };
    case SIGNUP_USER_SUCCESS:
      return {
        message: null,
        error: false,
        user: action.user,
        token: action.token,
        loading: false
      };
    case SIGNUP_USER_ERROR:
      return { ...state,
        message: action.message,
        error: true
      };
    default:
      return state;
  }
}
