// Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import mainLogo from '../img/mainLogo.svg';
import './Header.css';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src={mainLogo} alt="Your Logo" />
        </Link>
      </div>
      <Menu activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
    </div>
  );
};

export default Header;