// src/components/EmotionalFlashCards.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/animations.css';

// 导入闪卡图片
import dinnerImage from '/public/assets/images/flashcards/饭局.png';
import giftImage from '/public/assets/images/flashcards/礼物.png';
import desireImage from '/public/assets/images/flashcards/渴望.png';

const EmotionalFlashCards = ({ onComplete }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const progressInterval = useRef(null);

  const transitions = {
    fade: {
      initial: { opacity: 0, filter: 'blur(8px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(8px)' },
      transition: { duration: 0.8 }
    },
    slide: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 },
      transition: { duration: 0.8, ease: 'easeInOut' }
    },
    zoom: {
      initial: { scale: 1.2, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
      transition: { duration: 0.8 }
    },
    elegantFade: {
      initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: -20, filter: 'blur(4px)' },
      transition: { duration: 1 }
    }
  };

  const flashCards = [
    {
      id: 1,
      image: dinnerImage,
      duration: 3000,
      transition: 'fade'
    },
    {
      id: 2,
      image: giftImage,
      duration: 3000,
      transition: 'slide'
    },
    {
      id: 3,
      image: desireImage,
      duration: 4000,
      transition: 'elegantFade'
    }
  ];

  // 图片预加载
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = flashCards.length;

    flashCards.forEach(card => {
      const img = new Image();
      img.src = card.image;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
          console.log('All images loaded successfully');
        }
      };
      img.onerror = (err) => {
        console.error('Error loading image:', card.image, err);
      };
    });
  }, []);

  // 进度条逻辑
  useEffect(() => {
    if (isPaused || !imagesLoaded) return;

    setProgress(0);
    const duration = flashCards[currentCard].duration;
    const interval = 16; // 约60fps
    const steps = duration / interval;
    let currentStep = 0;

    progressInterval.current = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(progressInterval.current);
      }
    }, interval);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentCard, isPaused, imagesLoaded]);

  // 自动播放逻辑
  useEffect(() => {
    if (isPaused || !imagesLoaded) return;
    
    const timer = setTimeout(() => {
      if (currentCard < flashCards.length - 1) {
        setCurrentCard(currentCard + 1);
      } else {
        setShowExplore(true);
        onComplete();
      }
    }, flashCards[currentCard].duration);
    
    return () => clearTimeout(timer);
  }, [currentCard, isPaused, imagesLoaded, onComplete]);

  // 闪卡交互处理
  const handleCardClick = () => {
    setIsPaused(!isPaused);
  };

  const handleSwipe = (direction) => {
    if (direction === 'left' && currentCard < flashCards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else if (direction === 'right' && currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">加载中...</div>
      </div>
    );
  }

  return (
    <section className="fixed inset-0 w-screen h-screen overflow-hidden z-50">
      {/* 闪卡容器 */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={flashCards[currentCard].id}
          {...transitions[flashCards[currentCard].transition]}
          className="relative w-full h-full"
          onClick={handleCardClick}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            const startX = touch.clientX;
            const handleTouchEnd = (e) => {
              const touch = e.changedTouches[0];
              const endX = touch.clientX;
              const diff = endX - startX;
              if (Math.abs(diff) > 50) {
                handleSwipe(diff > 0 ? 'right' : 'left');
              }
            };
            document.addEventListener('touchend', handleTouchEnd, { once: true });
          }}
        >
          {/* 背景图片容器 */}
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${flashCards[currentCard].image})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
          
          {/* 暂停/播放指示器 */}
          <div className={`pause-indicator ${isPaused ? 'visible' : ''}`}>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="white"
            >
              {isPaused ? (
                <path d="M8 5v10l6-5z"/>
              ) : (
                <path d="M6 4h3v12H6zm5 0h3v12h-3z"/>
              )}
            </svg>
          </div>

          {/* 进度条 */}
          <div className="progress-bar">
            <div 
              className="h-full bg-white"
              style={{ 
                width: `${progress}%`,
                transition: isPaused ? 'none' : 'width linear'
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* 探索按钮 */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showExplore ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <button 
          onClick={onComplete}
          className="mx-auto inline-block px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
        >
          探索来贺世界
        </button>
      </motion.div>

      {/* 滑动提示 */}
      {!showExplore && (
        <div className="swipe-hint">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="white">
            <path d="M20 5L5 20M20 5L35 20" strokeWidth="2" stroke="white"/>
          </svg>
        </div>
      )}
    </section>
  );
};

export default EmotionalFlashCards;