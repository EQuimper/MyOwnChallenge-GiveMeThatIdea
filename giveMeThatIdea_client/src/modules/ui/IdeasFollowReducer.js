import { FETCH_USERS_FOLLOW_IDEA, FOLLOW_IDEA } from '../../modules';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS_FOLLOW_IDEA:
      return action.ideasFollow;
    case FOLLOW_IDEA:
      return [...state, action.id]
    default:
      return state;
  }
};
