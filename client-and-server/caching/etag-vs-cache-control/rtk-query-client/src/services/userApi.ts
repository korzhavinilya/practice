import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type User = {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  birthdate: number;
  registeredAt: number;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      /* Кэшированные данные будут храниться в течение 10 секунд после размонтирования компонента, 
      который их использовал. Если через 10 секунд другой компонент запросит эти данные, 
      они будут запрошены снова. */
      keepUnusedDataFor: 10,
      providesTags: (result) => {
        console.log({ result });

        const type = 'User' as const;

        const tags = [
          { id: '*', type },
          ...(result?.map((user) => ({
            id: user.userId,
            type
          })) ?? [])
        ];

        return tags;
      }
    }),
    updateUser: builder.mutation<void, User>({
      query: (user) => ({
        url: `/users/${user.userId}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: 'User', id: userId }
      ]
    })
  })
});

export const { useGetUsersQuery, useUpdateUserMutation } = userApi;
