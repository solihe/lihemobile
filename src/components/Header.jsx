import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/scrollUtils';
import Logo from './ui/Logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '主页' },
    { id: 'products', label: '产品' },
    { id: 'brand-story', label: '品牌故事' },
    { id: 'purchase', label: '购买' },
    { id: 'contact', label: '联系我们' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-black/40 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="w-24 flex items-center justify-start">
            <Logo 
              type="main"
              className="h-8 object-contain"
            />
          </div>

          {/* Center: Brand message */}
          <div className="text-center flex-1">
            <p className="text-gray-300 text-xs md:text-sm tracking-wider">中国首创社交白酒品牌</p>
          </div>

          {/* Right: Menu button */}
          <div className="w-24 flex items-center justify-end">
            <button 
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="菜单"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="bg-black/95 backdrop-blur-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-white py-2 hover:text-gold transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 