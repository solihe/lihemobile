// src/App.jsx
import React, { Suspense, useState, useRef, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import ScrollProgress from './components/ui/ScrollProgress';
import FloatingButton from './components/ui/FloatingButton';
import HeroSection from './components/HeroSection';
import Hero from './components/Hero';
import './styles/animations.css';
import { motion, AnimatePresence } from 'framer-motion';

// 次要加载的组件
const ProductFeatures = React.lazy(() => import('./components/ProductFeatures'));
const ProductShowcase = React.lazy(() => import('./components/ProductShowcase'));
const BrandStory = React.lazy(() => import('./components/BrandStory'));
const InteractiveExperience = React.lazy(() => import('./components/InteractiveExperience'));
const UseCases = React.lazy(() => import('./components/UseCases'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const QualityCrafts = React.lazy(() => import('./components/QualityCrafts'));
const PurchaseGuide = React.lazy(() => import('./components/PurchaseGuide'));

// 汉堡菜单按钮组件
const MenuButton = ({ onClick, isActive }) => (
  <div 
    className="fixed z-50 top-6 right-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-pointer text-white border border-white/20 hover:bg-black/60 transition-all duration-300"
    onClick={onClick}
  >
    {isActive ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </div>
);

const App = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [isHeroSectionActive, setIsHeroSectionActive] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroKey, setHeroKey] = useState(0);
  const mainContentRef = useRef(null);

  // 确保初始加载时HeroSection是可见的
  useEffect(() => {
    setIsHeroSectionActive(true);
  }, []);

  // 处理HeroSection完成事件
  const handleHeroSectionComplete = () => {
    setIsHeroSectionActive(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100);
  };

  // scrollToTop 函数 - 修改为仅在需要强制显示 HeroSection 时使用 (如 showBrandStoryCards)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsHeroSectionActive(true); // 确保 HeroSection 可见
  };
  
  // scrollToSection 函数 - 用于滚动到主内容区的特定部分
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // 确保主内容可见
      setIsHeroSectionActive(false);
      
      // 使用 setTimeout 确保状态更新后执行滚动
      setTimeout(() => {
         // 特殊处理 'home' ID，确保滚动到页面顶部
         if (sectionId === 'home') {
           window.scrollTo({ top: 0, behavior: 'smooth' });
         } else {
           section.scrollIntoView({ behavior: 'smooth' });
         }
      }, 50); // 短暂延迟以确保DOM更新
    }
    setIsMenuOpen(false); // 关闭菜单
  };

  // 新增函数：滚动到主内容首页
  const scrollToHomeSection = () => {
    // 保持在主内容区域
    setIsHeroSectionActive(false);
    // 滚动到主内容首页 (页面顶部)
    // 使用 setTimeout 确保状态更新后执行滚动
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
    setIsMenuOpen(false); // 如果菜单是打开的，关闭它
  };

  const toggleMenu = (e) => {
    e?.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  // 显示品牌故事卡
  const showBrandStoryCards = () => {
    setIsMenuOpen(false);
    // 确保主内容被隐藏，显示 HeroSection
    setIsHeroSectionActive(true);
    // 通过改变key来强制HeroSection重新渲染
    setHeroKey(prevKey => prevKey + 1);
    // 重置滚动位置
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* 全局汉堡菜单按钮 */}
      <MenuButton onClick={toggleMenu} isActive={isMenuOpen} />
      
      {/* 全局菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          >
            <div className="text-center mb-12">
              <img src="https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/Logo/logo-main.png" alt="来贺" className="h-12 mx-auto mb-4" />
              <p className="text-gold-light/80 text-sm">中国首创社交白酒品牌</p>
            </div>
            
            <nav className="flex flex-col items-center space-y-8">
              <button onClick={() => scrollToSection('home')} className="text-white text-2xl hover:text-gold-light transition-colors">首页</button>
              <button onClick={showBrandStoryCards} className="text-white text-2xl hover:text-gold-light transition-colors">品牌故事卡</button>
              <button onClick={() => scrollToSection('brand-story')} className="text-white text-2xl hover:text-gold-light transition-colors">品牌故事</button>
              <button onClick={() => scrollToSection('product-features')} className="text-white text-2xl hover:text-gold-light transition-colors">产品特点</button>
              <button onClick={() => scrollToSection('product-showcase')} className="text-white text-2xl hover:text-gold-light transition-colors">产品展示</button>
              <button onClick={() => scrollToSection('purchase-guide')} className="text-white text-2xl hover:text-gold-light transition-colors">购买指南</button>
              <button onClick={() => scrollToSection('contact')} className="text-white text-2xl hover:text-gold-light transition-colors">联系我们</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section - 闪卡部分 */}
      <div 
        className={`fixed inset-0 w-full h-full ${isHeroSectionActive ? 'z-30 visible' : 'z-0 invisible'}`} 
        style={{ 
          opacity: isHeroSectionActive ? 1 : 0,
          transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out'
        }}
      >
        <HeroSection key={heroKey} onComplete={handleHeroSectionComplete} />
      </div>
      
      {/* 主内容层 */}
      <div 
        ref={mainContentRef}
        className={`relative z-20 ${isHeroSectionActive ? 'invisible' : 'visible'}`}
        style={{
          transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out',
          opacity: isHeroSectionActive ? 0 : 1
        }}
        id="main-content"
      >
        <ScrollProgress />
        
        <main className="relative">
          {/* 其他内容区域 */}
          <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <div id="home">
              <Hero />
            </div>
            <div id="product-features">
              <ProductFeatures />
            </div>
            <div id="product-showcase">
              <ProductShowcase />
            </div>
            <div id="brand-story">
              <BrandStory />
            </div>
            <InteractiveExperience />
            <UseCases />
            <Testimonials />
            {/* <QualityCrafts /> */}
            <div id="purchase-guide">
              <PurchaseGuide />
            </div>
            <div id="contact" className="py-16 text-center">
              <h2 className="text-3xl font-serif text-white mb-8">联系我们</h2>
              <p className="text-white/70 mb-4">电话: 18531009956</p>
              <p className="text-white/70 mb-4">邮箱: info@ilihe.com</p>
              <p className="text-white/70 mb-8">地址: 江西省铜鼓县工业园</p>
              <p className="text-gray-400 text-sm mt-8">© {new Date().getFullYear()} 来贺. All rights reserved.</p>
            </div>
          </Suspense>
        </main>
        
        <FloatingButton
          onClick={scrollToHomeSection} 
          icon="↑"
          label="返回顶部"
        />
      </div>
    </div>
  );
};

export default App;