/*
* We generate a token with the user id provide
*/
import jwt from 'jsonwebtoken';
import serverConfig from '../config/serverConfig';

export const generateToken = user => jwt.sign({
  sub: user.id },
  serverConfig.JWT_SECRET,
  { expiresIn: '10s' }
);
