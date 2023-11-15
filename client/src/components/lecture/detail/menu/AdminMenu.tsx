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
    <div className="w-full flex gap-3">
      <ModifyButton onClick={() => handleModal('수정')}>수정하기</ModifyButton>
      <DeleteButton onClick={() => handleModal('삭제')}>삭제하기</DeleteButton>
    </div>
  </AdminMenuCard>
);

const AdminMenuCard = styled(AsideCard)`
  gap: 1rem;
  padding: 1rem;
`;

const ModifyButton = styled(RegButton)`
  background-color: #abc3eb;
  &:hover {
    background-color: #abc3ebd6;
  }
`;

const DeleteButton = styled(RegButton)`
  background-color: #f9827d;
  &:hover {
    background-color: #f9817dd6;
  }
`;
