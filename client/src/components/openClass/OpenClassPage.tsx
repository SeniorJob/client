import tw from 'tailwind-styled-components';
import TabContainer from './TabContainer';
import Guide from './howOpenClass/Guide';
import { useState } from 'react';
import EnterClassInfomation from './classDetail/EnterClassInfomation';
import ClassDetail from './classDetail/ClassDetail';
import Confirmation from './classDetail/Confirmation';

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
    setActiveTab(0);
    setShowGuide(false);
  };

  return (
    <Container>
      <TabContainer activeTab={activeTab} setActiveTab={setActiveTab} />
      {showGuide ? (
        <Guide activeTab={activeTab} onOpenClick={handleOpenClick} />
      ) : activeTab === 0 ? (
        <EnterClassInfomation />
      ) : activeTab === 1 ? (
        <ClassDetail />
      ) : (
        <Confirmation />
      )}
    </Container>
  );
};

export default OpenClassPage;
