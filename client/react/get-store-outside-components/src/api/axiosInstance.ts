import { setAmount } from '../../counterSlice';
import { store } from '../../store';
import createAxiosInstance from './createAxiosInstance';

function getAccessToken() {
  const state = store.getState();
  return '' + state.counter.value;
}

function setAccessToken(accessToken: number) {
  store.dispatch(setAmount(accessToken));
}

export const axiosInstance = createAxiosInstance({
  refreshTokensUrl: '' + process.env.REACT_APP_REFRESH_TOKEN_URL,
  options: {
    baseURL: process.env.REACT_APP_BASE_API_URL,
    withCredentials: true,
  },
  getAccessToken,
  setAccessToken,
});
