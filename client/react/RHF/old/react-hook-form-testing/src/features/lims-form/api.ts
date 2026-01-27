import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const limsApi = createApi({
  reducerPath: "limsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers) => {
      const token = "Bearer ey...."
      headers.set("authorization", token)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getNotesById: builder.query<any, null>({
      query: () =>
        "/notes/collection_pool/4302bc83-af3b-4091-8efe-27246c52a0a3",
    }),
    getSamplesById: builder.query<any, null>({
      query: () =>
        "/collection-pools/4302bc83-af3b-4091-8efe-27246c52a0a3/samples",
    }),
  }),
})

export const { useLazyGetNotesByIdQuery, useLazyGetSamplesByIdQuery } = limsApi
