// src/components/PurchaseGuide.jsx
import React from 'react';
import DecorativeBorder from './ui/DecorativeBorder';

const PurchaseGuide = () => {
  return (
    <div className="py-12 px-4 bg-black">
      <h2 className="text-2xl font-serif font-bold text-center text-gold mb-8">购买渠道</h2>
      
      <div className="max-w-md mx-auto space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-center text-white">官方旗舰店购买</h3>
          <div className="grid grid-cols-2 gap-4">
            <DecorativeBorder className="p-4 bg-gray-900">
              <a
                href="#"
                className="flex flex-col items-center"
              >
                <img
                  src="/assets/images/tmall.webp"
                  alt="天猫"
                  className="w-16 h-16 object-contain mb-2"
                  loading="lazy"
                />
                <span className="text-white">天猫官方旗舰店</span>
              </a>
            </DecorativeBorder>
            <DecorativeBorder className="p-4 bg-gray-900">
              <a
                href="#"
                className="flex flex-col items-center"
              >
                <img
                  src="/assets/images/jd.webp"
                  alt="京东"
                  className="w-16 h-16 object-contain mb-2"
                  loading="lazy"
                />
                <span className="text-white">京东自营店</span>
              </a>
            </DecorativeBorder>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-serif font-bold mb-4 text-white">扫码购买</h3>
          <DecorativeBorder className="inline-block p-4 bg-gray-900">
            <img
              src="/assets/images/qrcode.webp"
              alt="小程序二维码"
              className="w-32 h-32 mx-auto"
              loading="lazy"
            />
            <p className="mt-2 text-white">官方微信小程序</p>
          </DecorativeBorder>
        </div>
      </div>
    </div>
  );
};

export default PurchaseGuide;