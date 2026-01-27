import { store } from './store';

export function getAccessToStoreExportStore() {
  const state = store.getState();
  console.log(state);
}
