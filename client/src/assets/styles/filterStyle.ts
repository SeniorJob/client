import styled from 'styled-components';
import { Tag } from './CommonStyles';

export const FilterTag = styled(Tag)`
  padding: 0.4rem 0.7rem;
  font-weight: unset;
  border: 1px solid #ccc;
  &.checked {
    border-color: var(--primaryColor);
    color: var(--primaryColor);
    font-weight: 500;
    &::before {
      content: '✓';
      margin-right: 0.2rem;
    }
  }
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const FilterLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: 0.4rem;
`;

export const FilterInput = styled.input`
  display: none;
`;
