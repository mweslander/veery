// Imports
import React from 'react';
import {
  Link
} from 'react-router';

// CSS
import './index.scss';

function HomeLink() {
  return (
    <div className="c-home-link__container">
      <Link className="c-link c-home-link" to="/">
        <i className="fa fa-angle-left" />
        <span>Back to Map</span>
      </Link>
    </div>
  );
}

export default HomeLink;
