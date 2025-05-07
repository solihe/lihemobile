import React, { useState, useEffect } from 'react';
// 不再导入图片，直接使用public目录下的路径

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // 验证图片是否存在
    const img = new Image();
    img.src = '/assets/images/hero/main_black.webp';
    img.onerror = () => {
      console.error('Hero image failed to load: /assets/images/hero/main_black.webp');
      setImageError(true);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black py-8">
      {/* 半透明装饰元素 */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      {/* Main Content Area: Centered flex column for product image and title image */}
      <div className="relative container mx-auto px-4 flex flex-col items-center justify-center z-10 py-10">
        
        {/* Product Image Container */}
        <div className="relative w-full max-w-2xl md:max-w-3xl mx-auto mt-8">
          {imageError ? (
            <div className="text-white text-center p-4 bg-red-500/20 rounded">
              <p className="text-xl font-bold mb-4">高端奢华呈现</p>
              <p className="text-lg mb-2">来贺·12987酱香型白酒</p>
              <p className="text-sm opacity-80">精美礼盒装，适合商务宴请与佳节送礼</p>
            </div>
          ) : (
            <img
              src={'/assets/images/hero/main_black.webp'}
              alt="来贺白酒"
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Image load error:', e);
                setImageError(true);
              }}
            />
          )}
        </div>

        {/* Title image - Positioned below the product image */}
        {/* 
          w-[80%]: 设置宽度为父容器的80%
          max-w-md: 最大宽度为中等尺寸（约448px）
          z-30: 设置z-index为30，控制层级
          mt-8: 上边距为2rem (32px)
          mb-10: 下边距为2.5rem (40px)
          如果要往上移动，可以减小mt-8的值，比如改为mt-4或mt-2
        */}
        <div className="w-[80%] max-w-md z-30 -mt-16 mb-2">
          <img
            src={'/assets/images/hero/精彩值得来贺.png'}
            alt="精彩值得来贺"
            className="w-full h-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              const parent = e.target.parentNode;
              const text = document.createElement('div');
              text.className = 'text-white text-2xl font-serif text-center';
              text.innerText = '精彩值得来贺';
              parent.appendChild(text);
            }}
          />
        </div>
        
        {/* 注释掉购买按钮 - This can be uncommented and placed here if needed */}
        {/* 
        <div className="w-48 cursor-pointer transform hover:scale-105 transition-transform duration-300">
          <img
            src={'/assets/images/icons/botton-buy.png'}
            alt="立即购买"
            className="w-full h-auto"
            onClick={() => window.location.href = '#purchase-guide'}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              const parent = e.target.parentNode;
              const button = document.createElement('button');
              button.className = 'bg-gold text-black px-8 py-3 rounded-full text-lg font-medium';
              button.innerText = '立即购买';
              button.onclick = () => window.location.href = '#purchase-guide';
              parent.appendChild(button);
            }}
          />
        </div>
        */}
      </div>
    </section>
  );
};

export default Hero; 