import {
  CREATE_COMMENT_SUCCESS,
  FETCH_COMMENTS
} from '../../modules';

const INITIAL_STATE = {
  isFetched: false,
  comments: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        isFetched: true,
        comments: action.comments
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [action.comment, ...state.comments]
      };
    default:
      return state;
  }
};
