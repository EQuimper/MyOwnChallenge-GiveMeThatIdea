import { Router } from 'express';
import passport from 'passport';
import * as UserController from './controller';
import '../../config/passportConfig';

const userRoutes = new Router();

const requireLogin = passport.authenticate('local', { session: false });

userRoutes.route('/auth/signup').post(UserController.signup);
userRoutes.route('/auth/login').post(requireLogin, UserController.login);
userRoutes.route('/auth/asyncemail').post(UserController.asyncEmail);

export default userRoutes;
