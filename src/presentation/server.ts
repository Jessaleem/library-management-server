import express, { Router } from 'express';
import morgan from 'morgan';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  executeServer(): void {
    //middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));

    //routes
    this.app.use(this.routes);

    //server
    this.app.listen(this.port, () => {
      console.log(`Server is running at ${this.port}`);
    });
  }
}
