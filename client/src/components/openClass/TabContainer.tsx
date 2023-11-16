import tw from 'tailwind-styled-components';
import { FC } from 'react';
import { useUserStore } from '../../store/user';

const Container = tw.div`
    flex-col
    p-6
    pb-2

    border-b-2
    border-black
`;

const Title = tw.div`
    font-bold
    text-2xl
`;

const Tabs = tw.div`
    flex
    gap-4
    justify-center
    p-4
    text-gray-500
    font-bold
`;

interface TabContainerProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
  showGuide: boolean;
}

interface TabProps {
  active: boolean;
}

const Tab = tw.div<TabProps>`
    border-solid
    border-1
    rounded-xl
    cursor-pointer

    text-2xl

    px-4
    py-1

    shadow-md

   ${p => (p.active ? 'bg-signature font-bold text-black' : '')}
   hover:bg-signature
   hover:font-bold
   hover:text-black
`;

const TabContainer: FC<TabContainerProps> = ({
  activeTab,
  setActiveTab,
  showGuide,
}) => {
  const { userDetail } = useUserStore();
  const userName = userDetail.name;

  const handleTabClick = (index: number) => {
    if (showGuide) {
      setActiveTab(index);
    }
  };

  return (
    <>
      <Container>
        <Title>{userName}님의 강좌개설</Title>

        <Tabs>
          <Tab active={activeTab === 0} onClick={() => handleTabClick(0)}>
            기본정보입력
          </Tab>
          <Tab active={activeTab === 1} onClick={() => handleTabClick(1)}>
            강좌상세내용
          </Tab>
          <Tab active={activeTab === 2} onClick={() => handleTabClick(2)}>
            개설정보확인
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default TabContainer;
