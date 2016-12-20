import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';

export const CREATE_IDEA = 'CREATE_IDEA';

export const createIdea = values => (dispatch, getState) => {
  dispatch({ type: CREATE_IDEA });
  const { title, description, category } = values;
  const userId = getState().auth.user.id;
  axios.post('/ideas/new', { title, description, category, userId })
    .then(
      res => {
        toastr.success('Successfully created');
        browserHistory.push('/ideas');
      },
      err => {
        toastr.error('Something Wrong Happen!', 'Try again!');
        browserHistory.push('/ideas/new');
      }
    );
}
