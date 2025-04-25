// src/components/ui/FloatingButton.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FloatingButton = ({ onClick, icon, label }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 200;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-gold/80 text-white
        hover:bg-gold shadow-lg backdrop-blur-sm transition-all duration-300 transform
        hover:scale-110 flex items-center justify-center group"
      aria-label={label}
    >
      <span className="text-2xl">{icon}</span>
      <span className="absolute right-full mr-2 px-2 py-1 bg-black/80 text-white text-sm rounded
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {label}
      </span>
    </button>
  );
};

FloatingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default FloatingButton;