import axios from 'axios';
import { browserHistory } from 'react-router';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_ERROR = 'SIGNUP_USER_ERROR';

export const loginUser = values => {
  return dispatch => {
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
        return browserHistory.push('/ideas');
      })
      .catch(err => {
        let errors;
        if (err.response.data === 'Unauthorized') {
          errors = 'A error occur with your login action. PLZ try again!';
        }
        return dispatch({
          type: LOGIN_USER_ERROR,
          message: errors || err.response.data
        });
      });
  }
}

export const signupUser = values => {
  return dispatch => {
    dispatch({ type: SIGNUP_USER });
    const { email, password } = values;

    return axios.post('/auth/signup', { email, password })
      .then(res => dispatch({
        type: SIGNUP_USER_SUCCESS,
        user: res.data.user,
        token: res.data.token,
        message: res.data.message
      }))
      .catch(err => dispatch({
        type: SIGNUP_USER_ERROR,
        message: err
      }));
  }
}
