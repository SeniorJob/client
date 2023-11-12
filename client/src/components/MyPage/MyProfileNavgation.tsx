import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MyProfile from './MyProfile';

const MyProfileNavgation = () => {
  const pathname = useLocation().pathname;

  return (
    <NavigationWrapper>
      <MyProfile />

      <NavigationContainer>
        <NavigationList
          active={pathname === '/mypage/lecture/opening' ? 'true' : 'string'}
          to="/mypage/lecture/opening"
        >
          개설한 강좌
        </NavigationList>
        <NavigationList
          active={
            pathname === '/mypage/lecture/application' ? 'true' : 'string'
          }
          to="/mypage/lecture/application"
        >
          신청한 강좌
        </NavigationList>
        <NavigationList
          active={pathname === '/mypage/lecture/suggestion' ? 'true' : 'string'}
          to="/mypage/lecture/suggestion"
        >
          제안한 강좌
        </NavigationList>
      </NavigationContainer>
    </NavigationWrapper>
  );
};

const NavigationWrapper = styled.nav`
  position: fixed;
  border-right: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  width: 240px;
  padding-right: 20px;
  min-height: calc(100vh - 64px);
`;

const NavigationContainer = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const NavigationList = styled(Link)<{ active: 'true' | 'false' }>`
  font-size: 20px;
  padding: 10px 0 10px 0;
  color: ${props => (props.active !== 'true' ? 'black' : 'green')};
`;

export default MyProfileNavgation;
