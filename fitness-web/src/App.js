import './App.css';
import MyPage from './page/MyPage';
import Registration from './page/Registration';
import WriteReview from './page/WriteReview';
import ApplicationHistory from './page/ApplicationHistory';
import Checked from './page/Checked';
import Find from './page/Find';
import ModifyingInformation from './page/ModifyingInformation';
import Header from "./component/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";

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
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;