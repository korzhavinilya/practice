import { combineReducers, createStore } from 'redux';
import userReducer from './reducers/old-userReducer';

const oldStore = createStore(
  combineReducers({
    user: userReducer,
  })
);
oldStore.getState();
export default oldStore;
