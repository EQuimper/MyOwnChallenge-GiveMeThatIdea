/*
* Set the user info we sent to the front-end
* This is for security cause we don't want to share password etc...
*/
export const setUserInfo = user => ({
  email: user.local.email,
  id: user._id,
  username: user.username
});
