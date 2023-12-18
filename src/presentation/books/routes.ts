import { Router } from 'express';
import { BookService } from './service';
import { BookController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middlewares';

export class BookRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    const service = new BookService();
    const controller = new BookController(service);

    router.post('/', AuthMiddleware.authenticate, controller.createBook);
    router.get('/', controller.getAllBooks);
    router.get('/:id', controller.getById);

    return router;
  }
}
