import { PlusIcon } from '@heroicons/react/24/outline';
import { skipToken } from '@reduxjs/toolkit/query';
import assert from 'assert';
import clsx from 'clsx';
import AppLayout from 'components/layout/AppLayout';
import ProductCard from 'components/products/ProductCard';
import getStripe from 'libs/getStripe';
import { api } from 'services/api';
import { selectCurrentUser } from 'services/slices/auth';
import { useAppSelector } from 'services/store';
import { useState } from 'react';
import IntentDialog from 'components/payment/IntentDialog';

export default function Products() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { isFetching: isProductFetching, data: products = [] } =
    api.useGetProductsQuery(currentUser ? { id: currentUser.id } : skipToken);

  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     `${import.meta.env.VITE_API_URL}/api/payment/sse`
  //   );

  //   eventSource.onmessage = (event) => {
  //     const eventData = JSON.parse(event.data);
  //     console.log('eventData', eventData);
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

  const [addNewProduct] = api.useCreateProductMutation();

  const [createCheckoutSession] = api.useCreateCheckoutSessionMutation();
  const [createIntent] = api.useCreateIntentMutation();
  const [unsubscribe] = api.useDeleteSubscriptionMutation();

  const [isIntentDialogVisibility, setIsIntentDialogVisibility] =
    useState(false);
  const [clientIntentSecret, setClientIntentSecret] = useState<
    string | undefined
  >();

  type CheckoutConfiguration = {
    activate_trial_period: boolean;
    allow_promotion_codes: boolean;
    price: 'one_time' | 'per_year' | 'per_month';
  };

  const [checkoutConfiguration, setCheckoutConfiguration] =
    useState<CheckoutConfiguration>({
      activate_trial_period: false,
      allow_promotion_codes: false,
      price: 'one_time'
    });

  async function handleCheckout(productId: string) {
    try {
      assert(currentUser);
      const { data } = await createCheckoutSession({
        userId: currentUser.id,
        productId
      });
      assert(data);

      const { sessionId } = data;

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error: any) {
      console.log('Error', error);
      alert(error.message);
    }
  }

  async function handleCreateIntent(productId: string) {
    try {
      assert(currentUser);
      const { data } = await createIntent({
        userId: currentUser.id,
        productId
      });
      assert(data);

      const { clientSecret } = data;

      setClientIntentSecret(clientSecret);
      setIsIntentDialogVisibility(true);
    } catch (error: any) {
      console.log('Error', error);
      alert(error.message);
    }
  }

  return (
    <>
      <IntentDialog
        open={isIntentDialogVisibility}
        clientSecret={clientIntentSecret ?? ''}
        handleClose={() => {
          setIsIntentDialogVisibility(false);
          setClientIntentSecret(undefined);
        }}
      />

      <AppLayout title="Products">
        <div className="grid gap-x-8 gap-y-10 grid-cols-4">
          <div>
            <h3 className="text-md font-semibold mb-4">
              Session Configuration
            </h3>

            <div className="flex items-center">
              <input
                id="activate_trial_period"
                type="checkbox"
                className="w-4 h-4"
                checked={checkoutConfiguration.activate_trial_period}
                onChange={() => {
                  setCheckoutConfiguration((config) => ({
                    ...config,
                    activate_trial_period: !config.activate_trial_period
                  }));
                }}
              />
              <label htmlFor="activate_trial_period" className="ms-2">
                Activate Trial Period
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="allow_promotion_codes"
                type="checkbox"
                className="w-4 h-4"
                checked={checkoutConfiguration.allow_promotion_codes}
                onChange={() => {
                  setCheckoutConfiguration((config) => ({
                    ...config,
                    allow_promotion_codes: !config.allow_promotion_codes
                  }));
                }}
              />
              <label htmlFor="allow_promotion_codes" className="ms-2">
                Allow Promotion Codes
              </label>
            </div>

            <h3 className="text-md font-semibold mt-6 mb-4">Prices</h3>

            <ul>
              <li>
                <div className="flex items-center">
                  <input
                    id="prices_one_time"
                    type="radio"
                    name="list-radio"
                    className="w-4 h-4"
                    checked={checkoutConfiguration.price === 'one_time'}
                    onChange={() => {
                      setCheckoutConfiguration((config) => ({
                        ...config,
                        price: 'one_time'
                      }));
                    }}
                  />
                  <label htmlFor="prices_one_time" className="ms-2">
                    One Time
                  </label>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <input
                    id="prices_per_year"
                    type="radio"
                    name="list-radio"
                    className="w-4 h-4"
                    checked={checkoutConfiguration.price === 'per_year'}
                    onChange={() => {
                      setCheckoutConfiguration((config) => ({
                        ...config,
                        price: 'per_year'
                      }));
                    }}
                  />
                  <label htmlFor="prices_per_year" className="ms-2">
                    Per Year
                  </label>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <input
                    id="prices_per_month"
                    type="radio"
                    name="list-radio"
                    className="w-4 h-4"
                    checked={checkoutConfiguration.price === 'per_month'}
                    onChange={() => {
                      setCheckoutConfiguration((config) => ({
                        ...config,
                        price: 'per_month'
                      }));
                    }}
                  />
                  <label htmlFor="prices_per_month" className="ms-2">
                    Per Year
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-span-3">
            <button
              className={clsx(
                'mt-2 border rounded-md flex items-center justify-center gap-x-2.5 p-2 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100',
                {
                  'opacity-50': !currentUser
                }
              )}
              onClick={() =>
                currentUser && addNewProduct({ id: currentUser.id })
              }
              disabled={!currentUser}
            >
              Add New
              <PlusIcon className="size-5 flex-none text-gray-400" />
            </button>

            {!products.length && !isProductFetching && (
              <p className="mt-6">No data found</p>
            )}

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  unsubscribe={() =>
                    unsubscribe({ id: product.subscription_id! })
                  }
                  handleCheckout={() => handleCheckout(product.id)}
                  handleCreateIntent={() => handleCreateIntent(product.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
