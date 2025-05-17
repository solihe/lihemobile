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
    <div className="flex flex-col items-center justify-center text-center p-8 space-y-6">
      <div className="text-3xl font-serif text-gold mb-6">适用场景</div>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        {/* 商务宴请 */}
        <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center">
          {/* <img src="/assets/images/biz.webp" alt="商务宴请" className="w-16 h-16 rounded mr-3 object-cover" /> */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-gold font-bold">商务宴请</span>
            <div className="text-gray-200 text-sm">尊贵大气，彰显品位</div>
          </div>
        </div>
        {/* 婚庆喜宴 */}
        <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center">
          {/* <img src="/assets/images/scene-wedding.jpg" alt="婚庆喜宴" className="w-16 h-16 rounded mr-3 object-cover" /> */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-gold font-bold">庆贺隆仪</span>
            <div className="text-gray-200 text-sm">喜庆祥和，传递祝福</div>
          </div>
        </div>
        {/* 重要节日 */}
        <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center">
          {/* <img src="/assets/images/scene-festival.jpg" alt="重要节日" className="w-16 h-16 rounded mr-3 object-cover" /> */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-gold font-bold">佳节盛宴</span>
            <div className="text-gray-200 text-sm">欢聚时刻，情谊永存</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;