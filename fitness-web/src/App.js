import './App.css';
import MyPage from './pages/MyPage.jsx';
import Registration from './pages/Registration.jsx';
import ModifyingInformation from './pages/ModifyingInformation.jsx';
import Header from "./components/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from './pages/Profile.jsx';
import LookReviews from './pages/LookReviews.jsx';
import Photos from './pages/Photos.jsx';
import SearchPage from './pages/SearchPage'; 
import Main from './pages/Main';
import Reviews from './Reviews';
import MyCoaches from './MyCoaches';
import Favorites from './Favorites';
import BottomHeader from './components/BottomHeader.jsx';

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header/>
      <div className="App">
        <Routes>
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/ModifyingInformation" element={<ModifyingInformation/>} />
        <Route path="/" element={<Profile />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/lookreviews" element={<LookReviews />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/" element={<Main />}/>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/my-coaches" element={<MyCoaches />} />
        <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
      <BottomHeader/>
      </BrowserRouter>
    </div>
  );
}

export default App;