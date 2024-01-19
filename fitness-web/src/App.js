import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Reviews from './Reviews';
import MyCoaches from './MyCoaches';
import Favorites from './Favorites';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/my-coaches" element={<MyCoaches />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;