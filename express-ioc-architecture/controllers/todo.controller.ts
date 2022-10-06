import TodoService from '../services/todo.service';
import { Request, Response, NextFunction } from 'express';
import CreateTodo from '../interfaces/create-todo.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../services/types';

@injectable()
export default class TodoController {
  constructor(@inject(TYPES.TodoService) private todoService: TodoService) {}

  findAll(req: Request, res: Response, next: NextFunction) {
    return res.send(this.todoService.findAll());
  }

  findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    return res.send(this.todoService.findById(id));
  }

  create(req: Request, res: Response, next: NextFunction) {
    const todo: CreateTodo = req.body;
    return res.send(this.todoService.addTodo(todo));
  }

  delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    return res.send(this.todoService.removeTodo(id));
  }
}
