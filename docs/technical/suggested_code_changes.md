# 导航逻辑修改建议

为了实现"首页"菜单项严格指向主内容首页(Hero.jsx)而非引导页，需要对App.jsx中的导航逻辑代码进行修改。以下是建议的代码变更：

## 1. 修改菜单项函数绑定

```jsx
// 当前代码
<nav className="flex flex-col items-center space-y-8">
  <button onClick={() => scrollToTop()} className="text-white text-2xl hover:text-gold-light transition-colors">首页</button>
  <button onClick={showBrandStoryCards} className="text-white text-2xl hover:text-gold-light transition-colors">品牌故事卡</button>
  <button onClick={() => scrollToSection('brand-story')} className="text-white text-2xl hover:text-gold-light transition-colors">品牌故事</button>
  <!-- 其他菜单项 -->
</nav>

// 修改为
<nav className="flex flex-col items-center space-y-8">
  <button onClick={() => scrollToSection('home')} className="text-white text-2xl hover:text-gold-light transition-colors">首页</button>
  <button onClick={showBrandStoryCards} className="text-white text-2xl hover:text-gold-light transition-colors">品牌故事卡</button>
  <button onClick={() => scrollToSection('brand-story')} className="text-white text-2xl hover:text-gold-light transition-colors">品牌故事</button>
  <!-- 其他菜单项 -->
</nav>
```

## 2. 添加scrollToHomeSection函数

```jsx
// 新增函数
const scrollToHomeSection = () => {
  // 保持在主内容区域
  setIsHeroSectionActive(false);
  // 滚动到主内容首页
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

## 3. 修改悬浮按钮功能

```jsx
// 当前代码
<FloatingButton
  onClick={scrollToTop}
  icon="↑"
  label="返回顶部"
/>

// 修改为
<FloatingButton
  onClick={scrollToHomeSection}
  icon="↑"
  label="返回顶部"
/>
```

## 4. 保留但修改scrollToTop函数

```jsx
// 修改为仅在需要显示闪卡时使用
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setIsHeroSectionActive(true);
};
```

## 5. 完整实现逻辑

下面的伪代码展示了如何实现不同导航功能：

```jsx
// 1. 显示主内容首页(Hero.jsx)
scrollToSection('home') {
  // 确保闪卡页隐藏
  setIsHeroSectionActive(false);
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. 显示引导页闪卡(HeroSection.jsx)
showBrandStoryCards() {
  // 关闭菜单
  setIsMenuOpen(false);
  // 显示闪卡页
  setIsHeroSectionActive(true);
  // 重置闪卡状态
  setHeroKey(prevKey => prevKey + 1);
  // 重置滚动位置
  window.scrollTo({ top: 0, behavior: 'auto' });
}

// 3. 从顶部返回主内容首页
scrollToHomeSection() {
  // 保持在主内容区
  setIsHeroSectionActive(false);
  // 平滑滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
```

通过这些修改，网站导航将符合以下规则：
1. "首页"菜单项严格指向主内容首页(Hero.jsx)
2. "品牌故事卡"菜单项指向引导页闪卡(HeroSection)
3. 悬浮"返回顶部"按钮将用户带回主内容首页，而非引导页
4. 避免重复指向，确保每个导航选项都有明确的唯一目标 