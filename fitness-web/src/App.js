import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import MyPageCoach from './pages/MyPageCoach.jsx';
import MyPageMember from './pages/MyPageMember.jsx';
import RegistrationCoach from './pages/RegistrationCoach.jsx';
import RegistrationMember from './pages/RegistrationMember.jsx';
import ModifyingCoach from './pages/ModifyingCoach.jsx';
import ModifyingMember from './pages/ModifyingMember.jsx';
import MainHeader from "./components/header/Header.jsx";
import Profile from './pages/Profile.jsx';
import LookReviews from './pages/LookReviews.jsx';
import Photos from './pages/Photos.jsx';
import SearchPage from './pages/SearchPage'; 
import Main from './pages/Main';
import Reviews from './pages/Reviews.js';
import MyCoaches from './pages/MyCoaches.js';
import Favorites from './pages/Favorites.js';
import ReviewList from './pages/ReviewList.js';
import GetReviewList from './pages/GetReviewList.js';
import MyMembers from './pages/MyMembers.js';
import BottomHeader from './components/header/BottomHeader.jsx';
import ChatingList from './pages/ChatingList.jsx';
import ChattingListCoach from './pages/ChattingListCoach.jsx';
import ReviewDetail from './pages/ReviewDetail.jsx';
import RegistChoice from './pages/RegistChoice.jsx';
import Require from "./pages/Require.jsx"

function App() {
  return (
    <div className="root-wrap">
      <Router>
      <MainHeader/>
      <div className="App">
        <Routes>
          <Route path="/MyPageCoach" element={<MyPageCoach />} />
          <Route path="/MyPageMember" element={<MyPageMember />} />
          <Route path="/RegistrationCoach" element={<RegistrationCoach />} />
          <Route path="/RegistrationMember" element={<RegistrationMember />} />
          <Route path="/ModifyingCoach" element={<ModifyingCoach/>} />
          <Route path="/ModifyingMember" element={<ModifyingMember/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/lookreviews" element={<LookReviews />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/" element={<Main />}/>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/my-coaches" element={<MyCoaches />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/chatinglist" element={<ChatingList/>}/>
          <Route path="/chattinglistcoach" element={<ChattingListCoach/>}/>
          <Route path="/review-list" element={<ReviewList/>}/>
          <Route path="/get-review-list" element={<GetReviewList/>}/>
          <Route path="/my-members" element={<MyMembers/>}/>
          <Route path="/review-detail" element={<ReviewDetail/>}/>
            <Route path='/registchoice' element={<RegistChoice/>}/>
            <Route path='/require' element={<Require/>}/>
          </Routes>
        </div>
        <BottomHeader />
      </Router>
    </div>
  );
}

export default App;