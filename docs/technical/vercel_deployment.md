# Vercel 部署指南

## 准备工作

1. 确保您有：
   - [GitHub](https://github.com) 账号
   - [Vercel](https://vercel.com) 账号（可以使用 GitHub 账号登录）
   - 项目已推送到 GitHub 仓库：[solihe/lihemobilesite](https://github.com/solihe/lihemobilesite)

2. 项目配置检查：
   ```json
   // package.json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```

## 部署步骤

### 1. 推送代码到 GitHub

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/你的用户名/来贺白酒.git

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: 来贺白酒官网项目"

# 推送到主分支
git push -u origin main
```

### 2. 导入项目
1. 访问 [Vercel 控制台](https://vercel.com)
2. 点击 "Add New Project"
3. 选择 "Import Git Repository"
4. 找到并选择您的仓库

### 3. 配置项目
在项目配置页面中设置以下选项：

1. **项目名称**: 自定义项目名称

2. **Framework Preset**: 
   - 选择 `Vite`
   - Vercel 会自动检测项目为 Vite 项目

3. **构建和输出设置**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Root Directory: `react_template`

### 4. 部署配置
项目根目录需要包含 `vercel.json` 配置文件，内容如下：

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 5. 环境变量配置（如需要）

在 Vercel 项目设置中：
1. 进入 Settings > Environment Variables
2. 添加必要的环境变量

### 6. 域名配置

1. 在 Vercel 项目设置中：
   - 进入 Settings > Domains
   - 添加自定义域名
   - 按照提示配置 DNS 记录

2. SSL 配置会自动完成

## 自动部署

配置完成后，每次推送到 GitHub 仓库的 `main` 分支都会自动触发部署：

1. 本地修改代码
2. 提交并推送到 GitHub：
   ```bash
   git add .
   git commit -m "更新说明"
   git push origin main
   ```
3. Vercel 会自动开始新的部署
4. 每个 PR 会创建预览部署

## 部署完成检查

1. 访问生成的域名（例如：`https://lihemobilesite.vercel.app`）
2. 检查网站功能是否正常：
   - 页面加载
   - 图片显示
   - 动画效果
   - 响应式布局
   - 控制台是否有错误

## 性能优化

Vercel 自动提供以下优化：

1. 全球 CDN 分发
2. 自动 HTTPS
3. 资源压缩
4. 图片优化
5. 边缘缓存
6. 自动 GZIP 压缩

## 监控和分析

在 Vercel 仪表板中可以查看：

1. 部署状态和历史
2. 性能指标
3. 错误日志
4. 访问统计

集成 Analytics（可选）：
- 在项目设置中启用 Vercel Analytics
- 查看详细的性能和使用数据

## 回滚部署

如果新部署出现问题：
1. 访问 Vercel 仪表板的部署历史
2. 找到上一个稳定版本
3. 点击 "..." > "Redeploy"
4. 确认回滚操作

## 故障排除

如果遇到部署问题：

1. 构建失败
   - 检查 `package.json` 中的构建命令
   - 确认所有依赖都已正确安装
   - 查看构建日志中的错误信息

2. 路由问题
   - 确保使用了正确的路由配置
   - 检查是否需要添加重写规则

3. 环境变量
   - 确保所有必要的环境变量都已配置
   - 检查环境变量名称是否正确

## 安全建议

1. 不要在代码中硬编码敏感信息
2. 使用环境变量存储密钥
3. 定期更新依赖包
4. 启用双因素认证

需要帮助时可以：
- 查看 [Vercel 文档](https://vercel.com/docs)
- 访问 [Vercel 支持](https://vercel.com/support)
- 在 GitHub 仓库提交 Issue 