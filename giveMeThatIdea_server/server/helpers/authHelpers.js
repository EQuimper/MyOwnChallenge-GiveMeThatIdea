import passport from 'passport';
import '../config/passportConfig';

export const requireLogin = passport.authenticate('local', { session: false });
export const requireAuth = passport.authenticate('jwt', { session: false });
// export const requireGithub = passport.authenticate('github', {
//   failureRedirect: 'http://localhost:3000',
//   successRedirect: '/api/v1/auth/success',
//   session: true,
//   // passReqToCallback: true
// });
// export const userGithub = passport.authenticate('github', { session: false });
