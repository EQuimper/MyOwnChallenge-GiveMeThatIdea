import { Router } from 'express';
import * as CategoryController from './controller';

const routes = new Router();

routes.route('/categories').get(CategoryController.getAll);
routes.route('/categories-ideas').get(CategoryController.getAllIdeas);
routes.route('/categories').post(CategoryController.createOne);

export default routes;
