import clsx from 'clsx';
import { dummy_products } from 'components/products/constants';
import { useState } from 'react';
import { api } from 'services/api';

interface Props {
  handleCheckout: (ids: number[]) => void;
}

export default function Products({ handleCheckout }: Props) {

  const [selectedProductIds, setSelectedProductIds] = useState(
    new Set<number>()
  );

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Products
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {dummy_products.map((product) => (
          <div
            key={product.id}
            className="group relative"
            onClick={() =>
              setSelectedProductIds((selectedProductIds) => {
                const newSelectedProductIds = new Set(selectedProductIds);
                if (newSelectedProductIds.has(product.id)) {
                  newSelectedProductIds.delete(product.id);
                } else {
                  newSelectedProductIds.add(product.id);
                }
                return newSelectedProductIds;
              })
            }
          >
            <img
              alt={product.imageAlt}
              src={product.imageSrc}
              className={clsx(
                'aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80',
                {
                  'border-2 border-dashed': selectedProductIds.has(product.id)
                }
              )}
            />
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className={clsx(
          'mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
          {
            'opacity-50': !selectedProductIds.size
          }
        )}
        disabled={!selectedProductIds.size}
        onClick={() => handleCheckout(Array.from(selectedProductIds))}
      >
        Checkout
      </button>
    </div>
  );
}
