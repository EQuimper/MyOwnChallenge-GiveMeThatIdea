import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';

export const CREATE_IDEA = 'CREATE_IDEA';

export const createIdea = values => (dispatch, getState) => {
  const { title, description, category } = values;

  const promise = new Promise((resolve, reject) => {
    return axios.post('/ideas/new', { title, description, category })
      .then(
        res => resolve(res.data),
        error => reject(error)
      );
  });

  return dispatch({
    type: CREATE_IDEA,
    payload: promise
  }).then(
    ({ value }) => {
      toastr.success(value.message);
      return browserHistory.push('/ideas');
    },
    error => {
      toastr.error('Something Wrong Happen!', error.response.data.message);
      return browserHistory.push('/ideas/new');
    }
  );
}
