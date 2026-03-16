import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'services/api/baseQuery';

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['User', 'Subscription', 'Products', 'Payment History']
});

export type EndpointBuilder = Parameters<
  Parameters<typeof baseApi.injectEndpoints>[0]['endpoints']
>[0];

export type ApiTag = Extract<
  Parameters<typeof baseApi.util.selectInvalidatedBy>[1][number],
  string
>;

export default baseApi;
