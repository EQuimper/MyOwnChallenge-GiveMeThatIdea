import { Router } from 'express';
import passport from 'passport';
import * as IdeaController from './controller';
import '../../config/passportConfig';

const requireAuth = passport.authenticate('jwt', { session: false });

const ideaRoutes = new Router();

ideaRoutes.route('/ideas/new').post(requireAuth, IdeaController.createIdea);
ideaRoutes.route('/ideas/:id').delete(requireAuth, IdeaController.deleteIdea);

export default ideaRoutes;
