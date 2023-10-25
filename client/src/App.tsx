import './App.css';
import { Header } from './components/header/Header';
import { MainPage } from './pages/mainpage/MainPage';
import Login from './components/login/login';
import OpenClassPage from './components/openClass/OpenClassPage';

function App() {
  return (
    <div className="App">
      <Header />
      <MainPage />
      <Login />
      <OpenClassPage />
    </div>
  );
}

export default App;
