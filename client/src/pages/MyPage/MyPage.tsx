import { useEffect } from 'react';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import ProfileInfo from '../../components/MyPage/Profile/ProfileInfo';
import { getProfile } from '../../api/mypage';
import { useUserStore } from '../../store/user';

const MyPage = () => {
  const userStore = useUserStore();

  const handleGetProfile = async () => {
    const info = await getProfile();
    // 빌드 오류로 인해 수정하였습니다.
    // 수정 전 코드
    // userStore.setUserDetail(info);
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
