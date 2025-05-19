import React, { useState, useEffect } from 'react';
// 不再导入图片，直接使用public目录下的路径

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // 验证图片是否存在
    const img = new Image();
    img.src = 'https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/hero/main_black.webp';
    img.onerror = () => {
      console.error('Hero image failed to load: https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/hero/main_black.webp');
      setImageError(true);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black flex flex-col justify-center items-center">
      {/* 半透明装饰元素 */}
      <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none"></div>
      
      {/* Main Content Area: Centered flex column for product image and title image */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center z-10 gap-2 px-4">
        {/* Product Image Container */}
        <div className="relative w-full max-w-2xl md:max-w-3xl mx-auto">
          {imageError ? (
            <div className="text-white text-center p-4 bg-red-500/20 rounded">
              <p className="text-xl font-bold mb-4">高端奢华呈现</p>
              <p className="text-lg mb-2">来贺·12987酱香型白酒</p>
              <p className="text-sm opacity-80">精美礼盒装，适合商务宴请与佳节送礼</p>
            </div>
          ) : (
            <img
              src={'https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/hero/main_black.webp'}
              alt="来贺白酒"
              className="w-full h-auto max-h-[60vh] object-contain"
              onError={(e) => {
                console.error('Image load error:', e);
                setImageError(true);
              }}
            />
          )}
        </div>

        {/* Title image - Positioned below the product image */}
        <div className="w-[80%] max-w-md z-30">
          <img
            src={'https://ilihe.oss-cn-beijing.aliyuncs.com/assets/images/hero/精彩值得来贺.png'}
            alt="精彩值得来贺"
            className="w-full h-auto max-h-[20vh]"
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
      </div>
    </section>
  );
};

export default Hero; 