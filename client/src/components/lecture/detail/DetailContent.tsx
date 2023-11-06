import styled from 'styled-components';

const Content = styled.div`
  flex-basis: calc(100% * 2 / 3);
  max-width: calc(100% * 2 / 3);
`;

export const DetailContent = () => {
  return <Content>컨텐츠</Content>;
};
