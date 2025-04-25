// src/components/QualityCrafts.jsx
import React, { useState } from 'react';
import DecorativeBorder from './ui/DecorativeBorder';

const craftSections = [
  {
    title: "12987酱香工艺",
    content: "一年酿造，九次蒸煮，八次发酵，七次取酒"
  },
  {
    title: "原料甄选",
    content: "优质五谷，传统纯粮，零添加勾兑"
  },
  {
    title: "印章酒冠",
    content: "名贵实木，精工雕刻，尊享品质"
  }
];

const QualityCrafts = () => {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-black to-gray-900">
      <h2 className="text-2xl font-serif font-bold text-center text-gold mb-8">品质工艺</h2>
      <div className="space-y-4">
        {craftSections.map((section, index) => (
          <DecorativeBorder
            key={index}
            className="bg-gray-900 overflow-hidden"
          >
            <button
              className="w-full p-4 text-left flex justify-between items-center text-white"
              onClick={() => setOpenSection(openSection === index ? null : index)}
            >
              <span className="font-serif text-gold">{section.title}</span>
              <span className={`transform transition-transform duration-300 text-gold ${
                openSection === index ? 'rotate-180' : ''
              }`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSection === index ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="p-4 border-t border-gray-800 text-gray-300">
                {section.content}
              </div>
            </div>
          </DecorativeBorder>
        ))}
      </div>
    </div>
  );
};

export default QualityCrafts;