import axios, { AxiosError } from 'axios';
import { FC, PropsWithChildren } from 'react';
import useAuth from '../hooks/useAuth.ts';
import { useAuthStore } from '../store/authStore.ts';

const Interceptor: FC<PropsWithChildren> = ({ children }) => {
  const { getAuthToken, removeAuthToken } = useAuth();
  const logout = useAuthStore(state => state.logoutAction)

  const errorHandler = (error: AxiosError) => {
    console.error(error);

    if (error.response?.status === 401 || error.response?.status === 419) {

      const token = getAuthToken();

      if (token) {
        removeAuthToken();
        logout()
      } else {
        logout()
      }
    }
  };

  axios.interceptors.request.use(
      function (config) {
        const token: string | undefined = getAuthToken();

        if (!config.url?.includes('novaposhta.ua')) {
          config.headers.Authorization = `Bearer ${ token }`;

          config.headers['Accept-Language'] = 'UK';
          config.headers['X-Country-Code'] = 'DE';
          config.headers['Session'] = '{session}';
          config.headers['Content-Type'] = 'application/json';
          config.headers['Accept'] = 'application/json';
        }


        return config;
      },
      function (error) {
        errorHandler(error);

        return Promise.reject(error);
      },
  );

  axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        errorHandler(error);

        return Promise.reject(error);
      },
  );

  return children;
};

export default Interceptor;
