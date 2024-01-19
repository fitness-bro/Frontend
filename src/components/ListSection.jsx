// ListSection.js
import React from 'react';

const ListSection = ({ selectedAddress }) => {
  // 예시 데이터, 실제로는 데이터를 받아와서 사용해야 합니다.
  const dummyData = [
    { id: 1, name: '가게 1', address: '주소 1' },
    { id: 2, name: '가게 2', address: '주소 2' },
    { id: 3, name: '가게 3', address: '주소 3' },
  ];

  return (
    <>
      <div style={{ color: '#ff9549', marginLeft: '290px', fontSize: '19px', fontWeight: 'bold', marginTop: '-350px', padding: '19px' }}>동네형 리스트</div>
      <div className='ListContainer' style={{ width: '50vh', height: '35.5vh',  marginLeft: '280px', backgroundColor: '#cfcfcf' }}>
        {dummyData.map(item => (
          <div key={item.id} style={{ padding: '10px', borderBottom: '1px solid #aaa' }}>
            <div style={{ fontWeight: 'bold' }}>{item.name}</div>
            <div>{item.address}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListSection;
