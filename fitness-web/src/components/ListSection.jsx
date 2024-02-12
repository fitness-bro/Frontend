// ListSection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListSection.css';
import { FaStar } from 'react-icons/fa';

const StarIcon = () => {
  return <FaStar color="black" size={14} />;
};

const ListSection = ({ userList, selectedRegion, selectedSubAddress, selectedUserId }) => {
  const navigate = useNavigate();

  const filteredUsers = () => {
    if (!selectedRegion) {
      return userList;
    }

    return userList.filter((user) => {
      const regionMatch = user.region === selectedRegion;
      const subAddressMatch = selectedSubAddress === null || user.subAddress === selectedSubAddress;
      return regionMatch && subAddressMatch;
    });
  };

  const handleProfileClick = (userId) => {
    navigate(`/profile`);
  };

  return (
    <>
      <div style={{ color: '#ff9549', marginLeft: '19.5%', fontSize: '19px', fontWeight: 'bold', marginTop: '-350px', padding: '10px' }}>
        동네형 리스트
      </div>
      <div className="ListContainer" style={{ width: '49vh', height: '36vh', marginLeft: '18.9%', backgroundColor: '#643e23' }}>
        {filteredUsers().map((user) => (
          <div
            className={`UserProfile ${selectedUserId === user.id ? 'clicked' : ''}`}
            key={user.id}
            onClick={() => handleProfileClick(user.id)}
          >
            <div className='UserPic'></div>
            <div className="Userinfo">
              <table>
                <tbody>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.age}세 </td>
                    <td className='lastTd'><StarIcon /> &nbsp; {user.rating}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListSection;
