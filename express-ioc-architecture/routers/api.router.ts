import { Router } from 'express';
import Route from '../interfaces/route.interface';
import { todoRouter } from './todo.router';

class ApiRouter {
  constructor(private router: Router, private routes: Route[]) {
    this.setupApiRoutes();
  }

  get apiRouter() {
    return this.router;
  }

  private setupApiRoutes() {
    this.routes.forEach(this.addApiRoute);
  }

  private addApiRoute = (route: Route) => {
    this.router.use(route.url, route.router);
  };
}

const routes = [{ url: '/todo', router: todoRouter }];

const apiRouter = new ApiRouter(Router(), routes).apiRouter;

export { ApiRouter, apiRouter };
