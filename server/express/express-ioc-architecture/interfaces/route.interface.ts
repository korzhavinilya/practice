import { Router } from 'express';

export default interface Route {
  url: string;
  router: Router;
}
