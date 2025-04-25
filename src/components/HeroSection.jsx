// src/components/HeroSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 导入闪卡图片
import dinnerImage from '@/assets/images/flashcards/dinner.png';
import giftImage from '@/assets/images/flashcards/gift.png';
import desireImage from '@/assets/images/flashcards/desire.png';
import solutionImage from '@/assets/images/flashcards/solution.png';

// 点击提示箭头SVG组件
const ChevronDown = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// 场景边框组件
const SceneBorder = () => (
  <div className="absolute inset-0 pointer-events-none">
    {/* 左上角 */}
    <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-gold-light/70"></div>
    {/* 右上角 */}
    <div className="absolute top-1 right-1 w-4 h-4 border-t border-r border-gold-light/70"></div>
    {/* 左下角 */}
    <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l border-gold-light/70"></div>
    {/* 右下角 */}
    <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-gold-light/70"></div>
  </div>
);

const flashCards = [
  {
    id: 1,
    image: dinnerImage,
    text: '饭局之上，话未出口',
    subText: '商务宴请，尽在不言中'
  },
  {
    id: 2,
    image: giftImage,
    text: '礼物之中，心意难表',
    subText: '一份心意，千言万语'
  },
  {
    id: 3,
    image: desireImage,
    text: '内心渴望，期待共鸣',
    subText: '渴望被理解，期待被认同'
  },
  {
    id: 4,
    isTextOnly: true,
    title: '来贺',
    scenarios: [
      {
        subtitle: '宴请',
        subtext: '妙语人皆赞，尬聊客不欢',
        text: '独创多重话题嵌入设计，为你轻松开启各种宴请场景'
      },
      {
        subtitle: '礼赠',
        subtext: '礼物或相似，故事显不同',
        text: '随包装附带卡片，可记录心意、分享故事，让礼物更难忘'
      }
    ]
  }
];

// 文字卡片背景渐变组件
const TextCardBackground = () => (
  <div className="absolute inset-0 bg-[#0a1020] overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]"></div>
    <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjMgMCAxMiA1LjM3IDEyIDEyaC02YzAgOS45NCA4LjA2IDE4IDE4IDE4di02YzYuNjMgMCAxMiA1LjM3IDEyIDEyIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L2c+PC9zdmc+')]"></div>
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a1020] to-transparent"></div>
  </div>
);

const HeroSection = ({ onComplete }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showClickHint, setShowClickHint] = useState(true);
  const [showExploreButton, setShowExploreButton] = useState(false);
  const touchStart = useRef(null);

  // 处理完成事件
  useEffect(() => {
    if (showExploreButton) {
      onComplete?.();
    }
  }, [showExploreButton, onComplete]);

  // 图片预加载
  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
      });
    };

    Promise.all(flashCards.map(card => loadImage(card.image)))
      .then(() => {
        setImagesLoaded(true);
        // 3秒后显示点击提示
        setTimeout(() => setShowClickHint(true), 3000);
      })
      .catch(error => {
        console.error('Failed to load images:', error);
        setImagesLoaded(true); // 即使加载失败也继续显示
      });
  }, []);

  // 处理触摸事件
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;

    // 判断滑动方向
    if (Math.abs(diff) > 50) { // 最小滑动距离
      if (diff > 0 && currentCard < flashCards.length - 1) {
        // 向左滑动
        setCurrentCard(currentCard + 1);
      } else if (diff < 0 && currentCard > 0) {
        // 向右滑动
        setCurrentCard(currentCard - 1);
      }
    }

    touchStart.current = null;
  };

  // 处理点击事件
  const handleClick = () => {
    setShowClickHint(false);
    if (currentCard < flashCards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      // 直接调用onComplete，不再显示探索按钮
      onComplete?.();
    }
  };

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section 
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-black"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 闪卡展示区域 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative w-full h-screen"
        >
          {/* 背景图片或文字背景 */}
          <div className="relative w-full h-full overflow-hidden">
            {flashCards[currentCard].isTextOnly ? (
              <>
                <TextCardBackground />
                <motion.div 
                  className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {flashCards[currentCard].title && (
                    <motion.h1 
                      className="text-4xl md:text-5xl font-serif text-gold-light mb-6 tracking-wider relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <span className="relative">
                        {flashCards[currentCard].title}
                        <motion.span 
                          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-[1px] bg-gold-light/90 w-12"
                          initial={{ width: 0 }}
                          animate={{ width: '60%' }}
                          transition={{ delay: 0.8, duration: 0.8 }}
                        />
                      </span>
                    </motion.h1>
                  )}
                  
                  {flashCards[currentCard].scenarios ? (
                    <div className="w-full max-w-xl mx-auto space-y-4 md:space-y-6 overflow-y-auto pb-4 scrollbar-hide" style={{maxHeight: 'calc(100vh - 160px)'}}>
                      {flashCards[currentCard].scenarios.map((scenario, index) => (
                        <motion.div 
                          key={index}
                          className="text-center relative px-3 py-3 mx-2 shadow-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + (index * 0.2), duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        >
                          <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] rounded-sm"></div>
                          <div className="absolute inset-0">
                            <SceneBorder />
                          </div>
                          
                          <h3 className="text-xl md:text-2xl text-gold-light font-serif mb-1.5 tracking-wider relative z-10">{scenario.subtitle}</h3>
                          <p className="text-sm md:text-base text-gold-DEFAULT/80 italic mb-2 tracking-wide font-light relative z-10">{scenario.subtext}</p>
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.7 + (index * 0.2), duration: 0.6 }}
                            className="w-10 h-[1px] bg-gold-light/70 mx-auto mb-2 relative z-10"
                          />
                          <p className="text-sm md:text-base text-gold-light/90 leading-relaxed tracking-wide mx-auto relative z-10 px-1">{scenario.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <motion.h1 
                        className="text-4xl md:text-5xl font-serif text-white mb-8 tracking-[0.2em] leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                      >
                        {flashCards[currentCard].text}
                      </motion.h1>
                      <motion.p 
                        className="text-xl md:text-2xl text-white/80 tracking-[0.15em] font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                      >
                        {flashCards[currentCard].subText}
                      </motion.p>
                    </>
                  )}
                </motion.div>
              </>
            ) : (
              <>
                <img 
                  src={flashCards[currentCard].image}
                  alt={flashCards[currentCard].text}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent opacity-50"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 点击提示 - 保持底部位置 */}
      {showClickHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <ChevronDown />
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;