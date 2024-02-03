// SearchPage.js
import React, { useState } from 'react';
import SearchSection from '../components/brosearch/SearchSection';
import MapSection from '../components/brosearch/MapSection';
import ListSection from '../components/brosearch/ListSection';

const SearchPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSubAddress, setSelectedSubAddress] = useState(null);

  const handleRegionSelect = (region, subAddress) => {
    setSelectedRegion(region);
    setSelectedSubAddress(subAddress);
  };

  return (
    <div>
      <SearchSection map={null} onRegionSelect={handleRegionSelect} />
      <MapSection setMap={() => {}} />
      <ListSection selectedRegion={selectedRegion} selectedSubAddress={selectedSubAddress} />
    </div>
  );
};

export default SearchPage;
