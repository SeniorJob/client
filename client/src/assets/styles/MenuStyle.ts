import styled from 'styled-components';

export const StyledMenu = styled.div`
  cursor: pointer;
  padding: 0.4rem 0.9rem;
  border-radius: 1.5rem;
  &:hover {
    color: var(--primaryColor);
  }
  color: #4a4a4a;
`;

export const StyledUserMenu = styled(StyledMenu)`
  color: var(--primaryColor);
  border: 2px solid var(--primaryColor);
  transition: 0.3s all ease;
  &:hover {
    background-color: var(--primaryColor);
    color: white;
  }
`;

export const StyledLoginUser = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 17px;
  padding-top: 7px;
`;

export const StyledLoginUserMenu = styled(StyledMenu)`
  transition: 0.3s all ease;
  padding: 3px 3px 3px 3px;
  font-size: 16px;
  font-weight: 700;
`;

export const AsideCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.7rem 1.3rem;
  font-size: 1rem;
  font-weight: 500;
  color: #222222;
  h1 {
    font-weight: 700;
    color: #2d5e87;
  }
  strong {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1c5690;
  }
`;
