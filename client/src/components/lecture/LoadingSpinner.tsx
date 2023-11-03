import { ColorRing } from 'react-loader-spinner';
import styled from 'styled-components';

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
`;

export const LoadingSpinner = () => {
  return (
    <Spinner>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#1dc078', '#1dc077a9', '#287d57', '#32a571', '#6ecfa3']}
      />
    </Spinner>
  );
};
