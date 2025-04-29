# 来贺白酒网站结构文档

## 概述

来贺白酒网站采用单页应用(SPA)设计，由两个主要层级组成：引导页(闪卡展示)和主内容区。这种结构提供了丰富的用户体验，但也需要清晰的组织以避免开发和维护中的混淆。本文档规范了网站的结构、各页面的命名以及它们之间的关系。

## 核心结构

网站的核心布局由两个主要层组成，通过状态控制它们的可见性：

```
App.jsx
├── HeroSection.jsx (isHeroSectionActive = true 时显示)
└── 主内容区 (isHeroSectionActive = false 时显示)
    ├── Hero.jsx (首页内容)
    ├── ProductFeatures.jsx
    ├── ProductShowcase.jsx
    ├── BrandStory.jsx
    └── 其他组件...
```

## 重要概念澄清

为避免混淆，特此明确定义以下概念：

1. **引导页(HeroSection)**：
   - 文件：`src/components/HeroSection.jsx`
   - 描述：网站加载时首先显示的闪卡序列，介绍品牌故事
   - 状态：`isHeroSectionActive = true` 时显示
   - 触发显示：初始加载、点击菜单中的"品牌故事卡"按钮

2. **主内容首页(Hero)**：
   - 文件：`src/components/Hero.jsx`
   - 描述：闪卡序列结束后显示的主要产品展示页面
   - 显示条件：`isHeroSectionActive = false` 且滚动位置在顶部
   - 内容：产品主图(红色瓶子)和品牌标语"精彩值得来贺"
   - 菜单指向：菜单中的"首页"项严格指向此组件

## 页面流转逻辑

### 初始加载流程

1. 应用加载，`App.jsx` 初始化
2. `isHeroSectionActive` 设为 `true`
3. 显示引导页(HeroSection)
4. 用户完成闪卡浏览或点击"跳过"
5. 调用 `handleHeroSectionComplete()`
6. `isHeroSectionActive` 设为 `false`
7. 隐藏引导页，显示主内容区，从 Hero.jsx 开始展示

### 导航逻辑

网站导航通过以下函数实现：

1. **scrollToSection('home')**
   - 功能：导航到主内容首页(Hero.jsx)
   - 触发：点击菜单中的"首页"
   - 实现：设置 `isHeroSectionActive = false` 并滚动到 home 区域

2. **showBrandStoryCards()**
   - 功能：显示品牌故事卡片
   - 触发：点击菜单中的"品牌故事卡"
   - 实现：设置 `isHeroSectionActive = true` 并重置 HeroSection

3. **scrollToSection(sectionId)**
   - 功能：滚动到指定内容区域
   - 触发：点击菜单中的各个内容区域链接
   - 实现：设置 `isHeroSectionActive = false` 并滚动到对应区域
   
4. **scrollToHomeSection()**
   - 功能：返回到主内容首页(Hero.jsx)
   - 触发：点击悬浮返回顶部按钮
   - 实现：保持 `isHeroSectionActive = false` 并滚动到页面顶部

## 主内容区域结构

主内容区按以下顺序组织各个组件：

1. **首页内容(Hero)**
   - ID: `home`
   - 组件: `Hero.jsx`
   - 主要元素:
     - 产品主图(红瓶)
     - 品牌标语"精彩值得来贺"(使用mt-80下移防止遮挡产品)
     - 立即购买按钮(已注释掉)

2. **产品特点(ProductFeatures)**
   - ID: `product-features`
   - 组件: `ProductFeatures.jsx`

3. **产品展示(ProductShowcase)**
   - ID: `product-showcase`
   - 组件: `ProductShowcase.jsx`

4. **品牌故事(BrandStory)**
   - ID: `brand-story`
   - 组件: `BrandStory.jsx`

5. **互动体验(InteractiveExperience)**
   - 组件: `InteractiveExperience.jsx`

6. **使用场景(UseCases)**
   - 组件: `UseCases.jsx`

7. **用户评价(Testimonials)**
   - 组件: `Testimonials.jsx`

8. **品质工艺(QualityCrafts)**
   - 组件: `QualityCrafts.jsx`

9. **购买指南(PurchaseGuide)**
   - ID: `purchase-guide`
   - 组件: `PurchaseGuide.jsx`

10. **联系我们(Contact)**
    - ID: `contact`

## 全局组件

以下组件在整个应用中可见：

1. **菜单按钮(MenuButton)**
   - 位置：右上角
   - 功能：控制全局菜单的显示/隐藏

2. **全局菜单**
   - 显示条件：点击菜单按钮
   - 内容：网站各主要区域的导航链接

3. **滚动进度条(ScrollProgress)**
   - 功能：显示页面滚动进度

4. **悬浮返回顶部按钮(FloatingButton)**
   - 功能：点击后返回到主内容首页(Hero.jsx)
   - 实现：调用 scrollToHomeSection()

## 修改指南

在修改网站内容时，请遵循以下原则：

1. **页面命名一致性**：
   - 始终使用本文档中定义的页面名称
   - 明确区分"引导页(HeroSection)"和"主内容首页(Hero)"
   - "首页"菜单项必须严格指向主内容首页(Hero.jsx)

2. **修改闪卡内容**：
   - 修改 `HeroSection.jsx` 中的 `flashCards` 数组

3. **修改主内容首页**：
   - 修改 `Hero.jsx` 组件，注意图片位置和布局

4. **添加新内容区域**：
   - 在 `App.jsx` 的主内容区添加新组件
   - 更新本文档和 `website_structure.json`

5. **修改导航菜单**：
   - 在 `App.jsx` 中的菜单导航部分进行修改
   - 同步更新 `website_structure.json` 中的导航信息
   - 确保菜单指向没有重复，每个菜单项指向唯一的内容区域

## 文档维护

本文档应与代码保持同步。每当进行以下操作时，请更新此文档：

1. 添加、删除或重命名组件
2. 修改页面流转逻辑
3. 更改组件的主要功能或显示条件

最后更新: 2025-04-19 