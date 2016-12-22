/*
* Set the user info we sent to the front-end
* This is for security cause we don't want to share password etc...
*/
export const setUserInfo = user => {
  switch (user.provider) {
    case 'github':
      return {
        email: user.github.email,
        id: user._id,
        username: user.github.username,
        avatar: user.github.avatar
      };
    default:
      return {
        email: user.email,
        id: user._id,
        username: user.username,
        avatar: 'http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png'
      };
  }
};
