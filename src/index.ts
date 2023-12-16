import { Server } from './presentation/server';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';

async function main() {
  const app = new Server({ port: envs.PORT, routes: AppRoutes.routes });
  app.executeServer();
}

(() => {
  main();
})();
