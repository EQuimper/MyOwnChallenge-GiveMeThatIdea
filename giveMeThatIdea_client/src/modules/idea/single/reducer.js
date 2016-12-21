import { FETCH_IDEA } from './actions';

const INITIAL_STATE = {
  isFetched: false,
  idea: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${FETCH_IDEA}_PENDING`:
      return state;
    case `${FETCH_IDEA}_FULFILLED`:
      return { ...state,
        idea: action.payload,
        isFetched: true
      };
    case `${FETCH_IDEA}_REJECTED`:
      return { ...state,
        error: action.payload,
        isFetched: true
      };
    default:
      return state;
  }
};
