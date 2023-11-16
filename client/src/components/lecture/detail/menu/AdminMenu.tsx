import styled from 'styled-components';
import { RegButton } from '../../../../assets/styles/CommonStyles';
import { AsideCard } from '../../../../assets/styles/MenuStyle';

type AdminMenu_T = {
  handleModal: (type: string) => void;
  status?: string;
};

export const AdminMenu: React.FC<AdminMenu_T> = ({ handleModal, status }) => (
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
    {status === '신청가능상태' && (
      <RegButton onClick={() => handleModal('마감')}>모집 마감하기</RegButton>
    )}
  </AdminMenuCard>
);

const AdminMenuCard = styled(AsideCard)`
  gap: 1rem;
  padding: 1rem;
`;

const ManageButton = styled(RegButton)`
  background-color: #abc3eb;
`;
