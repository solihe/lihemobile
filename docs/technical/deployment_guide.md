# Vercel 部署指南

## 1. 项目结构调整

### 1.1 基础配置
项目中的 `vercel.json` 配置如下：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### 1.2 依赖检查
确保 `package.json` 包含以下必要依赖：

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "framer-motion": "^10.0.0",
    "tailwindcss": "^3.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0"
  }
}
```

### 1.3 配置文件检查
确保项目根目录包含以下配置文件：

1. `tailwind.config.js`
2. `postcss.config.js`
3. `tsconfig.json`（如果使用 TypeScript）

## 2. 部署步骤

### 2.1 准备工作
- 确保您有 Vercel 账号（可以使用 GitHub 账号登录）
- 确保项目已经推送到 GitHub 仓库
- 确保 `package.json` 位于项目根目录

### 2.2 连接仓库
1. 登录 Vercel 控制台
2. 点击 "New Project"
3. 选择您的 GitHub 仓库
4. 选择要部署的分支（通常是 main 或 master）

### 2.3 配置部署设置
- Framework Preset: 选择 "Next.js"
- Root Directory: 保持默认（项目根目录）
- Build and Output Settings: 会自动使用 `vercel.json` 中的配置
- Environment Variables: 如果需要，添加必要的环境变量

### 2.4 部署
- 点击 "Deploy" 按钮
- Vercel 将自动开始构建和部署过程

## 3. 注意事项

### 3.1 环境变量
- 在 Vercel 项目设置中配置环境变量
- 路径：Project Settings > Environment Variables
- 确保所有必要的环境变量都已配置

### 3.2 构建命令
确保项目根目录的 `package.json` 包含正确的构建命令：
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### 3.3 样式和动画
1. Tailwind CSS
   - 确保 `app/globals.css` 中包含 Tailwind 指令：
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
   
2. Framer Motion
   - 确保组件中正确导入：
   ```typescript
   import { motion, AnimatePresence } from 'framer-motion';
   ```

### 3.4 域名设置
- Vercel 自动分配 `.vercel.app` 域名
- 自定义域名配置：Project Settings > Domains

## 4. 部署后验证

### 4.1 基础检查
1. 访问 Vercel 提供的预览 URL
2. 检查页面加载状态
3. 验证资源加载情况
4. 测试功能是否正常
5. 检查控制台错误

### 4.2 性能检查
- 页面加载速度
- 资源优化状况
- 移动端适配

## 5. 持续部署

### 5.1 自动部署
- Vercel 自动监听 GitHub 仓库变化
- 主分支推送触发自动部署
- PR 创建自动预览部署

### 5.2 部署配置
- 可在 Vercel 仪表板配置自动部署选项
- 设置部署钩子和触发条件
- 配置部署通知

## 6. 故障排除

### 6.1 常见问题
1. 构建失败
   - 检查 Vercel 部署日志
   - 验证 `vercel.json` 配置
   - 确认依赖完整性
   - 检查构建命令
   - 确保所有必要的配置文件存在

2. 样式问题
   - 检查 Tailwind 配置
   - 验证 PostCSS 设置
   - 确认样式文件正确导入

3. 动画问题
   - 检查 framer-motion 版本兼容性
   - 验证组件导入是否正确

### 6.2 性能问题
1. 加载速度慢
   - 检查资源优化
   - 验证缓存配置
   - 确认 CDN 设置

### 6.3 调试方法
1. 使用 Vercel CLI 本地调试
2. 检查构建日志
3. 验证环境变量
4. 测试部署预览

## 7. 最佳实践

### 7.1 开发流程
1. 本地开发和测试
2. 提交代码到版本控制
3. 自动部署和预览
4. 验证和测试
5. 正式部署

### 7.2 监控和维护
1. 定期检查部署状态
2. 监控性能指标
3. 更新依赖包
4. 优化部署配置

## 8. 联系支持

如遇到无法解决的问题：
1. 查阅 [Vercel 文档](https://vercel.com/docs)
2. 访问 [Vercel 支持中心](https://vercel.com/support)
3. 在 [Vercel GitHub](https://github.com/vercel/vercel) 提交 issue 