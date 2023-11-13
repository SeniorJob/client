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
import EditSuggestion from './pages/MyPage/EditSuggestion';
import EditLecture from './pages/MyPage/EditLecture';

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

          <Route path="/lectures/filter?" element={<LectureList />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/editprofile" element={<EditProfile />} />
          <Route path="/mypage/lecture/opening" element={<Opening />} />
          <Route path="/mypage/lecture/application" element={<Application />} />
          <Route path="/mypage/lecture/suggestion" element={<Suggestion />} />
          <Route
            path="/mypage/lecture/edit/:lecture_id"
            element={<EditLecture />}
          />
          <Route
            path="/mypage/lecture/suggestion/edit/:lecture_id"
            element={<EditSuggestion />}
          />

          <Route path="/lectures/detail/*" element={<LectureDetail />} />
          <Route path="/lectures/*" element={<LectureList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
