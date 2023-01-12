import { inject, injectable } from 'inversify';
import CreateTodo from '../interfaces/create-todo.interface';
import TodoResource from '../interfaces/todo-resource.interface';
import { TYPES } from '../resources/types';

@injectable()
export default class TodoService {
  constructor(@inject(TYPES.TodoResource) private todoResource: TodoResource) {}

  findAll() {
    return this.todoResource.findAll();
  }

  findById(id: string) {
    return this.todoResource.findById(id);
  }

  addTodo(todoDto: CreateTodo) {
    return this.todoResource.addTodo(todoDto);
  }

  removeTodo(id: string) {
    return this.todoResource.removeTodo(id);
  }
}
