import { Router } from 'express';
import { iocContainer } from '../configs/inversify.config';
import TodoController from '../controllers/todo.controller';
import { TYPES } from '../controllers/types';

class TodoRouter {
  constructor(private router: Router, private todoController: TodoController) {
    this.setupRouter();
  }

  get todoRouter() {
    return this.router;
  }

  private setupRouter() {
    this.router
      .route('/')
      .get(this.todoController.findAll.bind(this.todoController))
      .post(this.todoController.create.bind(this.todoController));

    this.router
      .route('/:id')
      .get(this.todoController.findById.bind(this.todoController))
      .delete(this.todoController.delete.bind(this.todoController));
  }
}

const todoController = iocContainer.get<TodoController>(TYPES.TodoController);
const todoRouter = new TodoRouter(Router(), todoController).todoRouter;

export { TodoRouter, todoRouter };
