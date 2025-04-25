# 来贺官网重构实施方案

## 1. 首屏设计（情感导入）

### 互动式闪卡系统

#### 序列一：社交困境（自动播放，3秒/张）
1. 「又是一桌无言的觥筹」
   - 暗色调餐桌场景
   - 低头刷手机的人们

2. 「精心准备的心意，转眼就被遗忘」
   - 办公室角落的礼品堆积
   - 略显失落的送礼者

3. 「原来，分享故事如此自然」
   - 宾主共同欣赏精致器物
   - 温暖的互动场景

4. 「这一刻，永远被铭记」
   - 印记留念的温馨时刻
   - 愉悦的交谈氛围

#### 序列二：重要场合（可选播放）
1. 「重要的日子，想送上最好的祝福」
2. 「一份心意，一段永恒的记忆」
3. 「让每次相聚，都值得纪念」

### 交互设计
- 轻触暂停/播放
- 左右滑动切换系列
- 向下滑动深入了解

## 2. 内容层级

### 第一层：情感共鸣
- 社交场景演绎
- 互动体验展示
- 温暖记忆定格

### 第二层：优雅仪式
- 精致器物呈现
- 互动体验展示
- 回忆定格瞬间

### 第三层：匠心品质
- 精选材质
- 传统工艺
- 品质保证

## 3. 页面结构

### 3.1 首屏区域

#### HTML结构参考
```
<section class="h-screen relative overflow-hidden">
  <!-- 情感闪卡轮播 -->
  <div class="flash-cards-carousel relative h-full">
    <!-- 闪卡1：社交困境 -->
    <div class="absolute inset-0 transition-opacity duration-1000">
      <div class="relative h-full bg-gradient-to-b from-black/60 to-black/30">
        <img src="/images/scene1.jpg" class="object-cover h-full w-full" loading="eager">
        <div class="absolute inset-0 flex items-center justify-center text-white text-center">
          <h2 class="text-3xl font-medium max-w-md mx-auto leading-relaxed">又是一桌无言的觥筹</h2>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 引导按钮 -->
  <button class="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/30 transition-colors duration-300">
    探索更多
  </button>
</section>
```

### 3.2 场景展示
- 商务礼赠场景
- 喜庆宴请场景
- 重要节日场景

### 3.3 品质展示
- 材质特写
- 工艺展示
- 品质保证

## 4. 转化路径

### 4.1 自然引导
1. 情感共鸣
2. 场景认同
3. 解决方案
4. 品质确认
5. 购买决策

### 4.2 互动触点
- 温和咨询入口
- 场景化购买按钮
- 优雅社交分享

## 5. 技术实现

### 5.1 性能优化
- 图片资源预加载
- 渐进式加载策略
- 动画性能优化

### 5.2 代码结构参考
```
// Flash Cards Component
const FlashCards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const cards = [
    {
      image: '/images/scene1.jpg',
      text: '又是一桌无言的觥筹',
      emotion: 'awkward'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flash-cards relative h-screen">
      {cards.map((card, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
        >
          {/* Card content */}
        </div>
      ))}
    </div>
  );
};
```

## 6. 评估指标

### 6.1 体验指标
- 闪卡完整观看率
- 页面深度滚动率
- 场景内容互动率

### 6.2 转化指标
- 咨询点击率
- 购买按钮点击率
- 最终转化率

## 7. 后续优化

### 7.1 短期优化
- 闪卡内容迭代
- 交互体验优化
- 加载性能提升

### 7.2 长期规划
- 用户故事积累
- 场景化内容扩充
- 社交传播体系建设