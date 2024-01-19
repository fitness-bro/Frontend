import './App.css';
import MyPage from './pages/MyPage.jsx';
import Registration from './pages/Registration.jsx';
import WriteReview from './pages/WriteReview.jsx';
import ApplicationHistory from './pages/ApplicationHistory.jsx';
import Checked from './pages/Checked.jsx';
import Find from './pages/Find.jsx';
import ModifyingInformation from './pages/ModifyingInformation.jsx';
import Header from "./components/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from './pages/Profile.jsx';
import Reviews from './pages/Reviews.jsx';
import Photos from './pages/Photos.jsx';

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header/>
      <div className="App">
        <Routes>
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Find" element={<Find />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/WriteReview" element={<WriteReview />} />
        <Route path="/ApplicationHistory" element={<ApplicationHistory/>} />
        <Route path="/Checked" element={<Checked/>} />
        <Route path="/ModifyingInformation" element={<ModifyingInformation/>} />
        <Route path="/" element={<Profile />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/photos" element={<Photos />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;