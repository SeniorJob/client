import styled from 'styled-components';
import { ClassRecommend } from '../../components/main/ClassRecommend';

const Main = styled.main`
  min-height: 800px;
`;

export const MainPage = () => {
  return (
    <Main>
      <ClassRecommend />
    </Main>
  );
};
