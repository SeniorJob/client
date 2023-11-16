import styled from 'styled-components';

export const Tag = styled.span`
  display: inline-block;
  min-width: max-content;
  padding: 0.2rem 0.5rem;
  border-radius: 1.5rem;
  border: 2px solid currentColor;
  color: currentColor;
  font-size: 0.8rem;
  line-height: 1.1rem;
  font-weight: 600;
`;

export const Divider = styled.div`
  margin: 0 1rem;
  width: 1px;
  height: 36px;
  background-color: #dee2e6;
`;

// 초록이 버튼
export const RegButton = styled.button`
  width: 100%;
  padding: 1rem 1rem;
  background-color: var(--primaryColor);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  &:hover {
    opacity: 0.9;
  }
`;
