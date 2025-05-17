// src/components/InteractiveExperience.jsx
import React, { useState, useEffect } from 'react';

const InteractiveExperience = () => {
  const [videoError, setVideoError] = useState(false);

  // 检查视频是否可用
  useEffect(() => {
    const videoPath = '/assets/videos/demo.mp4';
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', videoPath, true);
    xhr.onload = function() {
      if (xhr.status >= 400) {
        setVideoError(true);
      }
    };
    xhr.onerror = function() {
      setVideoError(true);
    };
    xhr.send(null);
  }, []);

  return (
    <div className="w-full bg-black">
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative w-full aspect-video bg-black">
          {videoError ? (
            <img 
              src="/assets/images/products/baijiu-bottle-classic.jpg" 
              alt="印章酒冠" 
              className="absolute top-0 left-0 w-full h-full object-cover" />
          ) : (
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              playsInline
              autoPlay
              muted
              loop
              controls={false}
              onError={() => setVideoError(true)}
            >
              <source src="/assets/videos/demo.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveExperience;