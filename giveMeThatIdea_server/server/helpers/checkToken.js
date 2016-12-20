/*
* CHECKTOKEN - FUNCTION
*
* We check the token provided by the front-end on
* each page refresh.
* 1.If no token send 401.
* 2. If token expires we need to relog the user
* 3. If token ok we send a new token cause we want the best ux.
* The user can stay log longer if he do stuff.
*/
import jwt from 'jsonwebtoken';
import serverConfig from '../config/serverConfig';
import { generateToken, setUserInfo } from './index';
import { User } from '../modules';

export const checkToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Must pass token' });
  }

  jwt.verify(token.replace(/^JWT\s/, ''), serverConfig.JWT_SECRET, (err, decoded) => {
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
        token: `JWT ${generateToken(user)}`,
        user: setUserInfo(user)
      }))
      .catch(error => res.status(401).json({ success: false, message: 'Something wrong happen with the token!', error }));
  });
};
