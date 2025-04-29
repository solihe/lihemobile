import React, { useState, useEffect } from 'react';
// 不再导入图片，直接使用public目录下的路径

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // 验证图片是否存在
    const img = new Image();
    img.src = '/assets/images/hero/productmain.png';
    img.onerror = () => {
      console.error('Hero image failed to load: /assets/images/hero/productmain.png');
      setImageError(true);
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-[#4A0404] py-8">
      {/* 半透明装饰元素 */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      {/* Product Image Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-[85%] md:max-w-[75%] lg:max-w-[65%] aspect-[3/4] mx-auto">
          {imageError ? (
            <div className="text-white text-center p-4 bg-red-500/20 rounded">
              <p className="text-xl font-bold mb-4">高端奢华呈现</p>
              <p className="text-lg mb-2">来贺·12987酱香型白酒</p>
              <p className="text-sm opacity-80">精美礼盒装，适合商务宴请与佳节送礼</p>
            </div>
          ) : (
            <img
              src={'/assets/images/hero/productmain.png'}
              alt="来贺白酒"
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Image load error:', e);
                setImageError(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col z-20">
        {/* 顶部留白减少 */}
        <div className="h-[15vh]"></div>
        
        {/* 中间内容区域 */}
        <div className="flex-grow"></div>
        
        {/* 底部内容 - 减少mt-auto的效果 */}
        <div className="w-full pb-8">
          <div className="relative">
            {/* Content */}
            <div className="relative container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center">
                  {/* Title image */}
                  <div className="w-[80%] max-w-md z-30 mb-10">
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
                  {/* Purchase button image */}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 