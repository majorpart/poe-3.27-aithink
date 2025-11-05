# 网站改版清单文档

## 概述

本文档记录了从基础设置到完整优化的网站改版全流程，适用于 Next.js SSR 项目在 Vercel 上的部署。其他网站可以参考此文档进行改版，减少修改时间，确保一次性修改正确。

**适用项目类型：**
- Next.js 14+ SSR 项目
- Vercel 部署
- 需要 SEO 优化
- 需要移动端性能优化
- 需要集成 Google AdSense

---

## 一、SEO 基础配置

### 1.1 Sitemap 和 Robots.txt 统一管理

**问题：** 根目录和 `public/` 目录下都有 sitemap.xml 和 robots.txt，造成混乱。

**解决方案：**
- 统一使用 `public/` 目录下的文件（Next.js 会自动提供静态文件）
- 删除根目录的重复文件

**操作步骤：**

1. **更新 `public/sitemap.xml`**
   - 包含所有页面 URL（主页面、导航页面、详情页面、博客文章）
   - 使用正确的 Next.js clean URLs（无 `.html` 扩展名）
   - 更新日期为当前日期
   - 确保包含 `<urlset>` 而不是 `<sitemapindex>`

2. **更新 `public/robots.txt`**
   ```txt
   User-agent: *
   Allow: /
   Allow: /assets/
   Allow: /js/
   Allow: /blog/
   Allow: /examples/
   Allow: /privacy-policy
   Allow: /terms-and-conditions
   
   Disallow: /ads/
   Disallow: /*.ads
   Disallow: /tracking/
   Disallow: /tmp/
   Disallow: /cache/
   Disallow: /*.tmp
   Disallow: /*.log
   Disallow: /api/
   
   Sitemap: https://your-domain.com/sitemap.xml
   Crawl-delay: 1
   
   # 针对不同爬虫的特殊配置
   User-agent: Googlebot
   Allow: /
   Disallow: /api/
   
   User-agent: Bingbot
   Allow: /
   Disallow: /api/
   
   User-agent: Baiduspider
   Allow: /
   Disallow: /api/
   ```

3. **删除根目录的重复文件**
   - 删除根目录的 `sitemap.xml`
   - 删除根目录的 `robots.txt`

4. **配置 `next-sitemap.config.js`**（如果使用 next-sitemap）
   ```javascript
   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
   
   module.exports = {
       siteUrl,
       generateRobotsTxt: false, // 使用手动的 robots.txt
       generateIndexSitemap: false, // 禁用 sitemap index
       exclude: [
           '/api/*',
           '/blog/page/*',
           '/blog/tag/*'
       ],
       changefreq: 'weekly',
       priority: 0.7,
       sitemapSize: 50000,
       transform: async (config, url) => {
           return {
               loc: url,
               changefreq: url.startsWith('/blog') ? 'monthly' : 'weekly',
               priority: url === '/' ? 1.0 : url.startsWith('/blog') ? 0.8 : 0.7,
               lastmod: new Date().toISOString(),
               alternateRefs: []
           };
       }
   };
   ```

5. **创建构建后脚本 `scripts/copy-sitemap.js`**
   ```javascript
   const fs = require('fs');
   const path = require('path');
   
   const publicDir = path.join(process.cwd(), 'public');
   const manualSitemap = path.join(publicDir, 'sitemap.xml');
   
   if (fs.existsSync(manualSitemap)) {
       const content = fs.readFileSync(manualSitemap, 'utf8');
       if (content.includes('<urlset')) {
           const urlCount = (content.match(/<url>/g) || []).length;
           console.log(`[copy-sitemap] ✓ Manual sitemap.xml is ready (contains <urlset> with ${urlCount} URLs)`);
       }
   }
   ```

6. **更新 `package.json`**
   ```json
   {
     "scripts": {
       "postbuild": "node scripts/copy-sitemap.js"
     }
   }
   ```

**文件清单：**
- `public/sitemap.xml` - 更新所有 URL
- `public/robots.txt` - 更新爬虫规则
- `next-sitemap.config.js` - 配置 sitemap 生成
- `scripts/copy-sitemap.js` - 构建后脚本
- `package.json` - 更新 postbuild 脚本

---

## 二、图片优化

### 2.1 PNG/JPG 转 WebP 格式

**目标：** 减少图片文件大小，提升页面加载速度（平均减少 80%+ 文件大小）

**操作步骤：**

1. **安装 sharp 库**
   ```bash
   npm install sharp
   ```

2. **创建图片转换脚本 `scripts/convert-images-sharp.js`**
   ```javascript
   const sharp = require('sharp');
   const fs = require('fs');
   const path = require('path');
   
   const IMAGE_DIR = path.join(process.cwd(), 'public', 'assets', 'images');
   const BACKUP_DIR = path.join(IMAGE_DIR, '_backup');
   
   // 特殊图片配置（根据实际需求调整）
   const SPECIAL_IMAGES = {
       'logo.png': { width: 200, height: 200, quality: 90 },
       'rap-lyrics-generator1.png': { width: 1200, quality: 85 },
       'rap-lyrics-generator2.png': { width: 1200, quality: 85 }
   };
   
   async function convertImage(filePath) {
       const fileName = path.basename(filePath);
       const ext = path.extname(fileName).toLowerCase();
       
       if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;
       
       const backupPath = path.join(BACKUP_DIR, fileName);
       if (!fs.existsSync(backupPath)) {
           fs.copyFileSync(filePath, backupPath);
       }
       
       const specialConfig = SPECIAL_IMAGES[fileName];
       const config = {
           width: specialConfig?.width || null,
           quality: specialConfig?.quality || 80
       };
       
       const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
       
       let sharpInstance = sharp(filePath);
       if (config.width) {
           sharpInstance = sharpInstance.resize(config.width, null, {
               withoutEnlargement: true
           });
       }
       
       await sharpInstance
           .webp({ quality: config.quality })
           .toFile(outputPath);
       
       console.log(`✓ Converted ${fileName} to ${path.basename(outputPath)}`);
   }
   
   // 处理所有图片
   async function processAllImages() {
       if (!fs.existsSync(BACKUP_DIR)) {
           fs.mkdirSync(BACKUP_DIR, { recursive: true });
       }
       
       const files = fs.readdirSync(IMAGE_DIR);
       for (const file of files) {
           const filePath = path.join(IMAGE_DIR, file);
           if (fs.statSync(filePath).isFile()) {
               await convertImage(filePath);
           }
       }
   }
   
   processAllImages();
   ```

3. **运行转换脚本**
   ```bash
   npm run convert-images
   # 或
   node scripts/convert-images-sharp.js
   ```

4. **更新代码中的图片路径**
   - 搜索所有 `.png` 和 `.jpg` 引用
   - 替换为 `.webp`
   - 主要文件：
     - `lib/posts.js` - 博客文章图片
     - `lib/examples.js` - 示例图片
     - `pages/index.jsx` - 首页图片
     - `pages/examples.jsx` - 示例列表页图片
     - `pages/blog/index.jsx` - 博客列表页图片
     - 所有详情页面

**文件清单：**
- `scripts/convert-images-sharp.js` - 图片转换脚本
- `package.json` - 添加 `convert-images` 脚本
- 所有引用图片的页面文件

### 2.2 用户头像图片优化

**目标：** 优化用户头像图片，压缩到网站实际显示大小

**操作步骤：**

1. **创建头像优化脚本 `scripts/optimize-avatar-images.js`**
   ```javascript
   const sharp = require('sharp');
   const fs = require('fs');
   const path = require('path');
   
   const AVATAR_SIZE = 96; // 2x for retina display of 48x48px
   const AVATAR_QUALITY = 80;
   const IMAGE_DIR = path.join(process.cwd(), 'public', 'assets', 'images');
   const OPTIMIZED_DIR = path.join(IMAGE_DIR, 'optimized', 'avatars');
   
   // 列出需要优化的头像文件
   const AVATAR_FILES = [
       'avatar1.jpg',
       'avatar2.jpg',
       // ... 列出所有头像文件
   ];
   
   async function optimizeAvatar(imagePath) {
       const fileName = path.basename(imagePath);
       const optimizedPath = path.join(OPTIMIZED_DIR, fileName.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
       
       await sharp(imagePath)
           .resize(AVATAR_SIZE, AVATAR_SIZE, {
               fit: 'cover',
               position: 'center'
           })
           .webp({ quality: AVATAR_QUALITY })
           .toFile(optimizedPath);
       
       // 尝试替换原文件
       try {
           fs.copyFileSync(optimizedPath, imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
       } catch (error) {
           console.log(`⚠️  File is locked, optimized version saved to: ${optimizedPath}`);
       }
   }
   ```

**文件清单：**
- `scripts/optimize-avatar-images.js` - 头像优化脚本
- `package.json` - 添加 `optimize-avatars` 脚本

---

## 三、字符编码和 Favicon 修复

### 3.1 字符编码修复

**问题：** 网站显示乱码

**解决方案：**

1. **更新 `pages/_document.jsx`**
   ```jsx
   import { Html, Head, Main, NextScript } from 'next/document';
   
   export default function Document() {
       return (
           <Html lang="en" dir="ltr">
               <Head>
                   {/* Set charset to UTF-8 - MUST be first */}
                   <meta charSet="utf-8" />
                   <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                   <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                   
                   {/* Favicon */}
                   <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                   <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
                   <link rel="icon" type="image/png" href="/assets/images/logo-32.png" />
                   <link rel="apple-touch-icon" href="/assets/images/logo.webp" />
               </Head>
               <body>
                   <Main />
                   <NextScript />
               </body>
           </Html>
       );
   }
   ```

2. **确保 `favicon.ico` 在 `public/` 目录下**
   - 移动 `favicon.ico` 到 `public/favicon.ico`

**文件清单：**
- `pages/_document.jsx` - 添加字符编码和 favicon
- `public/favicon.ico` - 确保文件存在

---

## 四、移动端性能优化

### 4.1 Next.js 配置优化

**更新 `next.config.js`**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    trailingSlash: false,
    compress: true, // 启用压缩
    
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        unoptimized: false
    },
    
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
                ]
            },
            {
                source: '/assets/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
                ]
            }
        ];
    }
};

module.exports = nextConfig;
```

### 4.2 字体加载优化

**更新 `pages/_app.jsx`**
```jsx
import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400&display=swap" rel="stylesheet" />
                <script src="https://cdn.tailwindcss.com" />
                <style dangerouslySetInnerHTML={{__html: `
                    html {
                        font-size: 16px;
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
                    body {
                        font-size: 16px;
                        line-height: 1.6;
                    }
                    * {
                        box-sizing: border-box;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                    .container-max-width {
                        max-width: 1200px;
                    }
                `}} />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
```

### 4.3 图片加载优化

**在页面中使用 Next.js Image 组件**
```jsx
import Image from 'next/image';

// 为关键图片添加预加载
<Head>
    <link
        rel="preload"
        as="image"
        href="/assets/images/hero-image.webp"
        fetchPriority="high"
    />
</Head>

// 使用 Image 组件
<Image
    src="/assets/images/example.webp"
    alt="Example"
    width={600}
    height={400}
    loading="lazy"
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,..."
/>
```

**文件清单：**
- `next.config.js` - 性能配置
- `pages/_app.jsx` - 字体和全局样式
- 所有使用图片的页面

---

## 五、Google AdSense 集成

### 5.1 添加 AdSense 脚本

**操作步骤：**

1. **在 `pages/_document.jsx` 中添加脚本（可选，全局加载）**
   ```jsx
   <Head>
       {/* Google AdSense */}
       <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script>
   </Head>
   ```

2. **在每个页面末尾添加脚本**
   ```jsx
   export default function Page() {
       return (
           <>
               {/* 页面内容 */}
               
               {/* 在 </main> 之后添加 */}
               <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script>
           </>
       );
   }
   ```

3. **更新所有页面：**
   - `pages/index.jsx`
   - `pages/blog/index.jsx`
   - `pages/blog/[slug].jsx`
   - `pages/examples.jsx`
   - `pages/examples/[slug].jsx`
   - `pages/privacy-policy.jsx`
   - `pages/terms-and-conditions.jsx`
   - 其他所有页面

**重要提示：**
- 替换 `ca-pub-XXXXXXXXXX` 为实际的 Publisher ID
- 确保 `ads.txt` 文件在 `public/` 目录下
- 脚本必须放在每个页面末尾（`</main>` 之后）

**文件清单：**
- `pages/_document.jsx` - 可选，全局加载
- 所有页面文件 - 在末尾添加脚本
- `public/ads.txt` - 确保包含 Publisher ID

---

## 六、布局修复（Tailwind CSS）

### 6.1 确保 Tailwind CDN 正常加载

**问题：** 移除 Tailwind CDN 后导致布局混乱

**解决方案：**

1. **在 `pages/_app.jsx` 中保留 Tailwind CDN**
   ```jsx
   <script src="https://cdn.tailwindcss.com" />
   ```

2. **或者使用本地构建的 Tailwind CSS**
   - 配置 `tailwind.config.js`
   - 使用 PostCSS 构建
   - 在 `_app.jsx` 中导入 CSS 文件

**文件清单：**
- `pages/_app.jsx` - 确保 Tailwind 正常加载

---

## 七、完整检查清单

### 7.1 部署前检查

- [ ] SEO 配置
  - [ ] `public/sitemap.xml` 包含所有页面 URL
  - [ ] `public/robots.txt` 配置正确
  - [ ] 删除根目录的重复文件
  - [ ] `next-sitemap.config.js` 配置正确（如果使用）

- [ ] 图片优化
  - [ ] 所有 PNG/JPG 已转换为 WebP
  - [ ] 代码中所有图片路径已更新为 `.webp`
  - [ ] 用户头像已优化
  - [ ] 图片已添加 `width` 和 `height` 属性

- [ ] 字符编码和 Favicon
  - [ ] `pages/_document.jsx` 包含字符编码 meta 标签
  - [ ] `favicon.ico` 在 `public/` 目录下
  - [ ] 所有 favicon 链接正确

- [ ] 性能优化
  - [ ] `next.config.js` 配置正确
  - [ ] 字体加载优化
  - [ ] 图片使用 Next.js Image 组件
  - [ ] 关键图片已预加载

- [ ] Google AdSense
  - [ ] 所有页面末尾添加了 AdSense 脚本
  - [ ] Publisher ID 已替换为实际值
  - [ ] `public/ads.txt` 文件存在且正确

- [ ] 布局检查
  - [ ] Tailwind CSS 正常加载
  - [ ] 所有页面布局正常
  - [ ] 移动端显示正常

### 7.2 部署后验证

- [ ] 访问网站，检查是否正常显示
- [ ] 检查 `https://your-domain.com/robots.txt`
- [ ] 检查 `https://your-domain.com/sitemap.xml`
- [ ] 检查 `https://your-domain.com/ads.txt`
- [ ] 使用 PageSpeed Insights 测试性能
- [ ] 检查移动端显示
- [ ] 验证 Google AdSense 是否正常显示

---

## 八、常见问题解决

### 8.1 构建错误

**问题：** `Module not found: Can't resolve '../../components/GoogleAd'`

**解决：** 确保所有页面已移除对已删除组件的引用
```bash
# 搜索所有引用
grep -r "GoogleAd" pages/
# 移除所有导入和使用
```

### 8.2 Sitemap 显示为 sitemapindex

**问题：** 访问 sitemap.xml 显示 `<sitemapindex>` 而不是 `<urlset>`

**解决：**
1. 确保 `public/sitemap.xml` 包含 `<urlset>`
2. 检查 `next-sitemap.config.js` 配置
3. 确保 `postbuild` 脚本正确执行

### 8.3 图片不显示

**问题：** 图片路径错误或格式问题

**解决：**
1. 检查图片路径是否正确（使用绝对路径 `/assets/images/...`）
2. 确保图片已转换为 WebP
3. 检查 Next.js Image 组件配置

---

## 九、快速应用清单（其他网站使用）

### 步骤 1：SEO 配置（30分钟）
1. 更新 `public/sitemap.xml` - 列出所有页面 URL
2. 更新 `public/robots.txt` - 配置爬虫规则
3. 删除根目录重复文件
4. 配置 `next-sitemap.config.js`（如果使用）
5. 创建 `scripts/copy-sitemap.js`
6. 更新 `package.json` postbuild 脚本

### 步骤 2：图片优化（1-2小时）
1. 安装 sharp：`npm install sharp`
2. 创建 `scripts/convert-images-sharp.js`
3. 运行转换：`npm run convert-images`
4. 更新所有图片路径为 `.webp`
5. 优化用户头像（如需要）

### 步骤 3：字符编码和 Favicon（15分钟）
1. 更新 `pages/_document.jsx`
2. 确保 `favicon.ico` 在 `public/` 目录

### 步骤 4：性能优化（30分钟）
1. 更新 `next.config.js`
2. 优化 `pages/_app.jsx` 字体加载
3. 使用 Next.js Image 组件
4. 添加关键图片预加载

### 步骤 5：Google AdSense（30分钟）
1. 获取 Publisher ID
2. 在所有页面末尾添加脚本
3. 创建/更新 `public/ads.txt`

### 步骤 6：验证和测试（30分钟）
1. 本地构建测试
2. 部署后验证所有功能
3. 性能测试

**总预计时间：3-4小时**

---

## 十、注意事项

1. **备份重要文件**
   - 在开始改版前，备份所有文件
   - 特别是图片文件，转换前先备份

2. **测试环境**
   - 先在测试环境验证所有修改
   - 确认无误后再部署到生产环境

3. **逐步部署**
   - 不要一次性部署所有修改
   - 可以分步骤部署，每步验证

4. **监控**
   - 部署后监控网站性能
   - 检查错误日志
   - 使用 Google Search Console 监控 SEO

5. **文档更新**
   - 根据实际情况更新此文档
   - 记录特定项目的特殊配置

---

## 十一、参考资源

- [Next.js 文档](https://nextjs.org/docs)
- [Vercel 部署指南](https://vercel.com/docs)
- [Google AdSense 集成指南](https://support.google.com/adsense/answer/7183212)
- [WebP 图片优化](https://developers.google.com/speed/webp)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**文档版本：** 1.0  
**最后更新：** 2025-01-27  
**适用项目：** Next.js SSR 项目，Vercel 部署

