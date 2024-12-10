import { Route, Routes } from 'react-router';
import { LoginPage, ProfilePage } from '../../pages';
import { useAuthStore } from '../../store/authStore.ts';
import Layout from '../Layout';

const Routing = () => {
  const auth = useAuthStore(state => state.authenticated);


  if ( auth ) {
    return (
        <Routes>
          <Route path={ '/' }
                 element={ <Layout/> }>
            <Route path={ '' }
                   index
                   element={ <ProfilePage/> }/>
          </Route>
        </Routes>
    );
  }
  return (
      <Routes>
        <Route path={ '/' }
               element={ <LoginPage/> }/>
        <Route
            path="login"
            element={ <LoginPage/> }
        />
      </Routes>
  );
};

export default Routing;
