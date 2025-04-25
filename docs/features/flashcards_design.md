# 来贺白酒全屏Hero闪卡设计方案

## 设计概念

全屏Hero闪卡展示区设计通过强烈的视觉冲击和情感共鸣，增强品牌与用户的情感连接。闪卡序列结束后，会优雅地呈现浏览按钮，引导用户继续探索。

## 视觉设计方案

### 全屏闪卡结构

```jsx
<section className="hero-flashcards fixed inset-0 w-screen h-screen overflow-hidden z-50">
  {/* 闪卡序列 */}
  <div className="cards-container relative w-full h-full">
    {/* 各个闪卡内容 */}
  </div>
  
  {/* 探索按钮 - 初始隐藏，闪卡结束后显示 */}
  <div className="explore-button-container absolute bottom-10 left-0 right-0 opacity-0 transition-opacity duration-1000">
    <button className="mx-auto block px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
      探索来贺世界
    </button>
  </div>
</section>
```

### 闪卡序列设计

#### 闪卡1：社交困境（痛点）
- **全屏背景**：高级商务餐厅，灯光昏暗
- **画面主体**：几位商务人士低头看手机，氛围尴尬
- **文案**：「又一场无话可说的饭局」
- **视觉效果**：暗色调，轻微模糊，突显社交焦虑
- **过渡**：渐隐效果，3秒停留

#### 闪卡2：礼物困境（痛点）
- **全屏背景**：办公室角落或家中储物柜
- **画面主体**：堆积的礼盒，可见未拆封的茅台和五粮液
- **文案**：「标配的礼物，记不住都是谁的心意」
- **视觉效果**：偏冷色调，侧重细节，突显遗憾情绪
- **过渡**：横向滑动，3秒停留

#### 闪卡3：转折时刻（价值主张）
- **全屏背景**：精致的酒会或重要场合
- **画面主体**：聚餐的场景，主人在说话，但是客人们却在低头玩手机；    
 气泡显示主人内心OS.   <h1>每个人都渴望<span style="color:red">「被看见」</span></h1>
- **文案**：「每个人都渴望被看见」
- **视觉效果**：暖色调渐入，突出印记特写，画面清晰度提高
- **过渡**：放大过渡，4秒停留



#### 闪卡4：解决方案（价值主张）
- **全屏背景**：欢声笑语的聚会场景
- **画面主体**：来贺酒冠、贺卡、印泥组合使用特写
- **文案**：<h1>「<span style="color:red">来贺</span>」，让你的每一次宴请都印象深刻
   让你送出的每一份礼物都独一无二」</h1>
- **视觉效果**：明亮温暖，高清晰度，突显品牌情感
- **过渡**：淡出后显示探索按钮，5秒停留

## 交互设计

### 过渡效果
- 每张闪卡之间采用不同过渡效果（渐变、滑动、缩放）增强视觉冲击
- 文案采用渐入效果，与画面分开动画处理
- 最后一张闪卡结束后，背景轻微模糊，探索按钮淡入

### 用户控制
- 支持轻触屏幕暂停/继续自动播放
- 左右滑动可手动切换闪卡
- 探索按钮添加悬停效果和微小放大动画

### 响应式适配
- 移动端：全屏垂直设计，文案位置调整为底部
- 平板/桌面端：保持画面比例，文案位置居中或侧边
- 确保文案在各种设备上清晰可读

## 技术实现建议

```typescript
// 使用 React、Framer Motion 和 Tailwind CSS 实现

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const flashCards = [
  {
    id: 1,
    background: '/images/awkward-dinner.jpg',
    text: '又一场无话可说的饭局',
    duration: 3000,
    transition: 'fade',
    color: 'dark'
  },
  {
    id: 2,
    background: '/images/forgotten-gifts.jpg',
    text: '精心准备的礼物，转眼就被遗忘',
    duration: 3000,
    transition: 'slide',
    color: 'cool'
  },
  {
    id: 3,
    background: '/images/ritual-moment.jpg',
    text: '一个仪式，打开话匣子',
    duration: 4000,
    transition: 'zoom',
    color: 'warm'
  },
  {
    id: 4,
    background: '/images/joyful-moment.jpg',
    text: '所有精彩，值得来贺',
    duration: 5000,
    transition: 'fade',
    color: 'bright'
  }
];

const HeroFlashCards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  
  // 自动播放逻辑
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setTimeout(() => {
      if (currentCard < flashCards.length - 1) {
        setCurrentCard(currentCard + 1);
      } else {
        setShowExplore(true);
      }
    }, flashCards[currentCard].duration);
    
    return () => clearTimeout(timer);
  }, [currentCard, isPaused]);
  
  // 闪卡交互处理
  const handleCardClick = () => {
    setIsPaused(!isPaused);
  };
  
  const handleSwipe = (direction) => {
    if (direction === 'left' && currentCard < flashCards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else if (direction === 'right' && currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };
  
  return (
    <section className="hero-flashcards fixed inset-0 w-screen h-screen overflow-hidden z-50">
      {/* 闪卡容器 */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={flashCards[currentCard].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full"
          onClick={handleCardClick}
        >
          {/* 背景图片 */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${flashCards[currentCard].background})` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 ${flashCards[currentCard].color === 'dark' ? 'opacity-70' : 'opacity-40'}`}></div>
          </div>
          
          {/* 文案 */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl text-white font-medium text-center max-w-3xl leading-relaxed">{flashCards[currentCard].text}</h2>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* 探索按钮 */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showExplore ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <button className="mx-auto inline-block px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
          探索来贺世界
        </button>
      </motion.div>
    </section>
  );
};

export default HeroFlashCards;
```

## 视觉风格建议

### 色彩处理
- 从暗沉到明亮的渐进式视觉效果，象征社交困境到完美解决的情感转变
- 前两张闪卡采用冷色调处理，后两张闪卡逐渐转为暖色调
- 确保在深色背景上的文字具有足够的对比度

### 图片处理
- 全屏高质量图片，分辨率满足不同设备需求
- 适当添加渐变遮罩，确保文字清晰可读
- 考虑图片的焦点位置，确保在不同设备上核心元素保持可见

### 动画细节
- 文字动画与背景分离，增强层次感
- 过渡效果要流畅自然，避免生硬切换
- 探索按钮的出现应当优雅而不突兀

## 总结

这个全屏Hero闪卡设计通过四张精心设计的情感闪卡，以强烈的视觉冲击力传达从社交困境到完美解决方案的转变过程，有效增强品牌与用户的情感连接。闪卡序列遵循"痛点-解决方案-品牌价值"的逻辑，最终自然引导用户深入探索来贺白酒的世界。

流畅的过渡效果、精心设计的视觉风格和交互体验，将共同打造一个令人印象深刻的首屏体验，让用户从一开始就对来贺品牌产生强烈的情感共鸣。 