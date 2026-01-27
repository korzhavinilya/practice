import { baseApi } from '../../shared/baseApi';
import type { User, UserId } from './users.types';
import z from 'zod';

const UserDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string()
});

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      transformResponse: (res) => UserDtoSchema.array().parse(res),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users', id } as const)),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    getUser: builder.query<User, UserId>({
      query: (userId) => `/users/${userId}`,
      transformResponse: (res) => UserDtoSchema.parse(res),
      providesTags: (_, __, id) => [{ type: 'Users', id }]
    }),
    deleteUser: builder.mutation<void, UserId>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    })
  }),
  overrideExisting: true
});
