import { type EndpointBuilder } from 'services/api/baseApi';
import { type Product } from 'services/api/products/types';
import type { GetEntityForIdQueryArg } from 'services/api/utils/types';

export function getProductsEndpoints(builder: EndpointBuilder) {
  return {
    getProducts: builder.query<Product[], GetEntityForIdQueryArg>({
      query: ({ id }) => `/api/users/${id}/products`,
      providesTags: (result) =>
        result
          ? [
              // ...result.map(({ exposedAccessSharingRecordId: id }) => ({
              //   id,
              //   type: 'Products' as const,
              // })),
              'Products'
            ]
          : []
    }),
    createProduct: builder.mutation<Product, GetEntityForIdQueryArg>({
      query: ({ id }) => ({
        url: `/api/users/${id}/products`,
        method: 'POST'
      }),
      invalidatesTags: ['Products']
    })
  };
}
