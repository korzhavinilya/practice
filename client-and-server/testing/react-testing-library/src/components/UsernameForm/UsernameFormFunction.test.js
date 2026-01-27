import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import UsernameFormFunction from './UsernameFormFunction';

test('calls updateUsername with the new username', async () => {
  const promise = Promise.resolve();
  const handleUpdateUsername = jest.fn(() => promise);
  const fakeUsername = 'fakeUsername';

  render(<UsernameFormFunction updateUsername={handleUpdateUsername} />);

  const usernameInput = screen.getByLabelText(/username/i);
  user.type(usernameInput, fakeUsername);
  user.click(screen.getByText(/submit/i));

  console.log('expect');
  expect(handleUpdateUsername).toHaveBeenCalledWith(fakeUsername);

  console.log('await promise');
  await act(() => promise);
});
