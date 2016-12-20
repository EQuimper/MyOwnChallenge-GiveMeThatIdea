import axios from 'axios';

export const FETCH_ALL_IDEAS = 'FETCH_ALL_IDEAS';

export const fetchAllIdeas = () => {
  const promise = new Promise((resolve, reject) => {
    axios.get('/ideas')
      .then(
        res => resolve(res.data.ideas),
        err => reject(err)
      );
  });

  return {
    type: FETCH_ALL_IDEAS,
    payload: promise
  };
};
