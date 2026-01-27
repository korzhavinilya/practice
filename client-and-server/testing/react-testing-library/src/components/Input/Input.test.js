import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

test('should contain an input', () => {
  render(<Input placeholder="Enter a name" />);

  const inputELement = screen.getByPlaceholderText(/enter a name/i);
  expect(inputELement).toBeInTheDocument();
});

test('onChange', () => {
  const onChangeMock = jest.fn();
  render(<Input onChange={onChangeMock} />);
  const inputElement = screen.queryByRole('textbox');
  fireEvent.change(inputElement, {
    target: {
      value: 'Hello World!',
    },
  });
  expect(onChangeMock).toHaveBeenCalled();
});

test('changing value', () => {
  const onChangeMock = jest.fn();
  const value = 'Hello World!';
  render(<Input onChange={onChangeMock} />);
  const inputElement = screen.queryByRole('textbox');
  fireEvent.change(inputElement, {
    target: {
      value,
    },
  });
  const mockArgument = onChangeMock.mock.calls[0][0];
  expect(mockArgument).toBe(value);
});
