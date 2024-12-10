import { FC, Fragment, PropsWithChildren, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth.ts';
import { useAuthStore } from '../../store/authStore.ts';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { checkAuthToken, removeAuthToken, getAuthInfo } = useAuth();
  const loginAction = useAuthStore(state => state.loginAction);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if ( checkAuthToken() ) {
      loginAction();
      setRender(true);
      console.log('Login or auth success');
    } else {
      setRender(true);
    }
  }, [loginAction, checkAuthToken, removeAuthToken, getAuthInfo]);

  if ( !render ) {
    return null;
  }

  return <Fragment>{ children }</Fragment>;
};

export default AuthProvider;
