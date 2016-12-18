import { Router } from 'express';
import passport from 'passport';
import * as IdeaController from './controller';
import '../../config/passportConfig';

const requireAuth = passport.authenticate('jwt', { session: false });

const ideaRoutes = new Router();

ideaRoutes.route('/ideas/new').post(requireAuth, IdeaController.createIdea);
ideaRoutes.route('/ideas/:id').delete(requireAuth, IdeaController.deleteIdea);
ideaRoutes.route('/ideas/:id').put(requireAuth, IdeaController.updateIdea);
ideaRoutes.route('/ideas/').get(requireAuth, IdeaController.getAllIdea);
ideaRoutes.route('/ideas/asyncIdeaTitle').post(requireAuth, IdeaController.asyncIdeaTitle);

export default ideaRoutes;
