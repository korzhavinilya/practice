import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export interface Comment {
  id: number;
  postId: number;
  email: string;
  name: string;
  body: string;
}

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001'
  }),
  tagTypes: ['Comment'],
  // refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  // keepUnusedDataFor: 30,
  endpoints: (build) => ({
    getComments: build.query<Comment[], number>({
      query: (limit: number = 5) => ({
        url: '/comments',
        params: {
          _limit: limit
        }
      }),
      providesTags: [{ id: '*', type: 'Comment' }]
      // providesTags: ['Comment']
    }),
    getComment: build.query<Comment, number>({
      query: (id) => ({
        url: `/comments/${id}`
      }),
      providesTags: (result) => {
        return result
          ? [
              {
                id: result.id,
                type: 'Comment'
              }
            ]
          : [];
      }
    }),
    updateComment: build.mutation<Comment, Comment>({
      query: (comment) => ({
        url: `/comments/${comment.id}`,
        method: 'PUT',
        body: comment
      }),
      invalidatesTags: (result) => {
        return result
          ? [
              { id: '*', type: 'Comment' },
              { id: result?.id, type: 'Comment' }
            ]
          : ['Comment'];
      }
    })
  })
});
