import axios from 'axios';

export const FETCH_ALL_IDEAS_FOLLOW = 'FETCH_ALL_IDEAS_FOLLOW';

const filterLengthFollow = arr =>
  arr.reduce((acc, idea) => {
    acc.push({ id: idea._id, followers: idea.usersFollow.length });
    return acc;
  }, []);

export const fetchAllIdeasFollow = () => dispatch => {
  const promise = new Promise((resolve, reject) => {
    return axios.get('/follow')
      .then(
        res => resolve(res.data.ideasFollow),
        error => reject(error)
      );
  });

  return dispatch({
    type: FETCH_ALL_IDEAS_FOLLOW,
    payload: promise
  }).then(({ value }) => {
    console.log({ value });
    dispatch({ type: 'FETCH_LENGTH_FOLLOW', lengthFollow: filterLengthFollow(value)})
    return dispatch({
      type: 'FETCH_USERS_FOLLOW_IDEA',
      ideasFollow: value
    });
  });
};
