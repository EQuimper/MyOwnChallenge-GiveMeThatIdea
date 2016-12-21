import axios from 'axios';

export const FETCH_ALL_IDEAS = 'FETCH_ALL_IDEAS';
export const FETCH_USERS_FOLLOW_IDEA = 'FETCH_USERS_FOLLOW_IDEA';
export const FOLLOW_IDEA = 'FOLLOW_IDEA';

export const fetchAllIdeas = ()  => (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const promise = new Promise((resolve, reject) => {
    axios.post('/ideas', { userId })
      .then(
        res => resolve(res.data),
        err => reject(err)
      );
  });

  return dispatch({
    type: FETCH_ALL_IDEAS,
    payload: promise
  }).then(({ value }) => dispatch({
    type: FETCH_USERS_FOLLOW_IDEA,
    ideasFollow: value.ideasFollow
  }));
};

export const followIdea = id => (dispatch, getState) => {
  const userId = getState().auth.user.id;

  const promise = new Promise((resolve, reject) => {
    axios.post(`/ideas/${id}/followIdea`, { userId })
      .then(
        res => resolve(res.data),
        error => reject(error)
      );
  });

  return promise.then(
    value => dispatch({
      type: FOLLOW_IDEA,
      id
    }),
    error => console.log({ error })
  );
}
