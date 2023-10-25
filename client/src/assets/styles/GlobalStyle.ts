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

  .container {
    max-width: 1200px;
    position: relative;
    margin: 0 auto;
    flex-grow: 1;
  }
`;
