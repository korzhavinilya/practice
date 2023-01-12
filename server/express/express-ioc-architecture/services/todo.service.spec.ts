import { iocContainer } from '../configs/inversify.config';
import TodoResource from '../interfaces/todo-resource.interface';
import TodoService from './todo.service';
import { TYPES as ResourceTypes } from '../resources/types';
import { TYPES as ServiceTypes } from './types';

let todoService: TodoService;
let todoResource: TodoResource;

describe('TodoService', () => {
  beforeEach(() => {
    // iocContainer.rebind(ResourceTypes.TodoResource).toConstantValue({
    //   findAll() {
    //     return result;
    //   },
    // });

    todoService = iocContainer.get(ServiceTypes.TodoService);
    todoResource = iocContainer.get(ResourceTypes.TodoResource);
  });

  it('should work', () => {
    // const result = [
    //   {
    //     id: '1',
    //     title: 'title',
    //     completed: true,
    //   },
    // ];

    // const spyTodoResource = jest
    //   .spyOn(todoResource, 'findAll')
    //   .mockReturnValue(result);

    // expect(todoService.findAll()).toEqual(result);
    // expect(spyTodoResource).toHaveBeenCalled();

  });
});
