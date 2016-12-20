import axios from 'axios';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { toggleLogout } from '../index';
// import { instance } from '../../App';

export const UNAUTH_USER = 'UNAUTH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_ERROR = 'SIGNUP_USER_ERROR';

export const CHECK_TOKEN = 'CHECK_TOKEN';
export const CHECK_TOKEN_SUCCESS = 'CHECK_TOKEN_SUCCESS';
export const CHECK_TOKEN_ERROR = 'CHECK_TOKEN_ERROR';

export const loginUser = values => dispatch => {
  dispatch({ type: LOGIN_USER });
  const { email, password } = values;

  return axios.post('/auth/login', { email, password })
    .then(res => {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        user: res.data.user,
        token: res.data.token,
        message: res.data.message
      });
      axios.defaults.headers.common['Authorization'] = res.data.token;
      console.group('HEaders');
      console.log(axios.defaults);
      toastr.success('Successfully Login!', 'Welcome Back!');
      return browserHistory.push('/ideas');
    })
    .catch(err => {
      let errors;
      if (err.response.status === 401) {
        errors = 'A error occur with your login action. PLZ try again!';
      }
      dispatch({
        type: LOGIN_USER_ERROR,
        message: errors || err.response.data
      });
      return toastr.error('Authentication failed!');
    });
}

export const signupUser = values => dispatch => {
  dispatch({ type: SIGNUP_USER });
  const { email, password } = values;

  return axios.post('/auth/signup', { email, password })
    .then(res => {
      dispatch({
        type: SIGNUP_USER_SUCCESS,
        user: res.data.user,
        token: res.data.token,
        message: res.data.message
      });
      toastr.success('Successfully Register!', 'Welcome to GiveMeThatIdea!');
      axios.defaults.headers.common['Authorization'] = res.data.token;
      return browserHistory.push('/ideas');
    })
    .catch(err => {
      dispatch({
        type: SIGNUP_USER_ERROR,
        message: err.response.data.message
      });
      return toastr.error('Error', err.response.data.message);
    });
}

export const checkToken = () => (dispatch, getState) => {
  dispatch({ type: CHECK_TOKEN });
  const { token } = getState().auth;
  axios.post('/auth/checkToken', { token })
    .then(res => dispatch({
      type: CHECK_TOKEN_SUCCESS,
      token: res.data.token,
      user: res.data.user
    }))
    .catch(err => {
      const { expireTime, message } = err.response.data;
      if (err.response.data.expireTime) {
        toastr.error('You need to authenticate again', message);
      }
      return dispatch({ type: CHECK_TOKEN_ERROR })
    });
}

export const logoutUser = () => (dispatch) => {
  dispatch(toggleLogout());
  toastr.error('BYEEEEE!', 'Hope you coming back soon!');
  axios.defaults.headers.common['Authorization'] = '';
  browserHistory.push('/login');
  dispatch({
    type: LOGOUT_USER
  });
}

export const unauthUser = message => dispatch => {
  console.log('UNUAUTH');
  dispatch({ type: UNAUTH_USER });
  toastr.error('Unauthorized', message);
  return browserHistory.push('/login');
}

export const resetPassword = resetToken => (dispatch, getState) => {
  const { password, confirmPassword } = getState().form.resetPassword.values;

  if (password !== confirmPassword) {
    return;
  }

  axios.post(`/auth/resetPassword/${resetToken}/newPassword`, { password })
    .then(res => {
      toastr.success('Password Successfully Changed!');
      browserHistory.push('/login');
    })
    .catch(err => console.log({ err }));
}

export const forgotPassword = values => dispatch => {
  const { email } = values;

  if (!email) {
    return;
  }

  axios.post('/auth/forgotPassword', { email })
    .then(res => {
      toastr.success('Success!', res.data.message);
      browserHistory.push('/login');
      return dispatch({ type: UNAUTH_USER });
    })
    .catch(err => {
      toastr.error('Something Wrong happen', 'Try again!');
      return browserHistory.push('/forgotPassword');
    });
}
