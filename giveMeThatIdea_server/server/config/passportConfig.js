import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../modules';
import serverConfig from './serverConfig';

const { JWT_SECRET } = serverConfig;

/*
* Local Strategy
*/
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // try to find user with the local.email
  User.findOne({ 'local.email': email })
    .then(user => {
      // if no user return no error & no user
      if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
      // make use of the methods comparePassword
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        } else if (!isMatch) {
          return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
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
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
  // Telling Passport where to find the secret
  secretOrKey: JWT_SECRET
};

const jwtLogin = new JWTStrategy(jwtOptions, (payload, done) => {
  console.log(payload);
  User.findById(payload.sub)
    .then(user => {
      if (!user) { return done(null, false); }

      return done(null, user);
    })
    .catch(err => done(err, false));
});

passport.use(localLogin);
passport.use(jwtLogin);
