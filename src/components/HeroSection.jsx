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
  const touchStart = useRef({ x: 0, y: 0 });
  const [touchDirection, setTouchDirection] = useState(null);
  // 新增自动播放和暂停功能
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef(null);
  // 添加一个状态来控制何时完成
  const [isCompleting, setIsCompleting] = useState(false);
  const sectionRef = useRef(null); // <-- Add ref for the section
  
  // 重置为第一张卡片
  const resetCards = () => {
    setCurrentCard(0);
    setIsAutoPlaying(true);
    setIsCompleting(false);
    setShowClickHint(true);
  };

  // 组件挂载或key变化时重置状态
  useEffect(() => {
    resetCards();
    return () => {
      // 清除自动播放计时器
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, []);
  
  // 处理完成状态：仅当到达最后一张卡片时设置 isCompleting
  useEffect(() => {
    if (currentCard >= flashCards.length - 1) {
      setIsCompleting(true); // Mark as completing to show the final button/state
      setIsAutoPlaying(false); // Ensure auto-play stops
      // 移除自动调用 onComplete 的 setTimeout
      // const timer = setTimeout(() => {
      //   onComplete?.();
      // }, 4000); 
      // return () => clearTimeout(timer);
    } else {
      setIsCompleting(false); // Reset if navigating away from the last card
    }
  }, [currentCard]);

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

    Promise.all(flashCards.map(card => card.image && loadImage(card.image)))
      .then(() => {
        setImagesLoaded(true);
        // 3秒后显示点击提示
        setTimeout(() => setShowClickHint(true), 3000);
      })
      .catch(error => {
        console.error('Failed to load images:', error);
        setImagesLoaded(true);
      });
  }, []);

  // 修改自动播放功能: 到达最后一张卡时仅停止播放，不调用 onComplete
  useEffect(() => {
    // 清除之前的计时器
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }

    if (isAutoPlaying && imagesLoaded && currentCard < flashCards.length - 1) {
      autoPlayTimerRef.current = setTimeout(() => {
        setCurrentCard(currentCard + 1);
      }, 4000); // 每4秒自动切换一次闪卡
    } else if (currentCard === flashCards.length - 1) {
        // 如果已经是最后一张卡片，确保自动播放停止
        setIsAutoPlaying(false);
        // 移除这里的 onComplete?.(); 调用
    }
    
    // 清理函数
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  // 依赖项移除了 onComplete，因为它不应再触发此 effect 或被此 effect 调用
  }, [currentCard, isAutoPlaying, imagesLoaded]); 

  // 跳过所有闪卡，直接进入主内容
  const handleSkip = (e) => {
    e.stopPropagation();
    setIsAutoPlaying(false);
    setCurrentCard(flashCards.length - 1);
    // 设置 isCompleting 状态以显示最后一张卡和按钮
    setIsCompleting(true);
    // 移除这里的自动 onComplete 调用
    // setTimeout(() => {
    //   onComplete?.();
    // }, 2500); 
  };

  // 手动控制闪卡
  const handleManualControl = (e) => {
    e.stopPropagation(); // 阻止冒泡
    setIsAutoPlaying(!isAutoPlaying);
  };

  // 处理触摸事件
  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    setTouchDirection(null);
  };

  const handleTouchMove = (e) => {
    if (!touchStart.current) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchStart.current.x - touchX;
    const deltaY = touchStart.current.y - touchY;

    // 判断滑动方向是否主要为垂直方向
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      setTouchDirection('vertical');
      e.preventDefault(); // 阻止默认的滚动行为
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current || touchDirection !== 'vertical') return;

    const touchY = e.changedTouches[0].clientY;
    const deltaY = touchStart.current.y - touchY;

    // 判断滑动方向和距离
    if (Math.abs(deltaY) > 50) { // 最小滑动距离
      if (deltaY > 0 && currentCard < flashCards.length - 1) {
        // 向上滑动，显示下一张
        setCurrentCard(currentCard + 1);
        setShowClickHint(false);
      } else if (deltaY < 0 && currentCard > 0) {
        // 向下滑动，显示上一张
        setCurrentCard(currentCard - 1);
        setShowClickHint(false);
      }
    }

    touchStart.current = null;
    setTouchDirection(null);
  };

  // 处理滚轮事件
  const handleWheel = (e) => {
    e.preventDefault();
    // 停止自动播放
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }
    if (e.deltaY > 0 && currentCard < flashCards.length - 1) {
      // 向下滚动，显示下一张
      setCurrentCard(currentCard + 1);
      setShowClickHint(false);
    } else if (e.deltaY < 0 && currentCard > 0) {
      // 向上滚动，显示上一张
      setCurrentCard(currentCard - 1);
      setShowClickHint(false);
    }
  };

  // 添加 useEffect 来处理 wheel 事件监听器
  useEffect(() => {
    const element = sectionRef.current;
    if (element) {
      // 使用 { passive: false } 来允许 preventDefault
      element.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    // 清理函数
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel, { passive: false });
      }
    };
    // 依赖项包括 handleWheel，如果它依赖于组件状态（它依赖 isAutoPlaying 和 currentCard）
  }, [handleWheel]); 

  // 处理点击事件
  const handleClick = () => {
    if (currentCard < flashCards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowClickHint(false);
      
      // 如果到达最后一张卡片，停止自动播放
      if (currentCard === flashCards.length - 2) {
        setIsAutoPlaying(false);
      }
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
      ref={sectionRef} // <-- Assign ref
      className={`fixed inset-0 w-screen h-screen overflow-hidden bg-black ${
        isCompleting ? 'z-30 opacity-100' : 'z-30'
      }`}
      style={{
        transition: 'opacity 0.8s ease-out',
      }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 闪卡展示区域 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative w-full h-screen flex flex-col justify-center"
        >
          {/* 背景图片或文字背景 */}
          <div className="relative w-full flex-1 overflow-hidden flex flex-col justify-center">
            {flashCards[currentCard].isTextOnly ? (
              <>
                <TextCardBackground />
                <motion.div 
                  className="absolute inset-0 flex flex-col items-center justify-center px-6 py-16 md:py-24"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {flashCards[currentCard].title && (
                    <motion.h1 
                      className="text-5xl md:text-7xl font-serif text-gold-light mb-8 tracking-wider relative flex flex-col items-center"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <span className="relative">
                        {flashCards[currentCard].title}
                        <motion.span 
                          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-gold-light/90 to-transparent w-24"
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: '120%', opacity: 1 }}
                          transition={{ delay: 0.8, duration: 1 }}
                        />
                      </span>
                      <motion.p
                        className="text-lg text-gold-light/80 mt-3 tracking-wider font-light" 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      >
                        首创社交白酒品牌
                      </motion.p>
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
                          
                          <h3 className="text-xl md:text-2xl text-gold-light font-serif mb-1.5 tracking-wider relative z-10 flex items-center justify-center">
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.6 + (index * 0.2), duration: 0.5 }}
                              className="mr-2"
                            >
                              {scenario.subtitle === '宴请' ? (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 15.5H7.5C6.10444 15.5 5.40665 15.5 4.83886 15.6722C3.56045 16.06 2.56004 17.0605 2.17224 18.3389C2 18.9067 2 19.6044 2 21M16 18L18 20L22 16M14.5 7.5C14.5 9.98528 12.4853 12 10 12C7.51472 12 5.5 9.98528 5.5 7.5C5.5 5.01472 7.51472 3 10 3C12.4853 3 14.5 5.01472 14.5 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              ) : (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                                  <path d="M20 12v10H4V12M4 8h16v4H4V8zm8 12V8m-4 0l-2-4h12l-2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </motion.span>
                            {scenario.subtitle}
                          </h3>
                          <p className="text-sm md:text-base text-white/80 italic mb-2 tracking-wide font-light relative z-10">{scenario.subtext}</p>
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.7 + (index * 0.2), duration: 0.6 }}
                            className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-light/70 to-transparent mx-auto mb-3 relative z-10"
                          />
                          <p className="text-sm md:text-base text-gold-light/90 leading-relaxed tracking-wide mx-auto relative z-10 px-1">
                            {scenario.text.split('，').map((part, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + (index * 0.2) + (i * 0.1), duration: 0.5 }}
                                className={`inline-block ${i === 0 ? 'font-medium text-gold-light' : ''}`}
                              >
                                {part}{i < scenario.text.split('，').length - 1 ? '，' : ''}
                              </motion.span>
                            ))}
                          </p>
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
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white/60 flex flex-col items-center"
        >
          <span className="text-sm mb-2">向上滑动</span>
          <ChevronDown />
        </motion.div>
      )}

      {/* 导航指示器 */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
        {flashCards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentCard === index ? 'bg-gold-light scale-125' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
      
      {/* 跳过按钮 */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={handleSkip}
        aria-label="跳过介绍，直接进入网站"
        className="absolute top-6 right-20 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm border border-white/20 hover:bg-black/60 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-gold-light/50 transition-all duration-300"
      >
        跳过
      </motion.button>
      
      {/* 暂停/播放按钮 */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={handleManualControl}
        className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-black/60 transition-all duration-300"
      >
        {isAutoPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4H6V20H10V4Z" fill="currentColor" />
            <path d="M18 4H14V20H18V4Z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4L18 12L6 20V4Z" fill="currentColor" />
          </svg>
        )}
      </motion.button>
      
      {/* 进度指示器 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[80%] max-w-md h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gold-light"
          initial={{ width: 0 }}
          animate={{ width: `${(currentCard / (flashCards.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* 在最后一张闪卡时显示"进入网站"按钮 - onClick 现在是完成的唯一触发器 */}
      {currentCard === flashCards.length - 1 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }} // 延迟显示按钮
          onClick={(e) => {
            e.stopPropagation();
            // 先添加一个淡出效果
            const section = e.currentTarget.closest('section');
            if (section) {
              section.style.transition = 'opacity 0.8s ease-out';
              section.style.opacity = '0';
            }
            // 延迟调用onComplete，让淡出效果完成
            setTimeout(() => {
              onComplete?.(); // 这是完成引导页的唯一调用点
            }, 800); // 800ms 延迟匹配淡出效果
          }}
          aria-label="进入来贺品牌网站"
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 px-8 py-3 rounded-full bg-gold-light/90 text-black text-base font-medium hover:bg-gold-light hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold/50 active:scale-95 transition-all duration-300 shadow-xl"
        >
          进入网站
        </motion.button>
      )}
    </section>
  );
};

export default HeroSection;