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
  const [showGuide, setShowGuide] = useState(true);

  const handleOpenClick = () => {
    setShowGuide(false);
  };

  return (
    <Container>
      <TabContainer setActiveTab={setActiveTab} />
      {showGuide && (
        <Guide activeTab={activeTab} onOpenClick={handleOpenClick} />
      )}
    </Container>
  );
};

export default OpenClassPage;
