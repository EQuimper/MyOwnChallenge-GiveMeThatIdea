import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import { reset } from 'redux-form';

export const FETCH_IDEA = 'FETCH_IDEA';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';

export const FETCH_COMMENTS = 'FETCH_COMMENTS';

export const fetchIdea = slug => dispatch => {
  const promise = new Promise((resolve, reject) => {
    return axios.get(`/ideas/${slug}`)
      .then(
        res => resolve(res.data.idea),
        err => reject(err)
      );
  });

  return dispatch({
    type: FETCH_IDEA,
    payload: promise
  }).then(
      ({ value }) => dispatch({ type: FETCH_COMMENTS, comments: value.comments }),
      error => {
        toastr.error(error.response.data.message);
        return browserHistory.push('/');
      }
    );
}

export const createComment = values => (dispatch, getState) => {
  const { username } = getState().auth.user;
  const ideaId = getState().api.idea.idea._id;
  const { text } = values;
  dispatch({ type: CREATE_COMMENT });
  return axios.post(`/ideas/${ideaId}/comments/new`, { text })
    .then(
      res => {
        const comment = {
          text: res.data.text,
          author: {
            username
          },
          _id: res.data._id,
          createdAt: res.data.createdAt
        };
        dispatch({ type: CREATE_COMMENT_SUCCESS, comment });
        return dispatch(reset('createComment'));
      },
      error => {
        toastr.error('Something Wrong Happen!');
        return dispatch({ type: CREATE_COMMENT_ERROR });
      }
    );
};
