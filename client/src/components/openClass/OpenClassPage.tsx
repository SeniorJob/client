import tw from 'tailwind-styled-components';
import TabContainer from './TabContainer';

const Container = tw.div`
// 임시
    max-w-4xl 
    
    justify-center
    m-auto
`;

const OpenClassPage = () => {
  return (
    <Container>
      <TabContainer />
    </Container>
  );
};

export default OpenClassPage;
