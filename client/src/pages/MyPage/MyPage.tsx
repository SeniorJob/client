import MyPageLayout from '../../components/MyPage/MyPageLayout';
import ProfileInfo from '../../components/MyPage/Profile/ProfileInfo';

// import { getProfile } from '../../api/mypage';

const MyPage = () => {
  // useEffect(() => {
  //   const handleGetProfile = async () => {
  //     await getProfile();
  //   };

  //   handleGetProfile();
  // }, []);

  return (
    <MyPageLayout>
      <ProfileInfo />
    </MyPageLayout>
  );
};

export default MyPage;
