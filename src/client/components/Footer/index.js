// Imports
import React from 'react';
import ReactGa from 'react-ga';
import {
  Link
} from 'react-router';

// CSS
import './index.scss';

/*
  Footer
  <Footer/>
*/

function Footer() {
  const handleClick = () => {
    return ReactGA.event({
      category: 'HomePage',
      action: 'Clicked Venue Owner Sign Up',
    });
  };

  return (
    <footer className="c-footer">
      <h6 className="c-footer__text">Venue owner? Sign up&nbsp;
        <Link
          className="c-footer__link"
          onClick={handleClick}
          to="/admin/sign-up"
        >
          here
        </Link>
      </h6>
    </footer>
  );
}

export default Footer;
