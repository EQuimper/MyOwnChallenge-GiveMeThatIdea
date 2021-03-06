import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SIGNUP_USER,
  SIGNUP_USER_ERROR,
  SIGNUP_USER_SUCCESS,
  CHECK_TOKEN_ERROR,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN,
  LOGOUT_USER,
  UNAUTH_USER
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
    case CHECK_TOKEN:
      return { ...state,
        loading: true
      }
    case CHECK_TOKEN_SUCCESS:
      return { ...state,
        token: action.token,
        loading: false,
        error: false,
        user: action.user
      };
    case CHECK_TOKEN_ERROR:
    case LOGOUT_USER:
    case UNAUTH_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}
