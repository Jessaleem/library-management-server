import { Request, Response, Router } from 'express';
import { UserRoutes } from './users/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', UserRoutes.routes);

    return router;
  }
}
