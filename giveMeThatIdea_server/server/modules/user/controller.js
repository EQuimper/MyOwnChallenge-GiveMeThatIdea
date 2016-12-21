import { isEmail } from 'validator';
import crypto from 'crypto';
import User from './model';
import { setUserInfo, generateToken, emailHelpers } from '../../helpers';

/*
* ASYNC EMAIL
*/
export const asyncEmail = (req, res) => {
  const { email } = req.body;
  User.findOne({ 'local.email': email })
    .then(user => {
      // if user we send object { exist: true } who is use in the front end
      if (user) {
        return res.json({ message: 'Email taken!', exist: true });
      }
      return res.json({ message: 'Email available', exist: false });
    })
    .catch(err => res.json({ err }));
};

/*
* ASYNC USERNAME
*/
export const asyncUsername = (req, res) => {
  const { username } = req.body;
  User.findOne({ username })
    .then(user => {
      // if user we send object { exist: true } who is use in the front end
      if (user) {
        return res.json({ message: 'Username taken!', exist: true });
      }
      return res.json({ message: 'Username available', exist: false });
    })
    .catch(err => res.json({ err }));
};

/*
* LOGIN
*/
export const login = (req, res, next) => {
  const user = setUserInfo(req.user);
  res.send({ success: true, token: `JWT ${generateToken(user)}`, user });
  return next();
};

/*
* SIGNUP
*/
export const signup = (req, res) => {
  const { email, password, username } = req.body;

  if (!email) {
    return res.status(422).json({ success: false, message: 'Email is required!' });
  } else if (!password) {
    return res.status(422).json({ success: false, message: 'Password is required!' });
  } else if (!username) {
    return res.status(422).json({ success: false, message: 'Username is required!' });
  }

  if (!isEmail(email)) {
    return res.status(422).json({ success: false, message: 'Email is not valid!' });
  }

  User.findOne({ 'local.email': email })
    .then(auth => {
      if (auth) { return res.status(422).json({ success: false, message: 'Email already used!' }); }

      const newUser = new User({ local: { email, password }, username });

      newUser.save()
        .then(user => res.status(201).json({
          success: true,
          message: 'Successfully register!',
          token: `JWT ${generateToken(user)}`,
          user: setUserInfo(user)
        }))
        .catch(err => {
          let error;
          if (err.code === 11000) {
            error = 'Duplicate email, plz provide a other one!';
          }
          res.status(422).json({
            success: false,
            message: error || err
          });
        });
    });
};

/*
* FORGOT PASSWORD
*/
export const forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ 'local.email': email })
    .then(user => {
      if (!user) { return res.status(422).json({ success: false, message: 'This email not exist try again!' }); }

      crypto.randomBytes(48, (err, buffer) => {
        if (err) { return res.status(400).json({ success: false, message: 'Something wrong happen', error: err }); }

        const resetToken = buffer.toString('hex');

        user.resetPasswordToken = resetToken; // eslint-disable-line
        user.resetPasswordExpires = Date.now() + (60000 * 60); // eslint-disable-line

        user.save()
          .then(u => {
            emailHelpers(u, 'GiveMeThatIdea - Forgot Password', null, resetToken, err => { // eslint-disable-line
              if (err) { return console.log(err); }
              return res.status(201).json({ success: true, message: 'Message on the way!' });
            });
          })
          .catch(err => console.log(err)); // eslint-disable-line
      });
    })
    .catch(error => res.status(400).json({ success: false, message: 'Something wrong happen', error }));
};

/*
* RESET PASSWORD
*/
export const resetPassword = (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  if (!resetToken) {
    return res.status(404).json({ success: false, message: 'Not supposed to be there' });
  }

  User.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ success: false, message: 'ERROR ' });
      }

      return res.status(200).json({ success: true, message: 'Work' });
    });
};

export const changePassword = (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  User.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ success: false, message: 'ERROR ' });
      }
      // no need anymore
      user.resetPasswordToken = undefined; // eslint-disable-line
      user.resetPasswordExpires = undefined; // eslint-disable-line
      // make use of new password
      user.local.password = password; // eslint-disable-line

      user.save()
        .then(u => {
          emailHelpers(u, 'GiveMeThatIdea - New Password', null, null, err => { // eslint-disable-line
            if (err) { return console.log(err); }
            return res.status(201).json({ success: true, message: 'Message on the way!' });
          });
        })
        .catch(err => console.log(err));
    });
};
