// SearchSection.js
import React, { useState } from 'react';
import './SearchSection.css';
import { FaSearch } from 'react-icons/fa';

const SearchSection = ({ map, onRegionSelect }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSubAddress, setSelectedSubAddress] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleRegionSelect = (region, subAddress = null) => {
    setSelectedRegion(region);
    setSelectedSubAddress(subAddress);

    // 새로운 지역이 선택되었을 때, 상위 컴포넌트로 선택한 지역 정보 전달
    onRegionSelect(region, subAddress);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      for (const region of regions) {
        if (region.includes(searchKeyword)) {
          setSelectedRegion(region);
          setSelectedSubAddress(null);
          setSearchKeyword('');
          break;
        }
      }
    }
  };

  const regions = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도'];

  const subAddresses = {
    서울특별시: ['종로구', '중구', '용산구', '성동구'],
    부산광역시: ['중구', '서구', '동구', '영도구'],
    대구광역시: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
  };

  return (
    <>
      <div style={{ color: '#ff9549', marginLeft: '290px', fontSize: '19px', fontWeight: 'bold', padding: '10px' }}>전체 지역 검색</div>
      <div className="Search">
        <div className="InputRegion">
          <input
            type="text"
            style={{ width: '375px', height: '25px', color: 'black', border: '1px solid #fff', borderRadius: '10px' }}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FaSearch style={{ color: '#ff9549', fontWeight: 'bold', position: 'absolute', top: '50%', right: '25px', transform: 'translateY(-50%)', width: '16px', height: '16px' }} />
        </div>
        <div className="search-section">
          <div className="main-address">
            <ul>
              {regions.map((region) => (
                <li
                  key={region}
                  onClick={() => handleRegionSelect(region)}
                  className={selectedRegion === region ? 'selected' : ''}
                >
                  {region}
                </li>
              ))}
            </ul>
          </div>
          <div className="sub-address">
            {selectedRegion && subAddresses[selectedRegion] && (
              <ul>
                <li
                  key="전체"
                  onClick={() => handleRegionSelect(selectedRegion)}
                  className={selectedSubAddress === null ? 'selected' : ''}
                >
                  전체
                </li>
                {subAddresses[selectedRegion].map((subAddress) => (
                  <li
                    key={subAddress}
                    onClick={() => handleRegionSelect(selectedRegion, subAddress)}
                    className={selectedSubAddress === subAddress ? 'selected' : ''}
                  >
                    {subAddress}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSection;
