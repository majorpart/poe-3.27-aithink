# PoE 3.27 Guide - Next.js SSR 版本

这是 PoE 3.27 Guide 网站的 Next.js SSR 重构版本，完全符合 SEO 优化和 Vercel 部署要求。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

### 3. 图片优化（可选）

运行图片转换脚本，将图片转换为 WebP 格式并压缩：

```bash
npm run convert-images
```

**注意**：此脚本会：
- 转换所有图片为 WebP 格式
- 根据配置压缩图片尺寸
- 备份原始图片到 `assets/images/_backup/` 目录

### 4. 构建生产版本

```bash
npm run build
```

### 5. 启动生产服务器

```bash
npm start
```

## 📁 项目结构

```
poe-3.27-aithink/
├── pages/                    # Next.js 页面
│   ├── index.jsx            # 首页
│   ├── guides/              # 指南页面
│   │   ├── index.jsx       # 指南列表页
│   │   └── [slug].jsx      # 单个指南页
│   ├── blog/                # 博客页面
│   │   ├── index.jsx       # 博客列表页
│   │   └── [slug].jsx      # 单个博客页
│   ├── privacy-policy.jsx   # 隐私政策
│   ├── terms-and-conditions.jsx  # 条款
│   ├── _app.jsx            # App 组件
│   └── _document.jsx      # Document 组件
├── components/              # React 组件
│   ├── SEOHead.jsx         # SEO Head 组件
│   ├── Navigation.jsx     # 导航组件
│   ├── Footer.jsx          # 页脚组件
│   └── AdSense.jsx         # AdSense 组件
├── lib/                     # 数据文件
│   ├── guides.js           # 指南数据（硬编码）
│   └── blog.js              # 博客数据（硬编码）
├── scripts/                 # 脚本文件
│   ├── extract-all-content.js  # 内容提取脚本
│   └── convert-images-sharp.js # 图片优化脚本
├── styles/                  # 样式文件
│   └── globals.css         # 全局样式
├── assets/                  # 静态资源
│   └── images/             # 图片文件
├── next.config.js          # Next.js 配置
├── tailwind.config.js      # Tailwind 配置
└── package.json            # 项目配置
```

## ✨ 核心特性

### 1. SSR（Server-Side Rendering）

所有页面使用 `getServerSideProps` 进行服务器端渲染，确保：
- ✅ 所有内容直接写入 HTML
- ✅ 搜索引擎可以完整抓取所有内容
- ✅ 不使用客户端渲染加载主要内容

### 2. 硬编码数据

所有指南和博客内容硬编码到 JavaScript 文件中：
- ✅ `lib/guides.js` - 17 个指南的完整内容
- ✅ `lib/blog.js` - 17 个博客文章的完整内容
- ✅ 不使用文件系统（fs）模块
- ✅ 完全兼容 Vercel serverless 环境

### 3. SEO 优化

每个页面包含：
- ✅ SEO Head 组件（title, description, keywords, canonical）
- ✅ Open Graph 标签
- ✅ Twitter Card 标签
- ✅ JSON-LD 结构化数据
- ✅ 移动端友好

### 4. 图片优化

- ✅ 使用 Sharp 库转换图片为 WebP 格式
- ✅ 根据显示大小压缩图片
- ✅ 使用 Next.js Image 组件优化加载

### 5. Google AdSense 集成

- ✅ 全局加载 AdSense 脚本（在 `_document.jsx` 中）
- ✅ 每个页面包含 AdSense 组件
- ✅ 支持广告位配置

### 6. 内链建设

- ✅ 相关指南/博客推荐
- ✅ 面包屑导航
- ✅ 页面间链接优化

## 📝 添加新内容

### 添加新指南

1. 将 HTML 文件放在根目录（如 `guide-new-guide.html`）
2. 运行提取脚本：
   ```bash
   node scripts/extract-all-content.js
   ```
3. 脚本会自动更新 `lib/guides.js`
4. 访问 `/guides/new-guide-slug` 查看新指南

### 添加新博客

1. 将 HTML 文件放在 `blog/` 目录（如 `blog/poe-3-27-new-post.html`）
2. 运行提取脚本：
   ```bash
   node scripts/extract-all-content.js
   ```
3. 脚本会自动更新 `lib/blog.js`
4. 访问 `/blog/poe-3-27-new-post` 查看新博客

## 🔧 配置说明

### Next.js 配置（next.config.js）

- 图片优化：自动转换为 WebP/AVIF
- 压缩：启用 Gzip 压缩
- 安全头：配置安全 HTTP 头

### Tailwind 配置（tailwind.config.js）

- 自定义颜色：primary-bg, secondary-bg, card-bg 等
- 自定义字体：Cinzel 字体
- 响应式断点：默认 Tailwind 断点

## 🚀 部署到 Vercel

### 1. 连接 GitHub 仓库

在 Vercel Dashboard 中：
1. 点击 "New Project"
2. 选择你的 GitHub 仓库
3. Vercel 会自动检测 Next.js 项目

### 2. 配置环境变量（如需要）

在 Vercel Dashboard 中：
1. 进入项目设置
2. 添加环境变量（如 API keys）

### 3. 部署

Vercel 会自动：
- ✅ 检测 Next.js 项目
- ✅ 运行 `npm run build`
- ✅ 部署到 serverless 环境
- ✅ 配置 CDN 和 HTTPS

### 4. 验证部署

部署后检查：
- ✅ 所有页面正常加载
- ✅ SEO Head 标签正确
- ✅ 图片正常显示
- ✅ AdSense 正常加载
- ✅ 移动端显示正常

## 📊 SEO 验证清单

### 部署前检查

- [ ] 所有页面使用 `getServerSideProps`
- [ ] 所有数据源使用硬编码，不使用文件系统
- [ ] 所有内容通过 props 传递，不使用客户端状态
- [ ] 所有图片使用 Next.js Image 组件
- [ ] 所有页面包含 SEO Head 和结构化数据

### 部署后验证

- [ ] 查看页面源码，确认所有内容在 HTML 中
- [ ] 使用 Google Search Console 测试页面抓取
- [ ] 检查移动端显示是否正常
- [ ] 确认所有链接正常工作
- [ ] 验证 canonical URL 正确
- [ ] 检查结构化数据（使用 Google Rich Results Test）

## 🐛 常见问题

### 问题 1：页面显示 404 错误

**原因**：路由配置错误或 slug 不匹配

**解决方案**：
- 检查 `pages/guides/[slug].jsx` 中的 slug 匹配
- 确认 `lib/guides.js` 中的 slug 与文件名一致

### 问题 2：图片不显示

**原因**：图片路径错误或未使用 Next.js Image 组件

**解决方案**：
- 使用绝对路径（以 `/` 开头）
- 使用 Next.js Image 组件
- 运行图片优化脚本生成 WebP 版本

### 问题 3：AdSense 不显示

**原因**：AdSense 脚本未正确加载

**解决方案**：
- 检查 `_document.jsx` 中的 AdSense 脚本
- 确认 AdSense 账户已批准
- 检查浏览器控制台是否有错误

## 📚 相关文档

- [Next.js 文档](https://nextjs.org/docs)
- [Vercel 部署文档](https://vercel.com/docs)
- [Sharp 图片处理](https://sharp.pixelplumbing.com/)
- [Google AdSense](https://www.google.com/adsense)

## 📄 许可证

MIT License

---

**注意**：这是一个粉丝网站，不隶属于 Grinding Gear Games。Path of Exile 是 Grinding Gear Games 的商标。

