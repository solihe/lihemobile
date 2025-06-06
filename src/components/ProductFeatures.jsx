// src/components/ProductFeatures.jsx
import React from 'react';
import DecorativeBorder from './ui/DecorativeBorder';

const features = [
  {
    title: '社交功能性白酒',
    subtitle: '让饭局社交更有趣',
    description: '独创印章互动，开启自然交流',
    image: 'https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/feature1.webp',
  },
  {
    title: '12987酱香工艺',
    subtitle: '香久味醇，醒酒快不上头',
    description: '一年匠心酿造，成就极致品质',
    image: 'https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/feature2.webp',
  },
  {
    title: '匠心设计美学',
    subtitle: '每个细节，都是考究',
    description: '开盒见礼仪，处处有惊喜',
    image: 'https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/feature3.webp',
  },
];

const ProductFeatures = () => {
  return (
    // 产品特性模块容器，设置渐变背景和上下内边距
    <div className="pt-2 pb-12 px-4 bg-gradient-to-b from-[#0a0a0a] to-black">
      {/* 顶部装饰性分隔线，用于视觉连接 */}
      {/* <div className="w-full flex justify-center mb-8">
        <div className="w-1 h-16 bg-gradient-to-b from-[#4A0404] to-gold-light/30"></div>
      </div> */}
      
      {/* 模块标题 */}
      <h2 className="text-3xl font-serif font-bold text-center text-gold mb-12">产品特性</h2>
      
      {/* 特性卡片水平滚动容器 */}
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 gap-6 scrollbar-none">
        {/* 遍历features数组生成特性卡片 */}
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[320px] snap-center overflow-hidden tilt-effect"
          >
            {/* 使用DecorativeBorder组件包裹卡片内容 */}
            <DecorativeBorder className="p-4 bg-gray-900">
              {/* 特性图片 */}
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                loading="lazy"
              />
              {/* 特性文字内容 */}
              <div className="text-center text-white">
                <h3 className="text-xl font-serif font-bold text-gold mb-2">{feature.title}</h3>
                <p className="text-gray-200 mb-2">{feature.subtitle}</p>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </DecorativeBorder>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeatures;