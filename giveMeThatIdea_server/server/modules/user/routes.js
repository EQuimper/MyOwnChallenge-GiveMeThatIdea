import { Router } from 'express';
import * as UserController from './controller';
import { requireLogin, checkToken } from '../../helpers';

const routes = new Router();

routes.route('/auth/signup').post(UserController.signup);
routes.route('/auth/login').post(requireLogin, UserController.login);

// routes.route('/auth/github').get(passport.authenticate('github', { scope: ['user:email'] }));
// routes.route('/auth/github/callback').get(requireGithub, UserController.loginGithub);
// routes.route('/auth/success').get(UserController.loginGithub2);
// routes.route('/auth/success').get(UserController.loginGithub);
// routes.route('/auth/github/info').get(UserController.loginGithub);

routes.route('/auth/asyncUsername').post(UserController.asyncUsername);
routes.route('/auth/asyncEmail').post(UserController.asyncEmail);
routes.route('/auth/checkToken').post(checkToken);
routes.route('/auth/forgotPassword').post(UserController.forgotPassword);
routes.route('/auth/resetPassword/:resetToken').post(UserController.resetPassword);
routes.route('/auth/resetPassword/:resetToken/newPassword').post(UserController.changePassword);

export default routes;
