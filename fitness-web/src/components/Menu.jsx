import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import SignUpModal from './ModalSignUp';

const Menu = ({ activeMenu, handleMenuClick }) => {
  const [isModalOpen,setIsModalOpen]=useState(false);

  const openModal=()=>setIsModalOpen(true);
  const closeModal=()=>setIsModalOpen(false);


  return (
    <div>
      <Link to="/search" className={`search ${activeMenu === 'search' ? 'active' : ''}`} onClick={() => handleMenuClick('search')}>
        동네형 찾기
      </Link>
      <Link to="/login" className={`login ${activeMenu === 'login' ? 'active' : ''}`} onClick={() => handleMenuClick('login')}>
        로그인
      </Link>
      <div className={`signup ${activeMenu === 'signup' ? 'active' : ''}`} onClick={() => {handleMenuClick('signup'); openModal();}}>
        회원가입
      </div>
      <SignUpModal isOpen={isModalOpen} closeModal={closeModal}/>
    </div>
  );
};

export default Menu;
