import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../modules';
import serverConfig from './serverConfig';
import authKey from './passportAuthKey';

const { JWT_SECRET } = serverConfig;

/*
* GITHUB Strategy
*/
const githubAuth = new GitHubStrategy(authKey.github, (accessToken, refreshToken, profile, cb) => {
  return User.findOne({ 'github.id': profile.id }, (err, user) => {
    if (err) { return cb(err); }

    if (user) {
      return cb(null, user);
    }

    const newUser = new User({
      'github.email': profile._json.email,
      'github.id': profile.id,
      'github.token': accessToken,
      'github.username': profile.username,
      'github.avatar': profile._json.avatar_url,
      provider: profile.provider
    });

    return newUser.save()
      .then(
        u => cb(null, u),
        error => cb(error)
      );
  });
});

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
  User.findById(payload.sub)
    .then(user => {
      if (!user) { return done(null, false); }

      return done(null, user);
    })
    .catch(err => done(err, false));
});

passport.use(localLogin);
passport.use(jwtLogin);
passport.use(githubAuth);
