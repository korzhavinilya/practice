import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('should contain links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const links = screen.getAllByRole('link');
  expect(links.length).toBe(4);
});

test('NotFoundPage', () => {
  render(
    <MemoryRouter initialEntries={['/asdasdasd']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('NotFoundPage')).toBeInTheDocument();
});
