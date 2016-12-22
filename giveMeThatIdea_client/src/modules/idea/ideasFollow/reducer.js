import { FETCH_ALL_IDEAS_FOLLOW } from './actions';

const INITIAL_STATE = {
  isFetched: false,
  ideasFollow: [],
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${FETCH_ALL_IDEAS_FOLLOW}_PENDING`:
      return state;
    case `${FETCH_ALL_IDEAS_FOLLOW}_FULFILLED`:
      return { ...state,
        isFetched: true,
        ideasFollow: action.payload
      };
    case `${FETCH_ALL_IDEAS_FOLLOW}_REJECTED`:
      return { ...state,
        isFetched: true,
        error: action.payload
      };
    default:
      return state;
  }
};
