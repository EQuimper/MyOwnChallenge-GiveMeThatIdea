import { Router } from 'express';
import * as IdeaController from './controller';
import { requireAuth } from '../../helpers';

const routes = new Router();

routes.route('/ideas/new').post(requireAuth, IdeaController.createIdea);
routes.route('/ideas/:id').delete(requireAuth, IdeaController.deleteIdea);
routes.route('/ideas/:id').put(requireAuth, IdeaController.updateIdea);
routes.route('/ideas').get(requireAuth, IdeaController.getAllIdea);
routes.route('/ideas/:slug').get(requireAuth, IdeaController.getOneIdea);
routes.route('/ideas/asyncIdeaTitle').post(requireAuth, IdeaController.asyncIdeaTitle);
routes.route('/ideas/:id/followIdea').put(requireAuth, IdeaController.followIdea);
routes.route('/ideas/:id/unfollowIdea').put(requireAuth, IdeaController.unfollowIdea);

export default routes;
