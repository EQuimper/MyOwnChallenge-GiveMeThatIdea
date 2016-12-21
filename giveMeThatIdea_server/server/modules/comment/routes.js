import { Router } from 'express';
import * as CommentController from './controller';
import { requireAuth } from '../../helpers';

const routes = new Router();

routes.route('/ideas/:id/comments/new').post(requireAuth, CommentController.createComment);

export default routes;
