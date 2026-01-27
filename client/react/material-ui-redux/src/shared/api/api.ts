import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUsersEndpoints } from './getUsersEndpoints';

const baseApi = createApi({
  reducerPath: 'limsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API_URL,
  }),
  tagTypes: ['Annotation Entry', 'Specimen'],
  endpoints: () => ({}),
  // Set a fairly aggressive caching policy until DFS Phase 3.
  // TODO: Reconsider caching policies on a more granular level in DFS Phase 3.
  refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
});

export type EndpointBuilder = Parameters<
  Parameters<typeof baseApi.injectEndpoints>[0]['endpoints']
>[0];

export type ApiTag = Extract<
  Parameters<typeof baseApi.util.selectInvalidatedBy>[1][number],
  string
>;

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ...getUsersEndpoints(builder),
  }),
});
