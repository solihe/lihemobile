// src/components/PurchaseGuide.jsx
import React from 'react';
import DecorativeBorder from './ui/DecorativeBorder';

const PurchaseGuide = () => {
  return (
    <div className="py-12 px-4 bg-black">
      <h2 className="text-2xl font-serif font-bold text-center text-gold mb-8">购买渠道</h2>
      
      <div className="max-w-md mx-auto space-y-8 flex flex-col items-center">
        <div className="space-y-4 w-full flex flex-col items-center">
          <h3 className="text-xl font-serif font-bold text-center text-white">官方旗舰店购买</h3>
          <DecorativeBorder className="p-6 bg-gray-900 w-64 flex flex-col items-center justify-center">
            <a
              href="http://mall.jd.com/index-18477322.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center w-full"
            >
              <img
                src="/assets/images/jd.webp"
                alt="京东Logo"
                className="h-16 w-auto object-contain mb-2"
                loading="lazy"
              />
              <span className="text-white text-lg flex items-center gap-2">
                京东自营店
              </span>
            </a>
          </DecorativeBorder>
        </div>

        <div className="text-center w-full flex flex-col items-center">
          <h3 className="text-xl font-serif font-bold mb-4 text-white">扫码购买</h3>
          <DecorativeBorder className="p-6 bg-gray-900 w-64 flex flex-col items-center justify-center">
            <img
              src="/assets/images/微信小程序.webp"
              alt="小程序二维码"
              className="h-32 w-auto object-contain mb-4"
              loading="lazy"
            />
            <span className="text-white text-lg">官方微信小程序</span>
          </DecorativeBorder>
        </div>
      </div>
    </div>
  );
};

export default PurchaseGuide;