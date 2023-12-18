import { Router } from 'express';
import { BorrowController } from './controller';
import { BorrowService } from './service';
import { AuthMiddleware } from '../middlewares/auth.middlewares';

export class BorrowRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    const service = new BorrowService();
    const controller = new BorrowController(service);

    router.post('/', AuthMiddleware.authenticate, controller.createBorrow);
    router.put('/:id', AuthMiddleware.authenticate, controller.updateBorrow);
    router.get('/user', AuthMiddleware.authenticate, controller.getBorrowById);
    router.get('/', AuthMiddleware.authenticate, controller.getAllBorrows);

    return router;
  }
}
