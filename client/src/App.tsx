import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { MainPage } from './pages/mainpage/MainPage';
import OpenClassPage from './components/openClass/OpenClassPage';
import SignUp from './components/signup/SignUp';
import { LectureList } from './pages/lectureList/LectureList';
import { ScrollToTop } from './utils/ScrollToTop';
import { LectureDetail } from './pages/lectureDetail/LectureDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/openclass" element={<OpenClassPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/lectures/detail/*" element={<LectureDetail />} />
          <Route path="/lectures/*" element={<LectureList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
