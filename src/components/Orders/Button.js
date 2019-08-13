import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, setMenuType }) => (
  <div>
    <button type="button" onClick={() => setMenuType(name)}>{name.toUpperCase()}</button>
  </div>
);

Button.propTypes = {
  name: PropTypes.string.isRequired,
  setMenuType: PropTypes.func.isRequired,
};

export default Button;
