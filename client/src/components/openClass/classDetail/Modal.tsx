import { FC } from 'react';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, close, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: '10px',
          padding: '10px',
          width: '90%',
          maxWidth: '800px',
          maxHeight: '1000vh',
          overflowY: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};
