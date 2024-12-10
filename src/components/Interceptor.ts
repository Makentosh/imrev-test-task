import axios from 'axios';
import { FC, PropsWithChildren } from 'react';
import useAuth from '../hooks/useAuth.ts';

const Interceptor: FC<PropsWithChildren> = ({ children }) => {
  const { getAuthToken } = useAuth();

  const errorHandler = (error: unknown) => {
    console.error(error);
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
