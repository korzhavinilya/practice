import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { Product } from 'services/api/products/types';

interface Props {
  product: Product;
  unsubscribe: () => void;
  handleCheckout: () => void;
  handleCreateIntent: () => void;
}

export default function ProductCard({
  product,
  unsubscribe,
  handleCheckout,
  handleCreateIntent
}: Props) {
  return (
    <Popover>
      {({ close }) => (
        <>
          <PopoverButton className="block text-sm/6 text-black focus:outline-none data-active:text-black data-focus:outline data-focus:outline-black data-hover:text-gray-500 cursor-pointer">
            <div key={product.id} className="group relative">
              <span className="border border-gray-400 aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 flex justify-center items-center">
                {!!product.subscription_id && (
                  <BanknotesIcon className="size-7" />
                )}
              </span>
              <div className="mt-4 flex flex-col justify-between text-sm text-gray-700">
                <p>{product.name}</p>

                {product.current_period_start && (
                  <p>
                    <span>Starts at:</span>{' '}
                    {new Date(
                      product.current_period_start
                    ).toLocaleDateString()}
                  </p>
                )}

                {product.current_period_end && (
                  <p>
                    <span>Ends at:</span>{' '}
                    {new Date(product.current_period_end).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="divide-y divide-black/5 rounded-xl border bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
          >
            <div className="p-3">
              {!!product.subscription_id && (
                <button
                  className="w-full block rounded-lg px-3 py-2 transition hover:bg-black/5"
                  onClick={() => {
                    unsubscribe();
                    close();
                  }}
                >
                  Cancel Subscription
                </button>
              )}

              {!product.subscription_id && (
                <button
                  className="w-full block rounded-lg px-3 py-2 transition hover:bg-black/5"
                  onClick={() => {
                    handleCheckout();
                    close();
                  }}
                >
                  Subscribe (Checkout)
                </button>
              )}

              {!product.subscription_id && (
                <button
                  className="w-full block rounded-lg px-3 py-2 transition hover:bg-black/5"
                  onClick={() => {
                    handleCreateIntent();
                    close();
                  }}
                >
                  Subscribe (Intent)
                </button>
              )}

              <button
                className={clsx(
                  'w-full block rounded-lg px-3 py-2 transition hover:bg-black/5',
                  {
                    'opacity-50': true
                  }
                )}
                disabled
              >
                Delete
              </button>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
