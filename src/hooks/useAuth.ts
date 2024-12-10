import { useCallback } from 'react';
import { LoginResponseResult } from '../types.ts';


const TOKEN_NAME = 'imrev-test-task';

const useAuth = () => {

  const setAuthToken = useCallback((authInfo: LoginResponseResult) => {

    localStorage.setItem(TOKEN_NAME, JSON.stringify(authInfo));
  }, []);

  const getAuthInfo = useCallback(() => {
    const tokenInfo: LoginResponseResult | null = JSON.parse(localStorage.getItem(TOKEN_NAME) as string);

    return tokenInfo ? tokenInfo : null;
  }, []);


  const checkAuthToken = useCallback(() => {
    const authInfo: LoginResponseResult | null = getAuthInfo();

    return !!authInfo?.access_token;
  }, [getAuthInfo]);

  const getAuthToken = useCallback(() => {
    const authInfo: LoginResponseResult | null = getAuthInfo();

    return authInfo?.access_token;
  }, [getAuthInfo]);

  const removeAuthToken = useCallback(() => {
    if (getAuthInfo()) {
      localStorage.removeItem(TOKEN_NAME);
    }
  }, [getAuthInfo]);

  return {
    setAuthToken,
    getAuthToken,
    removeAuthToken,
    checkAuthToken,
    getAuthInfo,
  };
};

export default useAuth;
