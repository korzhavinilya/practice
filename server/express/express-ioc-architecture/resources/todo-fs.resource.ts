import { injectable } from 'inversify';
import CreateTodo from '../interfaces/create-todo.interface';
import TodoResource from '../interfaces/todo-resource.interface';
import Todo from '../interfaces/todo.interface';

let lastIndex = 2;

let todos: Todo[] = [
  { id: '1', title: 'go to the market', completed: false },
  { id: '2', title: 'make the task', completed: false },
];

@injectable()
export default class TodoFsResource implements TodoResource {
  findAll() {
    return todos;
  }

  findById(id: string) {
    return todos.find((todo) => todo.id === id);
  }

  addTodo(todoDto: CreateTodo) {
    lastIndex++;

    const todo: Todo = {
      id: '' + lastIndex,
      title: todoDto.title,
      completed: false,
    };

    todos.push(todo);
    return todo;
  }

  removeTodo(id: string): void {
    todos = todos.filter((todo) => todo.id !== id);
  }
}
