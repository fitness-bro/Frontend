import React, { useState, useEffect } from 'react';
import SearchSection from '../components/brosearch/SearchSection';
import MapSection from '../components/brosearch/MapSection';
import ListSection from '../components/brosearch/ListSection';
import axios from 'axios';
import './SearchPage.css';
const SearchPage = () => {

  const [userList, setUserList] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSubAddress, setSelectedSubAddress] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const apiUrl = "https://dev.fitness-bro.pro/coaches/search";
    
  
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setUserList(response.data.result);  // 변경된 부분
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleRegionSelect = (region, subAddress) => {
    setSelectedRegion(region);
    setSelectedSubAddress(subAddress);
    setSelectedUserId(null);
  };

  const handleMarkerClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className='SearchPage'>
        <div className='Spfirstline'>
            <div className='SearchSection'>
      <SearchSection
        map={null}
        onRegionSelect={handleRegionSelect}
        userList={userList}
        
      />
      </div>
      <div className='ListSection'>
      <ListSection
        userList={userList}
        selectedRegion={selectedRegion}
        selectedSubAddress={selectedSubAddress}
        selectedUserId={selectedUserId}
      />
      </div>
      </div>
      <div className='MapSection'>
      <MapSection userList={userList} onMarkerClick={handleMarkerClick} />
      </div>
    </div>
  );
};

export default SearchPage;