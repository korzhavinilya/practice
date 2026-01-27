import { EndpointBuilder } from './api';
import { User } from './User';

export function getUsersEndpoints(builder: EndpointBuilder) {
  return {
    getUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
  };
}
