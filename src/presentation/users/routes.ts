import { Router } from 'express';
import { UserServices } from './service';
import { UserController } from './controller';

export class UserRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    const service = new UserServices();
    const controller = new UserController(service);

    router.post('/signup', controller.signup);
    router.post('/login', controller.login);

    return router;
  }
}
