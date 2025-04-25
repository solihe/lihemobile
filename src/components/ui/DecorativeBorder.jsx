// src/components/ui/DecorativeBorder.jsx
import React from 'react';
import PropTypes from 'prop-types';

const DecorativeBorder = ({ children, className = '' }) => {
  return (
    <div className={`relative p-1 ${className}`}>
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/60" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/60" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/60" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/60" />
      {children}
    </div>
  );
};

DecorativeBorder.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default DecorativeBorder;