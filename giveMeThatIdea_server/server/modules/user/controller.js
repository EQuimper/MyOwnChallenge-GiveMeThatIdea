import { isEmail } from 'validator';
import jwt from 'jsonwebtoken';
import User from './model';
import serverConfig from '../../config/serverConfig';

const { JWT_SECRET } = serverConfig;

/*
* GENERATE A TOKEN
*/
const generateToken = user => jwt.sign({
  sub: user.id },
  JWT_SECRET,
  { expiresIn: '1h' }
);

/*
* SET WHICH USER INFO WANT
*/
const setUserInfo = user => ({
  email: user.local.email,
  id: user._id
});

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
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ success: false, message: 'Email is required!' });
  } else if (!password) {
    return res.status(422).json({ success: false, message: 'Password is required!' });
  }

  if (!isEmail(email)) {
    return res.status(422).json({ success: false, message: 'Email is not valid!' });
  }

  User.findOne({ email })
    .then(auth => {
      if (auth) { return res.status(422).json({ success: false, message: 'Email already userd!' }); }

      const newUser = new User({ local: { email, password } });

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
