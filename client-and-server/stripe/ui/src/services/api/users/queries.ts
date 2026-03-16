import { type EndpointBuilder } from 'services/api/baseApi';
import type { User } from 'services/api/users/types';
import { setCurrentUser } from 'services/slices/auth';
import type { RootState } from 'services/store';

export function getUsersEndpoints(builder: EndpointBuilder) {
  return {
    getUsers: builder.query<User[], void>({
      query: () => `/api/users`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                id,
                type: 'User' as const
              })),
              'User'
            ]
          : [],
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const state = getState() as RootState;

          const currentUser = state.auth.user;
          if (!currentUser && !!data.length) {
            dispatch(setCurrentUser(data[0]));
          }
        } catch (err) {
          console.log('err', err);
        }
      }
    }),
    createUser: builder.mutation<User, void>({
      query: () => ({
        url: '/api/users',
        method: 'POST'
      }),
      invalidatesTags: ['User']
    })
  };
}
