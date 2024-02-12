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
              <table style={{width:"100%", marginLeft: "20px", textAlign:"center"}}>
                
                  <tr>
                    <td style={{paddingLeft: "15px", paddingRight:"15px"}}>{user.name}</td>
                    <td style={{width:"0%"}}>|</td>
                    <td style={{paddingLeft: "15px", paddingRight:"15px"}}>{user.age}세 </td>
                    <td style={{width:"0%"}}>|</td>
                    <td style={{paddingLeft: "15px", paddingRight:"15px"}}><StarIcon /> &nbsp; {user.rating}</td>
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