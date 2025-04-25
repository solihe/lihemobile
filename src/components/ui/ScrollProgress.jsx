// src/components/ui/ScrollProgress.jsx
import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-50">
      <div
        className="h-full bg-gold transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;