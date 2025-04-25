// src/components/BrandStory.jsx
import React from 'react';
import DecorativeBorder from './ui/DecorativeBorder';

const BrandStory = () => {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif text-center text-gold mb-12">品牌故事</h2>
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed">
            来贺，首个社交功能性白酒品牌，深谙人们在社交场景中渴望"被看见、被记住"的核心需求。
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            来贺，不仅仅是一款白酒，更是连接彼此的桥梁，是宴会上的破冰神器，是你的社交名片。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DecorativeBorder className="bg-gray-900 p-8 min-h-[400px] flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-20 h-20 mb-6">
              <img src="/assets/images/brand-story/heritage-1.jpg" alt="传承" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-serif text-gold mb-4">品质传承</h3>
            <p className="text-gray-300 mb-4">让每一次相聚更有品质</p>
            <p className="text-gray-400">
              传承千年酿酒智慧，以匠心致敬每一次相聚。我们相信，优质的品质是让相聚更有意义的基石，是让欢聚更值得期待的保证。
            </p>
          </DecorativeBorder>

          <DecorativeBorder className="bg-gray-900 p-8 min-h-[400px] flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-20 h-20 mb-6">
              <img src="/assets/images/brand-story/cultural-heritage.jpg" alt="连接" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-serif text-gold mb-4">情感连接</h3>
            <p className="text-gray-300 mb-4">让每一次相遇更有温度</p>
            <p className="text-gray-400">
              我们深知社交中"被看见、被记住"的珍贵。来贺致力于打造自然流畅的社交体验，让每个人都能在交流中展现真实的自己。
            </p>
          </DecorativeBorder>

          <DecorativeBorder className="bg-gray-900 p-8 min-h-[400px] flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-20 h-20 mb-6">
              <img src="/assets/images/brand-story/history-1.jpg" alt="故事" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-serif text-gold mb-4">珍贵回忆</h3>
            <p className="text-gray-300 mb-4">所有精彩值得来贺</p>
            <p className="text-gray-400">
              比酒更浓烈的是你的故事，把这些故事写成贺卡，盖上印章，分享、收藏。
            </p>
          </DecorativeBorder>
        </div>
      </div>
    </div>
  );
};

export default BrandStory;