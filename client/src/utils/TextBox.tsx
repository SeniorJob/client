import styled from 'styled-components';

export const TextBox = styled.textarea`
  width: 75%;
  height: 300px;
  border: 1px solid black;
  padding: 5px;
  align-items: center;
`;

export const OneLineTextBox = styled(TextBox)`
  resize: none;
  height: 50px;
`;
