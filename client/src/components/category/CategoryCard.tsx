import styled from 'styled-components';

export const Card = styled.div`
  width: 70px;
  height: 70px;
  padding: 0.5rem;
  border-radius: 25%;
  background-color: #fff;
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  transition: 0.3s ease;
  text-align: center;
  overflow: hidden;
  &:hover {
    scale: 1.05;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 25%;
  }
`;
