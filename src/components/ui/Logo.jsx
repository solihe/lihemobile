import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ type = 'main', className = '' }) => {
  if (type === 'icon') {
    return (
      <img 
        src="/assets/images/Logo/logo-icon.png"
        alt="来贺"
        className={className}
      />
    );
  }

  // Main logo
  return (
    <img 
      src="/assets/images/Logo/logo-main.png"
      alt="来贺"
      className={className}
    />
  );
};

Logo.propTypes = {
  type: PropTypes.oneOf(['main', 'icon']),
  className: PropTypes.string
};

export default Logo; 