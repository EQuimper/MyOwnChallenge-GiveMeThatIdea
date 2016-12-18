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
  { expiresIn: '10s' }
);

/*
* SET WHICH USER INFO WANT
*/
const setUserInfo = user => ({
  email: user.local.email,
  id: user._id
});

export const asyncEmail = (req, res) => {
  const { email } = req.body;
  User.findOne({ 'local.email': email })
    .then(user => {
      if (user) {
        return res.json({ message: 'Email taken!', exist: true });
      }
      return res.json({ message: 'Email available', exist: false });
    })
    .catch(err => res.json({ err }));
};

/*
* LOGIN
*/
export const login = (req, res, next) => {
  const user = setUserInfo(req.user);
  res.send({ success: true, token: generateToken(user), user });
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

  User.findOne({ 'local.email': email })
    .then(auth => {
      console.log({ auth });
      if (auth) { return res.status(422).json({ success: false, message: 'Email already used!' }); }

      const newUser = new User({ local: { email, password } });

      newUser.save()
        .then(user => res.status(201).json({
          success: true,
          message: 'Successfully register!',
          token: generateToken(user),
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

export const checkToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Must pass token' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(422).json({
          success: false,
          expireTime: true,
          message: 'Token expires plz log again, this is for your security!'
        });
      }
      return res.status(422).json({ success: false, message: 'Token problem' });
    }

    User.findById(decoded.sub)
      .then(user => res.status(201).json({
        success: true,
        message: 'Token refresh!',
        token: generateToken(user),
      }))
      .catch(error => res.status(401).json({ success: false, message: 'Something wrong happen with the token!', error }));
  });
};
