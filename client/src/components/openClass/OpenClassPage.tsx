import tw from 'tailwind-styled-components';
import TabContainer from './TabContainer';

const Container = tw.div`
    max-w-lg
`;

const OpenClassPage = () => {
  return (
    <Container>
      <TabContainer />
    </Container>
  );
};

export default OpenClassPage;
