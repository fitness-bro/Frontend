import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './pages/Profile.jsx';
import Reviews from './pages/Reviews.jsx';
import Photos from './pages/Photos.jsx';
import SearchPage from './pages/SearchPage'; 
import ModalSignupPage from './pages/ModalSignupPage'; // 경로 수정
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<ModalSignupPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
    </Router>
  );
}

export default App;
