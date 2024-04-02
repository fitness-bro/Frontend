// SearchSection.js
import React, { useState } from 'react';
import './SearchSection.css';
import { FaSearch } from 'react-icons/fa';

const SearchSection = ({ onRegionSelect, userList }) => {
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
      // 엔터를 누르면 검색어로 지역 선택
      handleRegionSearch(searchKeyword);
    }
  };

  const handleRegionSearch = (searchKeyword) => {
    const matchedRegion = regions.find((region) =>
      region.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  
    if (matchedRegion) {
      setSelectedRegion(matchedRegion);
      setSelectedSubAddress(null);
  
      // 검색어로 지역이 선택되었을 때, 상위 컴포넌트로 선택한 지역 정보 전달
      onRegionSelect(matchedRegion, null);
    } else {
      // 검색 결과가 없을 때 전체 지역 선택으로 처리
      console.log(`No matching region found for ${searchKeyword}`);
      setSelectedRegion(null);
      setSelectedSubAddress(null);
  
      // 검색 결과가 없을 때, 상위 컴포넌트로 선택한 지역 정보 전달 (전체 지역 선택)
      onRegionSelect(null, null);
    }
  };

  const regions = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도'];

  const subAddresses = {
    서울특별시: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
    부산광역시: ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
    대구광역시: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
    인천광역시: ['중구', '동구', '남구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
    광주광역시: ['동구', '서구', '남구', '북구', '광산구'],
    대전광역시: ['동구', '중구', '서구', '유성구', '대덕구'],
    울산광역시: ['중구', '남구', '동구', '북구', '울주군'],
    세종특별자치시: ['세종특별자치시'],
    경기도: ['수원시', '성남시', '안양시', '안산시', '용인시', '부천시', '광명시', '평택시', '동두천시', '안성시', '광주시', '이천시', '양주시', '의정부시', '여주시', '화성시', '포천시', '연천군', '가평군', '양평군'],
  }
  return (
    <div>
      <div style={{ color: '#ff9549',fontSize: '19px', fontWeight: 'bold', padding: '10px',paddingBottom:'15px', marginRight:'20px' }}>전체 지역 검색</div>
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
    </div>
  );
};

export default SearchSection;