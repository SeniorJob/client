import styled from 'styled-components';

export const TextBox = styled.textarea`
  width: 75%;
  height: 300px;
  border: 1px solid black;
  padding: 5px;
  align-items: center;
  border-radius: 10px;
`;

export const OneLineTextBox = styled(TextBox)`
  display: flex;
  justify-content: center;
  resize: none;
  height: 50px;
`;
