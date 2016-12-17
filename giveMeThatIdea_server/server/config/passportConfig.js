import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../modules';
import serverConfig from './serverConfig';

const { JWT_SECRET } = serverConfig;

/*
* Local Strategy
*/
const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // try to find user with the local.email
  User.findOne({ 'local.email': email })
    .then(user => {
      // if no user return no error & no user
      if (!user) { return done(null, false); }
      // make use of the methods comparePassword
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        } else if (!isMatch) {
          return done(null, false, { message: 'User not exist' });
        }
        // if no error & match return no error with the user
        return done(null, user);
      });
    })
    .catch(err => done(err));
});

/*
* JWT Strategy
*/

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
  secretOrKey: JWT_SECRET,
  audience: 'http://localhost:3000'
};

const jwtLogin = new JWTStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(user => {
      if (!user) { return done(null, false); }

      return done(null, user);
    })
    .catch(err => done(err));
});

passport.use(localLogin);
passport.use(jwtLogin);