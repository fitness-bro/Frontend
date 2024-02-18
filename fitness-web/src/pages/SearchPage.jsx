// SearchPage.js
import React, { useState } from 'react';
import SearchSection from '../components/brosearch/SearchSection';
import MapSection from '../components/brosearch/MapSection';
import ListSection from '../components/brosearch/ListSection';

const SearchPage = () => {
  const userList = [
    { id: 1, name: '유저1', region: '서울특별시', subAddress: '마포구', detailAddress: '와우산로 94', age: 25, rating: 4 },
    { id: 2, name: '유저2', region: '서울특별시', subAddress: '강남구', detailAddress: '', age: 25, rating: 4 },
    { id: 3, name: '유저3', region: '서울특별시', subAddress: '강남구', detailAddress: '도산대로', age: 25, rating: 4 },
    { id: 4, name: '유저4', region: '서울특별시', subAddress: '동작구', detailAddress: '사당로9라길 17', age: 26, rating: 4 },
    { id: 5, name: '유저5', region: '서울특별시', subAddress: '강남구', detailAddress: '언주로113길', age: 25, rating: 4 },
    { id: 6, name: '유저6', region: '서울특별시', subAddress: '강남구', detailAddress: '압구정로10길', age: 25, rating: 4 },
    { id: 7, name: '유저7', region: '서울특별시', subAddress: '중구', detailAddress: '', age: 25, rating: 4 },
  ];

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSubAddress, setSelectedSubAddress] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleRegionSelect = (region, subAddress) => {
    setSelectedRegion(region);
    setSelectedSubAddress(subAddress);
    setSelectedUserId(null); // 선택한 지역이 변경되면 선택된 유저 초기화
  };

  const handleMarkerClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div>
      <SearchSection
        map={null}
        onRegionSelect={handleRegionSelect}
        userList={userList}
      />
      <MapSection userList={userList} onMarkerClick={handleMarkerClick} />
      <ListSection
        userList={userList}
        selectedRegion={selectedRegion}
        selectedSubAddress={selectedSubAddress}
        selectedUserId={selectedUserId}
      />
    </div>
  );
};

export default SearchPage;
