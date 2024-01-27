// SearchPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import MapSection from '../components/MapSection';
import ListSection from '../components/ListSection';

const SearchPage = () => {
  const [map, setMap] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleRegionSelect = (region, subAddress = null) => {
    const newAddress = { region, subAddress };
    setSelectedAddress(newAddress);
  };

  return (
    <div>
      
      <SearchSection map={map} onRegionSelect={handleRegionSelect} />
      <MapSection setMap={setMap} />
      <ListSection selectedAddress={selectedAddress} />
    </div>
  );
};

export default SearchPage;
