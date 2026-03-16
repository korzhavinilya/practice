import AppLayout from 'components/layout/AppLayout';
import { api } from 'services/api';

export default function PaymentHistory() {
  const { isFetching, isError, data = [] } = api.useGetPaymentsHistoryQuery();
  const {
    isFetching: isFetchingSubs,
    isError: isErrorSubs,
    data: subs = []
  } = api.useGetSubscriptionsQuery();

  const [deleteSubscription] = api.useDeleteSubscriptionMutation();

  return (
    <AppLayout>
      <h1>Payment History</h1>

      {(isFetching || isFetchingSubs) && 'Loading...'}

      {(isError || isErrorSubs) && 'Error'}

      <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((history) => (
          <li
            key={history.id}
            className="py-0.5 px-2.5 border border-transparent text-sm transition-all shadow-sm"
          >
            id: {history.id.slice(0, 15)}
            <br />
            method: {history.payment_method_types.join(', ')}
            <br />
            {history.amount / 100} {history.currency.toUpperCase()}
            <br />
          </li>
        ))}
      </ul>

      <br />

      <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {subs.map((sub) => (
          <li
            key={sub.id}
            className="py-0.5 px-2.5 border border-transparent text-sm transition-all shadow-sm"
            onClick={() => deleteSubscription({ id: sub.id })}
          >
            id: {sub.id.slice(0, 15)}
            <br />
            {/* method: {sub.payment_method_types.join(', ')}
            <br /> */}
            {sub.plan.amount / 100} {sub.currency.toUpperCase()}
            <br />
          </li>
        ))}
      </ul>
    </AppLayout>
  );
}
