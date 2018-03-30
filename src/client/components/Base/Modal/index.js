// Imports
import React, {
  cloneElement
} from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// Components
import Button from '../Button';
import CirclesLoader from '../CirclesLoader';

// PropTypes
const propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func,
  handleSubmit: PropTypes.func,
  heading: PropTypes.string,
  isLoading: PropTypes.bool
};

/*
  Modal
  <Modal/>
*/

function Modal(props) {
  const {
    children,
    closeModal,
    handleSubmit,
    heading,
    isLoading
  } = props;

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
              <div className="c-button--close" onClick={closeModal}>&times;</div>
              <h2 className="c-heading">{heading}</h2>
            </header>

            {children &&
              cloneElement(children)}

            <footer className="c-card__footer">
              <Button value="Submit" disabled={isLoading} />
            </footer>

            {isLoading &&
              <CirclesLoader />}
          </div>
        </form>
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;

export default Modal;
