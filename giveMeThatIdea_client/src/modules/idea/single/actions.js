import axios from 'axios';

export const FETCH_IDEA = 'FETCH_IDEA';
export const CREATE_COMMENT = 'CREATE_COMMENT';

export const fetchIdea = slug => {
  const promise = new Promise((resolve, reject) => {
    axios.get(`/ideas/${slug}`)
      .then(
        res => resolve(res.data.idea),
        err => reject(err.data.error)
      );
  });

  return {
    type: FETCH_IDEA,
    payload: promise
  };
}

export const createComment = values => (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const ideaId = getState().api.idea.idea._id;
  const { text } = values;
};
