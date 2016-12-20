import { TOGGLE_LOGOUT } from './actions';

const INITIAL_STATE = {
  logoutConfirm: {
    show: false,
    cancelButton: 'No I stay!',
    confirmButton: 'Yes time to quit!',
    content: 'Are you sure you want to logout from this awesome app?',
    header: 'You want to quit us?'
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_LOGOUT:
      return { ...state,
        logoutConfirm: {
          ...state.logoutConfirm,
          show: !state.logoutConfirm.show
        }
      };
    default:
      return state;
  }
};
