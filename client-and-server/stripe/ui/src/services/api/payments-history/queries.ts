import { type EndpointBuilder } from 'services/api/baseApi';
import { type History } from 'services/api/payments-history/types';

export function getPaymentsHistoryEndpoints(builder: EndpointBuilder) {
  return {
    getPaymentsHistory: builder.query<History[], void>({
      query: () => `/api/payment/history`,
      providesTags: (result) =>
        result
          ? [
              // ...result.map(({ exposedAccessSharingRecordId: id }) => ({
              //   id,
              //   type: 'Subscription' as const,
              // })),
              'Payment History'
            ]
          : []
    })
  };
}
