// SearchPage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import MapSection from '../components/MapSection';
import ListSection from '../components/ListSection';

const SearchPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSubAddress, setSelectedSubAddress] = useState(null);

  const handleRegionSelect = (region, subAddress) => {
    setSelectedRegion(region);
    setSelectedSubAddress(subAddress);
  };

  return (
    <div>
      <Header />
      <SearchSection map={null} onRegionSelect={handleRegionSelect} />
      <MapSection setMap={() => {}} />
      <ListSection selectedRegion={selectedRegion} selectedSubAddress={selectedSubAddress} />
    </div>
  );
};

export default SearchPage;
