// src/components/Testimonials.jsx
import React, { useState, useEffect, useRef } from 'react';
import DecorativeBorder from './ui/DecorativeBorder';

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef(null);
  const slidesContainerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: '张总',
      role: '科技公司CEO',
      gender: 'male',
      content: '来贺让商务饭局不再尴尬，印章互动让气氛自然活跃。每次带客户用餐，都会用来贺开场，效果非常好。'
    },
    {
      id: 2,
      name: '李小姐',
      role: '新锐设计师',
      gender: 'female',
      content: '婚宴上用来贺，创意十足，朋友们都很感兴趣。红冠系列的外观设计太精美了，甚至有朋友专门收藏。'
    },
    {
      id: 3,
      name: '王先生',
      role: '资深品酒师',
      gender: 'male',
      content: '12987酱香工艺确实出色，口感层次丰富，回味悠长。印章酒冠的创意为传统白酒带来了新的体验维度。'
    },
    {
      id: 4,
      name: '赵女士',
      role: '企业高管',
      gender: 'female',
      content: '作为公司活动的礼品，来贺的接受度很高。不仅是酒的品质，更是它带来的社交互动，让整个团队更加凝聚。'
    },
    {
      id: 5,
      name: '陈总',
      role: '餐饮集团创始人',
      gender: 'male',
      content: '我们餐厅专门推出了来贺主题酒席，顾客反馈非常好。印章互动成为了餐厅的特色体验，带动了整体营收增长。'
    }
  ];
  
  // 随机分配头像
  const maleAvatars = [
    'https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/icons/sir01.webp',
    'https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/icons/sir02.webp',
  ];
  const femaleAvatars = [
    'https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/icons/lady01.webp',
    'https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/icons/lady02.webp',
  ];
  function getRandomAvatar(gender, idx) {
    // idx用于保证每次渲染头像稳定
    if (gender === 'male') {
      return maleAvatars[idx % maleAvatars.length];
    } else {
      return femaleAvatars[idx % femaleAvatars.length];
    }
  }
  
  // 移动端显示1个，电脑显示2个
  const getVisibleSlides = () => {
    return window.innerWidth < 768 ? 1 : 2;
  };
  
  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());
  const totalSlides = testimonials.length;

  // 监听窗口大小变化，调整可见幻灯片数量
  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // 初始调用
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, activeSlide]);

  const nextSlide = () => {
    setActiveSlide((prev) => {
      const maxSlide = totalSlides - visibleSlides;
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setActiveSlide((prev) => {
      const maxSlide = totalSlides - visibleSlides;
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };

  const handleMouseEnter = () => {
    setAutoplay(false);
  };

  const handleMouseLeave = () => {
    setAutoplay(true);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center mb-4">用户评价</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          听听他们如何评价来贺的独特体验和卓越品质
        </p>
        
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden" ref={slidesContainerRef}>
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * (100 / visibleSlides)}%)` }}
            >
              {testimonials.map((testimonial, idx) => (
                <div
                  key={testimonial.id}
                  className={`w-full md:w-1/2 flex-shrink-0 px-4 transition-all duration-300`}
                  style={{ minWidth: `${100 / visibleSlides}%` }}
                >
                  <DecorativeBorder className="bg-white h-full">
                    <div className="p-6 flex flex-row h-full items-stretch relative">
                      {/* 头像大图层 */}
                      <div className="relative w-32 min-w-32 h-full flex-shrink-0 flex items-center justify-center">
                        <img
                          src={getRandomAvatar(testimonial.gender, idx)}
                          alt={testimonial.name}
                          className="absolute inset-0 w-full h-full object-cover rounded-full border-2 border-gold"
                          style={{zIndex: 1, objectFit: 'cover', objectPosition: 'center'}}
                        />
                      </div>
                      {/* 右侧内容 */}
                      <div className="flex-1 flex flex-col justify-center pl-6 relative">
                        <p className="text-gray-700 italic flex-grow mb-4">{testimonial.content}</p>
                        <div className="mt-auto flex flex-col items-end">
                          <div className="text-gold">
                            <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </div>
                          {/* 姓名职位右下角斜体小字，放在星星下方 */}
                          <div className="mt-2 text-xs italic text-gray-500 text-right">
                            {testimonial.name} / {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DecorativeBorder>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 z-10 transition-transform duration-300 hover:scale-110 focus:outline-none"
            aria-label="上一个"
          >
            <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 z-10 transition-transform duration-300 hover:scale-110 focus:outline-none"
            aria-label="下一个"
          >
            <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-8">
            {Array.from({ length: totalSlides - visibleSlides + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-colors duration-300 ${
                  activeSlide === index ? 'bg-gold' : 'bg-gray-300'
                }`}
                aria-label={`跳转到第${index + 1}页`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;