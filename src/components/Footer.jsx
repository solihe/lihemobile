import React from 'react';
import { scrollToSection } from '../utils/scrollUtils';
import Logo from './ui/Logo';

const Footer = () => {
  const navItems = [
    { id: 'home', label: '主页' },
    { id: 'products', label: '产品' },
    { id: 'brand-story', label: '品牌故事' },
    { id: 'purchase', label: '购买' },
    { id: 'contact', label: '联系我们' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <Logo 
            type="icon"
            className="h-24 md:h-32"
            color="#971a07"
          />
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">© {currentYear} 来贺. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 