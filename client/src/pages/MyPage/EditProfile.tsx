import MyPageLayout from '../../components/MyPage/MyPageLayout';
import ProfileInfo from '../../components/MyPage/Profile/ProfileInfo';

const EditProfile = () => {
  return (
    <MyPageLayout>
      <ProfileInfo mode="수정" />
    </MyPageLayout>
  );
};

export default EditProfile;
