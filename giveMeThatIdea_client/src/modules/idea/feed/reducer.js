import { FETCH_ALL_IDEAS } from './actions';

const INITIAL_STATE = {
  isFetched: false,
  ideas: [],
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${FETCH_ALL_IDEAS}_PENDING`:
      return state;
    case `${FETCH_ALL_IDEAS}_FULFILLED`:
      return { ...state,
        isFetched: true,
        ideas: action.payload.ideas
      };
    case `${FETCH_ALL_IDEAS}_REJECTED`:
      return { ...state,
        isFetched: true,
        error: action.payload
      };
    default:
      return state;
  }
};
