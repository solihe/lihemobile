// src/components/BottomNav.jsx
import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/scrollUtils';

const BottomNav = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: '主页', icon: '🏠' },
    { id: 'products', label: '产品', icon: '🍶' },
    { id: 'brand-story', label: '品牌故事', icon: '📖' },
    { id: 'purchase', label: '购买', icon: '🛒' },
    { id: 'contact', label: '联系我们', icon: '📞' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gold border-opacity-20 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-300 ${
              activeSection === item.id ? 'text-gold' : 'text-gray-400 hover:text-gold'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="h-safe-area-inset-bottom bg-gray-900" />
    </nav>
  );
};

export default BottomNav;