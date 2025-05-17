// src/components/BrandStory.jsx
import React from 'react';
import DecorativeBorder from './ui/DecorativeBorder';

const BrandStory = () => {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif text-center text-gold mb-12">品牌故事</h2>
        
        <div className="flex flex-col items-center justify-center text-center p-8 space-y-6">
          {/* 主张卡片 */}
          <div className="bg-black/60 rounded-xl shadow-lg px-6 py-4 border border-gold max-w-xs">
            <span className="text-lg text-gold font-bold">来贺</span>
            <div className="text-base text-gray-100 mt-2">让每一次相聚都被看见、被记住</div>
          </div>

          {/* 三点卡片 */}
          <div className="flex flex-col space-y-4 w-full max-w-xs">
            <div className="bg-gray-800 rounded-lg px-4 py-3 text-center">
              <span className="text-gold font-bold">好喝</span>
              <div className="text-gray-200">匠心酿造，品质是社交白酒的根本。</div>
            </div>
            <div className="bg-gray-800 rounded-lg px-4 py-3 text-center">
              <span className="text-gold font-bold">好看</span>
              <div className="text-gray-200">独特设计，第一眼就能引起关注。</div>
            </div>
            <div className="bg-gray-800 rounded-lg px-4 py-3 text-center">
              <span className="text-gold font-bold">好玩</span>
              <div className="text-gray-200">互动体验，让朋友记住你的每一次用心。</div>
            </div>
          </div>

          {/* 结尾升华 */}
          {/* <div className="text-base text-gray-300 mt-4">
            来贺，不只是白酒，更是每一次相聚的美好记忆。
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BrandStory;