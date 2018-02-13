// Imports
import React, {
  cloneElement
} from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// Components
import Button from '../Button';

// PropTypes
const propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func,
  handleSubmit: PropTypes.func,
  heading: PropTypes.string
};

/*
  Modal
  <Modal/>
*/

function Modal({ children, closeModal, handleSubmit, heading }) {
  return (
    <div>
      <div className="c-overlay c-overlay--visible" />
      <div className="o-modal">
        <form
          className="c-modal__form o-fieldset o-container o-container--small"
          onSubmit={handleSubmit}
        >
          <div className="c-card">
            <header className="c-card__header">
              <button className="c-button--close" onClick={closeModal}>&times;</button>
              <h2 className="c-heading">{heading}</h2>
            </header>

            {children &&
              cloneElement(children)}

            <footer className="c-card__footer">
              <Button value="Submit" />
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;

export default Modal;
