import tw from 'tailwind-styled-components';
import TabContainer from './TabContainer';
import Guide from './howOpenClass/Guide';
import { useState } from 'react';

const Container = tw.div`
// 임시
    max-w-4xl 
    
    justify-center
    m-auto
`;

const OpenClassPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <TabContainer setActiveTab={setActiveTab} />
      <Guide activeTab={activeTab} />
    </Container>
  );
};

export default OpenClassPage;
