import { useEffect } from 'react';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import { getProfile } from '../../api/mypage';

const MyPage = () => {
  useEffect(() => {
    const handleGetProfile = async () => {
      await getProfile();
    };

    handleGetProfile();
  }, []);

  return (
    <MyPageLayout>
      <button type="button" onClick={getProfile}>
        버튼
      </button>
      기본 화면입니다
    </MyPageLayout>
  );
};

export default MyPage;
