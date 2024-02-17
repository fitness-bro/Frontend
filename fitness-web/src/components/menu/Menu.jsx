import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import SignUpModal from '../modalSignUp/ModalSignUp';

const Menu = ({ activeMenu, handleMenuClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 토큰이 존재하는 경우 true로 설정
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); 
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 제거
    setIsLoggedIn(false); // 로그인 상태 변경
  };


  return (
    <div>
      <Link to="/search" className={`search ${activeMenu === 'search' ? 'active' : ''}`} onClick={() => handleMenuClick('search')}>
        동네형 찾기
      </Link>
      
      {/* 토큰이 존재하는 경우 로그아웃 버튼 표시 */}
      {isLoggedIn ? (
        <Link to='/MyPageCoach' className={`mypage ${activeMenu === 'mypage' ? 'active' : ''}`} onClick={() => { handleMenuClick('mypage')}}>
          마이 페이지
        </Link>
      ) : (
        // 토큰이 존재하지 않는 경우 로그인 버튼 표시
        <div className={`login ${activeMenu === 'login' ? 'active' : ''}`} onClick={() => { handleMenuClick('login'); openModal(); }}>
          로그인
        </div>
      )}

      <SignUpModal isOpen={isModalOpen} closeModal={closeModal}/>

            {isLoggedIn ? (
        <div className={`logout ${activeMenu === 'logout' ? 'active' : ''}`} onClick={handleLogout}>
          로그 아웃
        </div>
      ) : (
        // 토큰이 존재하지 않는 경우 로그인 버튼 표시
        <div className={`signup ${activeMenu === 'signup' ? 'active' : ''}`} onClick={() => { handleMenuClick('signup'); openModal(); }}>
          회원가입
        </div>
      )}
    </div>
  );
};

export default Menu;