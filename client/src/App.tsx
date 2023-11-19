import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { MainPage } from './pages/mainpage/MainPage';
import OpenClassPage from './components/openClass/OpenClassPage';
import SignUp from './components/signup/SignUp';
import { LectureList } from './pages/lectureList/LectureList';
import { ScrollToTop } from './utils/ScrollToTop';
import { LectureDetail } from './pages/lectureDetail/LectureDetail';

import MyPage from './pages/MyPage/MyPage';
import Opening from './pages/MyPage/Opening';
import Suggestion from './pages/MyPage/Suggestion';
import EditProfile from './pages/MyPage/EditProfile';
import Application from './pages/MyPage/Application';
import EditLecture from './pages/MyPage/EditLecture';
import CreateSuggestion from './components/suggestion/CreateSuggestion';

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

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/editprofile" element={<EditProfile />} />
          <Route path="/mypage/lecture/opening" element={<Opening />} />
          <Route path="/mypage/lecture/application" element={<Application />} />
          <Route path="/mypage/lecture/suggestion" element={<Suggestion />} />
          <Route
            path="/mypage/lecture/edit/:page/:lecture_id"
            element={<EditLecture />}
          />

          <Route path="/lectures/*" element={<LectureList />} />
          <Route
            path="/lectures/detail/:lecture_id"
            element={<LectureDetail />}
          />

          <Route path="/createsuggestion" element={<CreateSuggestion />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
