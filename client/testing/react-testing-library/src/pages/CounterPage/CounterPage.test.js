import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../../redux/createReduxStore';
import renderTestApp from '../../utils/renderTestApp';
import CounterPage from './CounterPage';

test('renders initial values', () => {
  const { getByTestId } = render(
    renderTestApp(<CounterPage />, {
      initialState: {
        counter: {
          value: 10
        }
      }
    })
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const spanElement = getByTestId('counter-value');
  expect(spanElement).toBeInTheDocument();
  expect(spanElement.textContent).toBe('10');
});

// let store;

// beforeEach(() => {
//   store = createReduxStore({
//     counter: {
//       value: 10
//     }
//   });
// });

// test('initial value should exist', () => {
//   render(
//     <Provider store={store}>
//       <CounterPage />
//     </Provider>
//   );

// const spanElement = screen.queryByTestId('counter-value');
// expect(spanElement).toBeInTheDocument();
// expect(spanElement.textContent).toBe('10');
// });

// test('increment button', () => {
//   render(
//     <Provider store={store}>
//       <CounterPage />
//     </Provider>
//   );

//   const incrementButtonElement = screen.getByText('+');
//   fireEvent.click(incrementButtonElement);

//   const spanElement = screen.queryByTestId('counter-value');
//   expect(spanElement.textContent).toBe('11');
// });
