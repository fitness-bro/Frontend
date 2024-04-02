import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Menu.css';
import SignInModal from '../modalSignIn/ModalSignIn';
import SocialGoogle from '../login/SocialGoogle';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  align-items: center; 
`;

const Menu = ({ activeMenu, handleMenuClick}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("role"));
  const [userRole, setUserRole] = useState('');
 
  const handleGoogleLoginResult =  (exist) => {
    if (exist) {
      setIsLoggedIn(true);
    } else  {
      //console.log(exist);
      navigate("/registchoice");
    }
  }
  
  const [isModalInOpen, setIsModalInOpen] = useState(false);
  const openModalIn = () => setIsModalInOpen(true);
  const closeModalIn = () => setIsModalInOpen(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
  if (token) {
    setIsLoggedIn(true);
    setUserRole(role);

  } else {
    setIsLoggedIn(false);
    setUserRole('');
  }
}, [activeMenu,isLoggedIn]); 

  const handleLogout = () => {
    //localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem("userId");
    localStorage.removeItem('role');
    setUserRole('');
    setIsLoggedIn(false);
    navigate("/")
  };


  return (
    <MenuContainer>
      <SocialGoogle handleGoogleLoginResult={handleGoogleLoginResult} />

      <Link to="/search" className={`search ${activeMenu === 'search' ? 'active' : ''}`} onClick={() => handleMenuClick('search')}>
        동네형 찾기
      </Link>
      
      {/* 로그인 여부 및 role 값에 따라 마이페이지 버튼을 다르게 표시 */}
      {isLoggedIn && userRole === 'MEMBER' && (
        <Link to='/MyPageMember' className={`mypage ${activeMenu === 'mypage' ? 'active' : ''}`} onClick={() => handleMenuClick('mypage')}>
          마이 페이지
        </Link>
      )}

      {isLoggedIn && userRole === 'COACH' && (
        <Link to='/MyPageCoach' className={`mypage ${activeMenu === 'mypage' ? 'active' : ''}`} onClick={() => handleMenuClick('mypage')}>
          마이 페이지
        </Link>
      )}

      {!isLoggedIn && (
        <div className={`login ${activeMenu === 'login' ? 'active' : ''}`} onClick={() => { handleMenuClick('login'); openModalIn(); }}>
          로그인/회원가입
        </div>
      )}

      <SignInModal isOpen={isModalInOpen} closeModalIn={closeModalIn}/>

      {isLoggedIn ? (
        <div className={`logout ${activeMenu === 'logout' ? 'active' : ''}`} onClick={handleLogout}>
          로그 아웃
        </div>
      ):(null)}
    </MenuContainer>
  );
};

export default Menu;