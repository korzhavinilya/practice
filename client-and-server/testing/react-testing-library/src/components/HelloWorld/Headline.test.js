import { render, screen } from '@testing-library/react';
import Headline from './Headline';

test('should contain a label', () => {
  render(<Headline label="Hello World!" />);
  const h1Element = screen.getByText(/hello world/i);
  expect(h1Element).toBeInTheDocument();
});
