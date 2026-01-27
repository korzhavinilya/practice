import axios, { CreateAxiosDefaults } from 'axios';

type CreateAxiosInstanceProps = {
  refreshTokensUrl: string;
  options: CreateAxiosDefaults;
  getAccessToken(): string;
  setAccessToken: (accessToken: number) => void;
  //   getCurrentRefreshToken;
  //   refreshTokenUrl;
  //   logout;
  //   setRefreshedTokens;
};

export default function createAxiosInstance({
  refreshTokensUrl,
  options,
  getAccessToken,
  setAccessToken,
}: CreateAxiosInstanceProps) {
  const instance = axios.create(options);

  instance.interceptors.request.use(
    (config) => {
      const id = getAccessToken();

      if (id === '3') {
        setAccessToken(99);
      }

      config.url = config.url + '/' + id;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //   instance.interceptors.request.use(
  //     (config) => {
  //       if (config.headers.Authorization !== false) {
  //         const token = getCurrentAccessToken();
  //         if (token) {
  //           config.headers.Authorization = 'Bearer ' + token;
  //         }
  //       }
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );

  return instance;
}
