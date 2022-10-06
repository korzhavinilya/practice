import { iocContainer } from '../configs/inversify.config';
import TodoFsResource from './todo-fs.resource';
import { TYPES } from './types';

let todoFsResource: TodoFsResource;

describe('TodoFsResource', () => {
  beforeEach(() => {
    todoFsResource = iocContainer.get(TYPES.TodoResource);
  });

  it('should work', () => {
    const result = [
      {
        id: '1',
        title: 'title',
        completed: true,
      },
    ];

    jest.spyOn(todoFsResource, 'findAll').mockReturnValue(result);
    expect(todoFsResource.findAll()).toEqual(result);
  });
});
