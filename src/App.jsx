// src/App.jsx
import React, { Suspense, useState, useRef } from 'react';
import BottomNav from './components/BottomNav';
import ScrollProgress from './components/ui/ScrollProgress';
import FloatingButton from './components/ui/FloatingButton';
import HeroSection from './components/HeroSection';
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
  const mainContentRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsHeroSectionActive(true);
  };
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = (e) => {
    e?.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
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
              <img src="/assets/images/Logo/logo-main.png" alt="来贺" className="h-12 mx-auto mb-4" />
              <p className="text-gold-light/80 text-sm">中国首创社交白酒品牌</p>
            </div>
            
            <nav className="flex flex-col items-center space-y-8">
              <button onClick={() => scrollToTop()} className="text-white text-2xl hover:text-gold-light transition-colors">首页</button>
              <button onClick={() => scrollToSection('brand-story')} className="text-white text-2xl hover:text-gold-light transition-colors">品牌故事</button>
              <button onClick={() => scrollToSection('product-features')} className="text-white text-2xl hover:text-gold-light transition-colors">产品特点</button>
              <button onClick={() => scrollToSection('product-showcase')} className="text-white text-2xl hover:text-gold-light transition-colors">产品展示</button>
              <button onClick={() => scrollToSection('purchase-guide')} className="text-white text-2xl hover:text-gold-light transition-colors">购买指南</button>
              <button onClick={() => scrollToSection('contact')} className="text-white text-2xl hover:text-gold-light transition-colors">联系我们</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <div className="relative h-screen">
        <HeroSection onComplete={() => setIsHeroSectionActive(false)} />
      </div>
      
      {/* 主内容层 */}
      <div 
        ref={mainContentRef}
        className={`relative z-10 ${isHeroSectionActive ? 'invisible' : 'visible'}`}
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
            <QualityCrafts />
            <div id="purchase-guide">
              <PurchaseGuide />
            </div>
            <div id="contact" className="py-16 text-center">
              <h2 className="text-3xl font-serif text-white mb-8">联系我们</h2>
              <p className="text-white/70 mb-4">电话: 400-123-4567</p>
              <p className="text-white/70 mb-4">邮箱: contact@laihe.com</p>
              <p className="text-white/70 mb-8">地址: 中国北京市朝阳区</p>
              <p className="text-gray-400 text-sm mt-8">© {new Date().getFullYear()} 来贺. All rights reserved.</p>
            </div>
          </Suspense>
        </main>
        
        <FloatingButton
          onClick={scrollToTop}
          icon="↑"
          label="返回顶部"
        />
      </div>
    </div>
  );
};

export default App;