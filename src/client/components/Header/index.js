// Imports
import React from 'react';

// CSS
import './index.scss';

// Images
import logoImg from './logo-img.svg';

/*
  Header
  <Header/>
*/

const Header = () => (
  <header className="c-header">
    <img className="c-header__img" src={logoImg} alt="Veery logo" />
    <h1 className="c-header__type">Veery</h1>
  </header>
);

export default Header;
