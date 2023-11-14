import styled from 'styled-components';

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
};

export const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <>
      <Backdrop onClick={closeModal} />
      <ModalContainer>
        <CloseButton onClick={closeModal}>✕</CloseButton>
        {children}
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  border: 1px solid #ccc;
  border-radius: 0.8rem;
  top: 50%;
  left: 50%;
  min-width: 300px;
  min-height: 200px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1rem 1.6rem;
  z-index: 600;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 599;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;
