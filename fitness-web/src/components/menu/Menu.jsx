import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import SignInModal from '../modalSignIn/ModalSignIn';

const Menu = ({ activeMenu, handleMenuClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(!!localStorage.getItem("userId"));


  
  const [isModalInOpen, setIsModalInOpen] = useState(false);
  const openModalIn = () => setIsModalInOpen(true);
  const closeModalIn = () => setIsModalInOpen(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const id=localStorage.getItem('userId')

  if (token &&id) {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserId(true)

  } else {
    setIsLoggedIn(false);
    setUserRole('');
    setUserId(false)
  }
}, []); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("userId");
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole('');
    setUserId(false)
  };


  return (
    <div>
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
    </div>
  );
};

export default Menu;