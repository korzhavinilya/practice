import { type EndpointBuilder } from 'services/api/baseApi';
import type { PaymentPayload } from 'services/api/payment/types';
import type { GetEntityForIdQueryArg } from 'services/api/utils/types';

export function getPaymentEndpoints(builder: EndpointBuilder) {
  return {
    createCheckoutSession: builder.mutation<
      { sessionId: string },
      PaymentPayload
    >({
      query: ({ userId, productId }) => ({
        url: `/api/users/${userId}/products/${productId}/checkout-session`,
        method: 'POST'
      }),
      invalidatesTags: []
    }),
    createIntent: builder.mutation<{ clientSecret: string }, PaymentPayload>({
      query: ({ userId, productId }) => ({
        url: `/api/users/${userId}/products/${productId}/intent`,
        method: 'POST'
      }),
      invalidatesTags: []
    }),
    createCustomerPortalLink: builder.mutation<
      { url: string },
      GetEntityForIdQueryArg
    >({
      query: ({ id }) => ({
        url: `/api/users/${id}/customer-portal-link`,
        method: 'POST'
      }),
      invalidatesTags: []
    })
  };
}
