import CreateTodo from './create-todo.interface';
import Todo from './todo.interface';

export default interface TodoResource {
  findAll(): Todo[];
  findById(id: string): Todo | undefined;
  addTodo(todoDto: CreateTodo): Todo;
  removeTodo(id: string): void;
}
