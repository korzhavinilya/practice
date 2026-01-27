import { render, screen, fireEvent, within } from '@testing-library/react';
import Header from './Header';
import axios from 'axios';

jest.mock('axios');

test('should show search result', async () => {
  axios.get.mockReturnValue({
    data: [
      {
        id: 1,
        name: 'Leanne Graham',
      },
    ],
  });

  render(<Header />);

  const inputElement = screen.queryByRole('textbox');
  fireEvent.change(inputElement, {
    target: {
      value: 'Leanne Graham',
    },
  });

  const buttonElement = screen.getByText('Search');
  fireEvent.click(buttonElement);

  const ulElement = await screen.findByRole('list');
  expect(ulElement).toBeInTheDocument();
  const { queryAllByRole } = within(ulElement);
  const items = queryAllByRole('listitem');
  expect(items.length).toBe(1);
});
