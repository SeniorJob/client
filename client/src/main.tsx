import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GlobalStyle } from './assets/styles/GlobalStyle.ts';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </>,
);
