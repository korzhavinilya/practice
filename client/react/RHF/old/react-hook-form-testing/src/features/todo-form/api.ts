import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getTodoById: builder.query<Todo, string>({
      query: (id) => `/todos/${id}`,
    }),
  }),
})

export const { useGetTodoByIdQuery, useLazyGetTodoByIdQuery } = todoApi
