import styled from 'styled-components';
import { RegButton } from '../../../../assets/styles/CommonStyles';
import { AsideCard } from '../../../../assets/styles/MenuStyle';

export const AdminMenu = ({
  handleModal,
}: {
  handleModal: (type: string) => void;
}) => (
  <AdminMenuCard>
    <h1>관리자 메뉴</h1>
    <div className="w-full flex gap-4">
      <ManageButton onClick={() => handleModal('강좌관리')}>
        강좌 관리
      </ManageButton>
      <ManageButton onClick={() => handleModal('인원관리')}>
        신청자 관리
      </ManageButton>
    </div>
    <RegButton onClick={() => handleModal('마감')}>모집 마감하기</RegButton>
  </AdminMenuCard>
);

const AdminMenuCard = styled(AsideCard)`
  gap: 1rem;
  padding: 1rem;
`;

const ManageButton = styled(RegButton)`
  background-color: #abc3eb;
`;
