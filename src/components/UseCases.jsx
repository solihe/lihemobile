// src/components/UseCases.jsx
import React from 'react';
import DecorativeBorder from './ui/DecorativeBorder';

const cases = [
  {
    title: '商务宴请',
    series: '玄冠系列',
    description: '让社交更自然',
    image: 'https://img0.baidu.com/it/u=3926156041,1190073021&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    subtitle: '尊贵大气，彰显品位'
  },
  {
    title: '婚庆喜宴',
    series: '朱冠系列',
    description: '让祝福更特别',
    image: 'https://img2.baidu.com/it/u=2805638546,1360940384&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    subtitle: '喜庆祥和，传递祝福'
  },
  {
    title: '重要节日',
    series: '双冠可选',
    description: '让团圆更温馨',
    image: 'https://img1.baidu.com/it/u=3012150077,1539895642&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    subtitle: '欢聚时刻，情谊永存'
  },
];

const UseCases = () => {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
      <h2 className="text-3xl font-serif font-bold text-center text-gold mb-12">适用场景</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {cases.map((item, index) => (
          <div
            key={index}
            className="transform transition-all duration-500 hover:scale-105"
          >
            <DecorativeBorder className="bg-gray-900 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-serif font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-gold mb-2">{item.series}</p>
                <p className="text-gray-400">{item.subtitle}</p>
                <p className="text-white/80 mt-2">{item.description}</p>
              </div>
            </DecorativeBorder>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCases;