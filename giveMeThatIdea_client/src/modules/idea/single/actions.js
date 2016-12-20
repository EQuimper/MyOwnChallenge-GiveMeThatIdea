import axios from 'axios';

export const FETCH_IDEA = 'FETCH_IDEA';

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
