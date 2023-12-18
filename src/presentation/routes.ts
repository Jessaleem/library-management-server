import { Request, Response, Router } from 'express';
import { UserRoutes } from './users/routes';
import { BookRoutes } from './books/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', UserRoutes.routes);
    router.use('/api/book', BookRoutes.routes);

    return router;
  }
}
