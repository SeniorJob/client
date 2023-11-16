import { Modal } from '../../common/Modal';
import styled from 'styled-components';
import { RegButton } from '../../../assets/styles/CommonStyles';

const MemberManage_C = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 0.6rem 0;
  gap: 1rem;
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

type ManageMember_T = {
  title?: string;
  lectureId?: number;
  closeModal: () => void;
};

export const ManageMember: React.FC<ManageMember_T> = ({
  lectureId,
  closeModal,
}) => {
  return (
    <Modal closeModal={closeModal}>
      <MemberManage_C>
        <h2>강좌 신청인원 관리</h2>
      </MemberManage_C>
    </Modal>
  );
};
