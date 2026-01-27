import { Provider } from 'react-redux';
import { createReduxStore } from '../redux/createReduxStore';

export default function renderTestApp(component, options) {
  const { initialState } = options;
  const store = createReduxStore(initialState);

  return <Provider store={store}>{component}</Provider>;
}
