import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';

import Login from './components/login/login';
import OpenClassPage from './components/openClass/OpenClassPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/openclass" element={<OpenClassPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
