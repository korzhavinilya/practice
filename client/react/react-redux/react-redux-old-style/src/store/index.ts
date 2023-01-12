import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import { cashReducer } from './reducers/cashReducer';
import { customerReducer } from './reducers/customerReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { customerCreatingSaga } from './sagas';

import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  cash: cashReducer,
  customers: customerReducer,
});

const sagaMiddleware = createSagaMiddleware();

// use saga middleware
export const store: any = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk))
);
sagaMiddleware.run(customerCreatingSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
