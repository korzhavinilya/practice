import { BehaviorSubject } from 'rxjs';

const apiCache = new Map<string, any>();

export function getData(url: string) {
  const response = apiCache.get(url);
  if (response) {
    return Promise.resolve(response);
  }

  return new Promise((resolve) => {
    const response = {
      data: 'Webpack externals import',
    };

    apiCache.set(url, response);

    resolve(response);
  });
}

type RxJsStateType = {
  message: string;
};

export const rxjsState = new BehaviorSubject<RxJsStateType | null>(null);

export function triggerRxjsSubject() {
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      rxjsState.next({ message: 'Rxjs message #' + i });
    }, i * 1000);
  }
}
