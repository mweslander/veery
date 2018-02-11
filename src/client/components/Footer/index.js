// Imports
import React from 'react';
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
  return (
    <footer className="c-footer">
      <h6 className="c-footer__text">Venue owner? Sign up&nbsp;
        <Link className="c-footer__link" to="/admin/sign-up">here</Link>
      </h6>
    </footer>
  );
}

export default Footer;
