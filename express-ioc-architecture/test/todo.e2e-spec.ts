import supertest from 'supertest';
import { iocContainer } from '../configs/inversify.config';
import app from '../index';
import TodoResource from '../interfaces/todo-resource.interface';
import { TYPES } from '../resources/types';

let todoResource: TodoResource;

describe('TodoController (e2e)', () => {
  beforeEach(() => {
    todoResource = iocContainer.get(TYPES.TodoResource);
  });

  it('/todo (GET)', (done) => {
    const result = [
      {
        id: '1',
        title: 'title',
        completed: true,
      },
    ];

    jest.spyOn(todoResource, 'findAll').mockReturnValue(result);
    supertest(app).get('/api/todo').expect(200).expect(result).end(done);
  });
});
