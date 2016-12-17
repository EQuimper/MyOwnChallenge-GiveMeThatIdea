import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from './actions';

const INITIAL_STATE = {
  user: null,
  token: null,
  loading: false,
  message: null,
  error: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state,
        loading: true
      };
    case LOGIN_USER_SUCCESS:
      return { ...state,
        user: action.user,
        token: action.token,
        loading: false
      };
    case LOGIN_USER_ERROR:
      return { ...state,
        message: action.message,
        error: true
      };
    default:
      return state;
  }
}
