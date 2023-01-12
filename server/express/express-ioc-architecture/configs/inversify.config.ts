import 'reflect-metadata';
import { Container } from 'inversify';
import TodoResource from '../interfaces/todo-resource.interface';
import TodoFsResource from '../resources/todo-fs.resource';
import { TYPES as ResourceTypes } from '../resources/types';
import TodoService from '../services/todo.service';
import { TYPES as ServiceType } from '../services/types';
import TodoController from '../controllers/todo.controller';
import { TYPES as ControllerTypes } from '../controllers/types';

const iocContainer = new Container();

iocContainer
  .bind<TodoResource>(ResourceTypes.TodoResource)
  .to(TodoFsResource)
  .inSingletonScope();

iocContainer
  .bind<TodoService>(ServiceType.TodoService)
  .to(TodoService)
  .inSingletonScope();

iocContainer
  .bind<TodoController>(ControllerTypes.TodoController)
  .to(TodoController)
  .inSingletonScope();

export { iocContainer };
