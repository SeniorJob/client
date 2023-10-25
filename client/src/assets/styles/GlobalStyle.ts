import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    --primaryColor: #1dc078;
  }
`;
