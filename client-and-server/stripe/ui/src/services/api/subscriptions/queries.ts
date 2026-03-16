import { type EndpointBuilder } from 'services/api/baseApi';
import { type Subscription } from 'services/api/subscriptions/types';
import type { GetEntityForIdQueryArg } from 'services/api/utils/types';

export function getSubscriptionsEndpoints(builder: EndpointBuilder) {
  return {
    getSubscriptions: builder.query<Subscription[], void>({
      query: () => `/api/payment/subscriptions`,
      providesTags: (result) =>
        result
          ? [
              // ...result.map(({ exposedAccessSharingRecordId: id }) => ({
              //   id,
              //   type: 'Subscription' as const,
              // })),
              'Subscription'
            ]
          : []
    }),
    deleteSubscription: builder.mutation<void, GetEntityForIdQueryArg>({
      query: ({ id }) => ({
        url: `/api/subscriptions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Subscription']
    })
  };
}
