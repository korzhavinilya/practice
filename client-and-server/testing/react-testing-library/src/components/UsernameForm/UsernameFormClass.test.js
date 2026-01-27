import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import UsernameFormClass from './UsernameFormClass';

test('calls updateUsername with the new username', async () => {
  const promise = Promise.resolve();
  const handleUpdateUsername = jest.fn(() => promise);
  const fakeUsername = 'fakeUsername';
  render(<UsernameFormClass updateUsername={handleUpdateUsername} />);
  const usernameInput = screen.getByLabelText(/username/i);
  user.type(usernameInput, fakeUsername);
  user.click(screen.getByText(/submit/i));
  expect(handleUpdateUsername).toHaveBeenCalledWith(fakeUsername);
  await act(() => promise);
});
