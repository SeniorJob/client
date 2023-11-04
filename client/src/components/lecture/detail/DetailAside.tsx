import styled from 'styled-components';

const Aside = styled.div`
  flex-basis: calc(100% * 1 / 3);
  max-width: calc(100% * 1 / 3);
`;

export const DetailAside = () => {
  return <Aside>nav</Aside>;
};
