import { useProfileStore } from '../../store/profileStore.ts';
import Container from '../../components/Container';
import { useEffect } from 'react';
import { getProfile } from '../../api/userRequests.ts';
import ProfileMainForm from '../../components/ProfileMainForm';

const ProfilePage = () => {
  const setUserInfo = useProfileStore(state => state.setUser);

  useEffect(() => {
    getProfile()
        .then((userInfo) => setUserInfo(userInfo))
        .catch((error) => {
          console.error(error);
        });
  }, [setUserInfo]);

  return (
      <Container>
        <ProfileMainForm/>
      </Container>
  );
};

export default ProfilePage;
