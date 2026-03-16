import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/react';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import assert from 'assert';
import clsx from 'clsx';
import AppRoutePaths from 'constants/AppRoutes';
import { Link } from 'react-router-dom';
import { api } from 'services/api';
import { selectCurrentUser, setCurrentUser } from 'services/slices/auth';
import { useAppDispatch, useAppSelector } from 'services/store';

export default function Header() {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const { isFetching: isUsersFetching, data: users = [] } =
    api.useGetUsersQuery();

  const [addNewUser] = api.useCreateUserMutation();
  const [createCustomerPortalLink] = api.useCreateCustomerPortalLinkMutation();

  async function redirectToCustomerPortal() {
    try {
      assert(currentUser);
      const { data } = await createCustomerPortalLink({ id: currentUser.id });
      assert(data);

      window.location.assign(data.url);
    } catch (error: any) {
      console.log('Error', error);
      alert(error.message);
    }
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-center p-6 px-8">
        <PopoverGroup className="flex gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              Accounts
              <ChevronDownIcon className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {users.map((user) => {
                  const isCurrentUser = user.id === currentUser?.id;
                  return (
                    <div
                      key={user.id}
                      className={clsx(
                        'group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50',
                        {
                          'border border-gray-400 bg-gray-50': isCurrentUser
                        }
                      )}
                      onClick={() => dispatch(setCurrentUser(user))}
                    >
                      <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <UserCircleIcon />
                      </div>
                      <span className="block flex-1 font-semibold text-gray-900">
                        {user.email}
                      </span>

                      {!!user.stripe_customer_id && (
                        // <CurrencyDollarIcon className="size-6" />
                        <span className="border rounded-4xl text-white bg-blue-600 px-2 py-1 text-xs cursor-pointer">
                          stripe
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                <button
                  className={clsx(
                    'flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100',
                    {
                      'opacity-50': true
                    }
                  )}
                  disabled
                >
                  <XMarkIcon className="size-5 flex-none text-gray-400" />
                  Delete
                </button>

                <button
                  className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  onClick={() => addNewUser()}
                >
                  <PlusIcon className="size-5 flex-none text-gray-400" />
                  Add New
                </button>
              </div>
            </PopoverPanel>
          </Popover>

          <Link
            to={AppRoutePaths.Products}
            className={clsx('text-sm/6 font-semibold text-gray-900')}
          >
            Products
          </Link>

          <button
            onClick={redirectToCustomerPortal}
            className={clsx(
              'text-sm/6 font-semibold text-gray-900 cursor-pointer',
              {
                'opacity-50': !currentUser
              }
            )}
            disabled={!currentUser}
          >
            Customer Portal
          </button>
        </PopoverGroup>
      </nav>
    </header>
  );
}
