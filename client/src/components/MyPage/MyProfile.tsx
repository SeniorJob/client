import styled from 'styled-components';
import defaultImage from '../../assets/images/imageDefault.png';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/user';

const MyProfile = () => {
  const userDetail = useUserStore().userDetail;

  return (
    <Container to="/mypage">
      <div>
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '4px',
          }}
        >
          {userDetail.name}
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div>{userDetail.job}</div>
          <div>
            {userDetail.region &&
              userDetail.region.substring(0, userDetail.region.indexOf(' '))}
          </div>
        </div>
      </div>
      <Image src={userDetail.imgKey ? userDetail.imgKey : defaultImage} />
    </Container>
  );
};

export default MyProfile;

const Container = styled(Link)`
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Image = styled.img`
  border: 1px solid lightgray;
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;
