import tw from 'tailwind-styled-components';
import TabContainer from './TabContainer';

const Container = tw.div`
    max-w-2xl
`;

const OpenClassPage = () => {
  return (
    <Container>
      <TabContainer />
    </Container>
  );
};

export default OpenClassPage;
