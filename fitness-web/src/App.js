import {BrowserRouter, Routes,Route} from "react-router-dom";
import Profile from './pages/Profile.jsx';
import Reviews from './pages/Reviews.jsx';
import Photos from './pages/Photos.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
