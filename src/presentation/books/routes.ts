import { Router } from 'express';
import { BookService } from './service';
import { BookController } from './controller';

export class BookRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    const service = new BookService();
    const controller = new BookController(service);

    router.post('/', controller.createBook);

    return router;
  }
}
