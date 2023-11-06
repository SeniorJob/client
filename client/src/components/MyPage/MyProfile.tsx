import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import { Link } from 'react-router-dom';

const MyProfile = () => {
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
          이름
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div>직업</div>
          <div>지역</div>
        </div>
      </div>
      <ProfileImage />
    </Container>
  );
};

const Container = styled(Link)`
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export default MyProfile;
