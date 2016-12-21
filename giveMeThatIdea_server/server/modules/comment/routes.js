import { Router } from 'express';
import * as CommentController from './controller';

const routes = new Router();

routes.route('/ideas/:ideaId/comments/new').post(CommentController.createComment);

export default routes;
