import './App.css';
import { Header } from './components/header/Header';
import SignUp from './components/signup/SignUp';
import Login from './components/login/login';
import OpenClassPage from './components/openClass/OpenClassPage';

function App() {
  return (
    <div className="App">
      <Header />
      <SignUp />
      {/* <Login /> */}
      {/* <OpenClassPage /> */}
    </div>
  );
}

export default App;
