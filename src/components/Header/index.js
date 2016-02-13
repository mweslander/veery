// Imports
import React from 'react';

// CSS
import './header.scss';

// Images
import logoImg from './logo-img.svg';

/*
  Header
  <Header/>
*/

const Header = () => (
  <header className="header">
    <img className="header__img" src={logoImg} alt="Veery logo" />
    <h1 className="header__type">Veery</h1>
  </header>
);

export default Header;
