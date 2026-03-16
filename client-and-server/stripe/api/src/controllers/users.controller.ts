import { NextFunction, Request, Response } from 'express';
import Logger from '../logger';
import UsersService from '../services/users.service';

export default class UsersController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    Logger.info('Find all users');

    try {
      const users = await UsersService.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    Logger.info('Create a user');

    try {
      await UsersService.create();
      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
}
