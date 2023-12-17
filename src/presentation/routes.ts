import { Request, Response, Router } from 'express';
import { UserRoutes } from './users/routes';
import { BookRoutes } from './books/routes';
import { AuthMiddleware } from './middlewares/auth.middlewares';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', UserRoutes.routes);
    router.use('/api/book', AuthMiddleware.authenticate, BookRoutes.routes);

    return router;
  }
}
