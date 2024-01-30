import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import MyPage from './pages/MyPage.jsx';
import Registration from './pages/Registration.jsx';
import ModifyingInformation from './pages/ModifyingInformation.jsx';
import Profile from './pages/Profile.jsx';
import LookReviews from './pages/LookReviews.jsx';
import Photos from './pages/Photos.jsx';
import SearchPage from './pages/SearchPage'; 
import ModalSignupPage from './pages/ModalSignupPage'; // 경로 수정
import Main from './pages/Main';
import Reviews from './components/Reviews';
import MyCoaches from './components/MyCoaches';
import Favorites from './components/Favorites';
import ReviewList from './components/ReviewList';
import GetReviewList from './components/GetReviewList';
import MyMembers from './components/MyMembers';
import BottomHeader from "./components/BottomHeader";
import ChatingList from './pages/ChatingList.jsx';
import SignUp from './pages/SignUp.jsx'


function App() {
  return (
    <div className="root-wrap">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<ModalSignupPage />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/ModifyingInformation" element={<ModifyingInformation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/lookreviews" element={<LookReviews />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/my-coaches" element={<MyCoaches />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/chatinglist" element={<ChatingList />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/review-list" element={<ReviewList />} />
            <Route path="/get-review-list" element={<GetReviewList />} />
            <Route path="/my-members" element={<MyMembers />} />
          </Routes>
        </div>
        <BottomHeader />
      </Router>
    </div>
  );
}

export default App;