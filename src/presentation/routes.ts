import { Request, Response, Router } from 'express';
import { UserRoutes } from './users/routes';
import { BookRoutes } from './books/routes';
import { BorrowRoutes } from './borrows/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', UserRoutes.routes);
    router.use('/api/book', BookRoutes.routes);
    router.use('/api/borrow', BorrowRoutes.routes);

    return router;
  }
}
