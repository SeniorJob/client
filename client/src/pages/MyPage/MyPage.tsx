import { useEffect } from 'react';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import ProfileInfo from '../../components/MyPage/Profile/ProfileInfo';
import { getProfile } from '../../api/mypage';
import { useUserStore } from '../../store/user';

const MyPage = () => {
  const userStore = useUserStore();

  const handleGetProfile = async () => {
    const info = await getProfile();
    if (info !== undefined) userStore.setUserDetail(info);
  };

  useEffect(() => {
    userStore.isLoggedIn && handleGetProfile();
  }, []);

  return (
    <MyPageLayout>
      <ProfileInfo />
    </MyPageLayout>
  );
};

export default MyPage;
