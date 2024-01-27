import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ activeMenu, handleMenuClick }) => {

  return (
    <div>
      <Link to="/search" className={`search ${activeMenu === 'search' ? 'active' : ''}`} onClick={() => handleMenuClick('search')}>
        동네형 찾기
      </Link>
      <Link to="/Registration" className={`regist ${activeMenu === 'register' ? 'active' : ''}`} onClick={() => handleMenuClick('register')}>
        동네형 등록
      </Link>
      <Link to="/login" className={`login ${activeMenu === 'login' ? 'active' : ''}`} onClick={() => handleMenuClick('login')}>
        로그인/회원가입
      </Link>
    </div>
  );
};

export default Menu;
