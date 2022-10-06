export function sleep(time: number = 2000) {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, time);
  });
}

const api = {
  sleep,
};

export default api;
