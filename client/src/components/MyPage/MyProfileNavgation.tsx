import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MyProfile from './MyProfile';
import { useLecturesStore } from '../../store/user';

const MyProfileNavgation = () => {
  const pathname = useLocation().pathname;
  const {
    setMyOpeningLectures,
    setMySuggestionLectures,
    setMyApplicationLectures,
  } = useLecturesStore();

  const handleResetLectures = () => {
    // setMyOpeningLectures([]);
    // setMySuggestionLectures([]);
    // setMyApplicationLectures([]);
  };

  return (
    <NavigationWrapper>
      <MyProfile />

      <NavigationContainer>
        <NavigationList
          active={pathname === '/mypage/lecture/opening' ? 'true' : 'false'}
          to="/mypage/lecture/opening"
          onClick={handleResetLectures}
        >
          개설한 강좌
        </NavigationList>
        <NavigationList
          active={pathname === '/mypage/lecture/application' ? 'true' : 'false'}
          to="/mypage/lecture/application"
          onClick={handleResetLectures}
        >
          신청한 강좌
        </NavigationList>
        <NavigationList
          active={pathname === '/mypage/lecture/suggestion' ? 'true' : 'false'}
          to="/mypage/lecture/suggestion"
          onClick={handleResetLectures}
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
