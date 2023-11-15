import { ReactNode } from 'react';
import styled from 'styled-components';
import MyProfileNavgation from './MyProfileNavgation';

interface Props {
  children: ReactNode;
}

const MyPageLayout = (props: Props) => {
  return (
    <Layout>
      <MyProfileNavgation />
      <Container>{props.children}</Container>
    </Layout>
  );
};

export default MyPageLayout;

const Layout = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
`;

const Container = styled.main`
  flex: 1;
  padding-left: 20px;
  margin-left: 240px;
  margin-top: 20px;
  overflow: hidden;
`;
