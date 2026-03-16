import baseApi from 'services/api/baseApi';
import { getSubscriptionsEndpoints } from 'services/api/subscriptions/queries';
import { getProductsEndpoints } from 'services/api/products/queries';
import { getPaymentsHistoryEndpoints } from 'services/api/payments-history/queries';
import { getUsersEndpoints } from 'services/api/users/queries';
import { getPaymentEndpoints } from 'services/api/payment/queries';

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ...getUsersEndpoints(builder),
    ...getPaymentEndpoints(builder),
    ...getSubscriptionsEndpoints(builder),
    ...getProductsEndpoints(builder),
    ...getPaymentsHistoryEndpoints(builder)
  })
});
