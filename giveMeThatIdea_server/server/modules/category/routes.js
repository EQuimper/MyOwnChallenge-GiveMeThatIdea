import { Router } from 'express';
import * as CategoryController from './controller';

const routes = new Router();

routes.route('/categories').get(CategoryController.getAll);

export default routes;
