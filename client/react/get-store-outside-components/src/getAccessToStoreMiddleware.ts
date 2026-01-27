// const SUSSESS_LOGIN_MESSAGE = 'LOGIN_SUCCESS';
const SUSSESS_LOGIN_MESSAGE = 'counter/increment';

export const getAccessToStoreMiddleware =
  (store: any) => (next: any) => (action: any) => {
    if (action.type === SUSSESS_LOGIN_MESSAGE) {
      // api.setToken(action.payload.authToken);
      console.log({ action });
    }

    return next(action);
  };
