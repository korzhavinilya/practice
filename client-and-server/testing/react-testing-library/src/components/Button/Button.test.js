import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('should contain a button', () => {
  render(<Button text="OK" />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement.innerHTML).toBe('OK');
});

test('should simulate a click', () => {
  const onClickMock = jest.fn();
  render(<Button text="OK" onClick={onClickMock} />);
  const buttonElement = screen.getByText('OK');
  fireEvent.click(buttonElement);
  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
