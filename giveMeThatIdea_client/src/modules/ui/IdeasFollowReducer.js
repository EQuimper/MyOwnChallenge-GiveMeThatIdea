import { combineReducers } from 'redux';
import { FETCH_USERS_FOLLOW_IDEA, FOLLOW_IDEA, UNFOLLOW_IDEA, FETCH_LENGTH_FOLLOW } from '../../modules';

const follow = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS_FOLLOW_IDEA:
      return action.ideasFollow;
    case FOLLOW_IDEA:
      return [...state, action.id];
    case UNFOLLOW_IDEA:
      return state.filter(item => item !== action.id);
    default:
      return state;
  }
};

const fetchLengthReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_LENGTH_FOLLOW:
      return action.lengthFollow;
    case FOLLOW_IDEA:
      return [...state.map(idea =>
        idea.id === action.id ?
        {
          ...idea,
          followers: idea.followers + 1
        } :
        idea
      )];
    case UNFOLLOW_IDEA:
      return [...state.map(idea =>
        idea.id === action.id ?
        {
          ...idea,
          followers: idea.followers - 1
        } :
        idea
      )];
    default:
      return state;
  }
}

export default combineReducers({
  ideas: follow,
  lengthFollow: fetchLengthReducer
});
