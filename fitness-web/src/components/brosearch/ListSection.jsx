// ListSection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListSection.css';
import { FaStar } from 'react-icons/fa';

const StarIcon = () => {
  return <FaStar color="black" size={14} />;
};

const userList = [
  { id: 1, name: '유저1', region: '서울특별시', subAddress: '종로구', age: 25, rating: 4 },
  { id: 2, name: '유저2', region: '부산광역시', subAddress: '중구', age: 30, rating: 3.5 },
  { id: 3, name: '유저3', region: '부산광역시', subAddress: '중구', age: 30, rating: 3.5 },
  { id: 4, name: '유저4', region: '부산광역시', subAddress: '중구', age: 30, rating: 3.5 },
  { id: 5, name: '유저5', region: '부산광역시', subAddress: '중구', age: 30, rating: 3.5 },
  { id: 6, name: '유저6', region: '서울특별시', subAddress: '종로구', age: 25, rating: 4 },
  { id: 7, name: '유저7', region: '부산광역시', subAddress: '중구', age: 30, rating: 3.5 },
  { id: 8, name: '유저3', region: '부산광역시', subAddress: '중구', age: 30, rating: 3.5 },
  { id: 9, name: '유저4', region: '부산광역시', subAddress: '중구', age: 30, rating: 3.5 },
  { id: 10, name: '유저5', region: '부산광역시', subAddress: '중구', age: 30, rating: 3.5 },
  // 다른 유저 데이터 추가
];

const ListSection = ({ selectedRegion, selectedSubAddress }) => {
  const navigate = useNavigate();

  const handleProfileClick = (userId) => {
    // 프로필 클릭 시 프로필 페이지로 이동
    navigate(`/profile`);
  };

  const filteredUsers = userList.filter((user) => {
    if (selectedSubAddress === null) {
      return user.region === selectedRegion;
    } else {
      return user.region === selectedRegion && user.subAddress === selectedSubAddress;
    }
  });

  return (
    <>
      <div style={{ color: '#ff9549', marginLeft: '19.5%', fontSize: '19px', fontWeight: 'bold', marginTop: '-350px', padding: '10px' }}>
        동네형 리스트
      </div>
      <div className="ListContainer" style={{ width: '49vh', height: '36vh', marginLeft: '18.9%', backgroundColor: '#643e23' }}>
        {filteredUsers.map((user) => (
          <div className="UserProfile" key={user.id} onClick={() => handleProfileClick(user.id)}>
            <div className='UserPic'></div>
            <div className="Userinfo">
              <table>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.age}세 </td>
                  <td className='lastTd'><StarIcon /> &nbsp; {user.rating}</td>
                </tr>
              </table>
          
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListSection;
