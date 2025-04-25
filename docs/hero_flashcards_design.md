# 来贺白酒全屏Hero闪卡设计方案

## 设计概念

全屏Hero闪卡展示区通过四个精心设计的场景，展现从社交困境到完美解决方案的情感转变历程。每个场景都经过专业设计和优化，确保视觉效果的连贯性和故事性，同时增强品牌与用户的情感连接。

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

#### 闪卡1：饭局场景
- **图片素材**：`/assets/images/flashcards/饭局.png`
- **场景描述**：现代商务餐厅环境，展现社交场合中的微妙氛围
- **文案**：「饭局之上，话未出口」
- **视觉特点**：
  - 暖色灯光映衬下的餐桌场景
  - 人物表情和姿态传达社交压力
  - 画面构图突出社交场景的紧张感
- **过渡效果**：渐隐渐现（fade），配合轻微模糊转清晰，3秒停留

#### 闪卡2：礼物场景
- **图片素材**：`/assets/images/flashcards/礼物.png`
- **场景描述**：精致礼品陈列，突显送礼困扰，未开封的茅台和五粮液隐约可见
- **文案**：「礼物之中，心意难表」
- **视觉特点**：
  - 高级礼品的精致陈列
  - 画面构图强调礼物的价值感
  - 色调处理突出高端感和压力感
- **过渡效果**：左右滑动（slide）配合景深变化，3秒停留

#### 闪卡3：渴望场景
- **图片素材**：`/assets/images/flashcards/渴望.png`
- **场景描述**：展现人们内心渴望被理解、被认可的情感
- **文案**：「内心渴望，期待共鸣」
- **视觉特点**：
  - 人物特写突出情感表达
  - 光影处理营造情感氛围
  - 画面构图强调人物内心世界
- **过渡效果**：缩放聚焦（zoom）配合光效渐变，4秒停留

#### 闪卡4：来贺方案
- **图片素材**：`/assets/images/flashcards/来贺方案.png`
- **场景描述**：展现来贺白酒带来的完美社交解决方案
- **文案**：「来贺之时，心意自现」
- **视觉特点**：
  - 产品与场景的完美融合
  - 温暖明亮的氛围营造
  - 画面构图突出品牌价值
- **过渡效果**：优雅淡出（elegant fade）配合景深变化，5秒停留

## 交互设计优化

### 过渡效果增强
```typescript
const transitions = {
  fade: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(8px)' },
    transition: { duration: 0.8 }
  },
  slide: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.8, ease: 'easeInOut' }
  },
  zoom: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.8 }
  },
  elegantFade: {
    initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(4px)' },
    transition: { duration: 1 }
  }
};
```

### 响应式优化
```typescript
const useResponsiveLayout = () => {
  const [layout, setLayout] = useState({
    textPosition: 'bottom',
    fontSize: 'text-2xl',
    padding: 'px-4'
  });

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth >= 1024) {
        setLayout({
          textPosition: 'center',
          fontSize: 'text-5xl',
          padding: 'px-12'
        });
      } else if (window.innerWidth >= 768) {
        setLayout({
          textPosition: 'center',
          fontSize: 'text-4xl',
          padding: 'px-8'
        });
      }
    };

    window.addEventListener('resize', updateLayout);
    updateLayout();
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return layout;
};
```

## 技术实现核心代码

```typescript
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const flashCards = [
  {
    id: 1,
    image: '/assets/images/flashcards/饭局.png',
    text: '饭局之上，话未出口',
    duration: 3000,
    transition: 'fade'
  },
  {
    id: 2,
    image: '/assets/images/flashcards/礼物.png',
    text: '礼物之中，心意难表',
    duration: 3000,
    transition: 'slide'
  },
  {
    id: 3,
    image: '/assets/images/flashcards/渴望.png',
    text: '内心渴望，期待共鸣',
    duration: 4000,
    transition: 'zoom'
  },
  {
    id: 4,
    image: '/assets/images/flashcards/来贺方案.png',
    text: '来贺之时，心意自现',
    duration: 5000,
    transition: 'elegantFade'
  }
];

const HeroFlashCards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const layout = useResponsiveLayout();
  
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

  return (
    <section className="hero-flashcards fixed inset-0 w-screen h-screen overflow-hidden z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={flashCards[currentCard].id}
          {...transitions[flashCards[currentCard].transition]}
          className="relative w-full h-full"
          onClick={() => setIsPaused(!isPaused)}
        >
          {/* 背景图片 */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${flashCards[currentCard].image})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          {/* 文案 */}
          <motion.div 
            className={`absolute inset-0 flex items-${layout.textPosition} justify-center ${layout.padding}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className={`${layout.fontSize} text-white font-medium text-center max-w-3xl leading-relaxed`}>
              {flashCards[currentCard].text}
            </h2>
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

## 视觉风格优化

### 图片处理建议
- 确保所有图片都经过适当压缩，保持高质量的同时优化加载性能
- 建议图片尺寸：
  - 桌面端：1920 x 1080px
  - 平板端：1024 x 768px
  - 移动端：750 x 1334px
- 所有图片添加适度的暗角处理，增强文字可读性
- 考虑使用 `next/image` 组件进行图片优化

### 动画细节优化
- 每个场景的过渡效果都经过精心设计，与场景内容呼应
- 文字动画采用独立的动画时间线，确保清晰可读
- 探索按钮的出现采用优雅的淡入效果，不打断用户观看体验

## 性能优化建议

1. 图片预加载
```typescript
const preloadImages = () => {
  flashCards.forEach(card => {
    const img = new Image();
    img.src = card.image;
  });
};

useEffect(() => {
  preloadImages();
}, []);
```

2. 动画性能优化
```typescript
const optimizedMotion = {
  willChange: 'transform, opacity',
  translateZ: 0,
};
```

3. 响应式图片加载
```typescript
const getImagePath = (imageName: string) => {
  const width = window.innerWidth;
  if (width >= 1024) {
    return `/assets/images/flashcards/desktop/${imageName}`;
  } else if (width >= 768) {
    return `/assets/images/flashcards/tablet/${imageName}`;
  }
  return `/assets/images/flashcards/mobile/${imageName}`;
};
```

## 总结

基于提供的四张专业设计闪卡素材，我们优化了整体设计方案，强化了视觉效果和交互体验。新的设计方案更好地展现了从社交困境到完美解决方案的情感转变过程，通过精心设计的过渡效果和响应式优化，确保了在各种设备上都能提供出色的用户体验。同时，我们也注重了性能优化，确保了流畅的播放效果。 