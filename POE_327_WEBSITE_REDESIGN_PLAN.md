# PoE 3.27 网站改版计划文档

## 项目概述

**项目名称：** PoE 3.27 Guide Website Redesign  
**目标平台：** Next.js 14+ (SSR模式)  
**部署平台：** Vercel  
**改版目标：** 提升SEO、移动端性能、用户体验和广告收益

---

## 改版目标

### 1. SEO优化 - SSR后端渲染
- 所有页面使用 Next.js SSR 模式（`getServerSideProps`）
- 内容直接写入 HTML，不使用客户端渲染
- 确保 Google 爬虫能完整抓取所有内容

### 2. 移动端友好
- 响应式设计优化
- 移动端性能优化
- 触摸交互优化

### 3. 图片优化
- 使用 sharp 库转换图片格式（PNG/JPG → WebP）
- 根据实际显示尺寸压缩图片
- 提升页面加载速度

### 4. 内链建设
- 完善内部链接结构
- 优化导航系统
- 增加相关内容推荐

### 5. Canonical URL设置
- 每个页面设置正确的 canonical URL
- 避免重复内容问题

### 6. Google AdSense集成
- 在所有页面添加 AdSense 脚本
- 优化广告位置和展示

---

## 一、项目结构改造

### 1.1 创建 Next.js 项目结构

```
poe-3.27-aithink/
├── pages/
│   ├── _app.jsx          # 全局应用配置
│   ├── _document.jsx     # HTML文档结构
│   ├── index.jsx         # 首页
│   ├── guides.jsx        # 指南列表页
│   ├── blog.jsx          # 博客列表页
│   ├── guides/
│   │   └── [slug].jsx    # 指南详情页（动态路由）
│   ├── blog/
│   │   └── [slug].jsx    # 博客详情页（动态路由）
│   ├── privacy-policy.jsx
│   └── terms-and-conditions.jsx
├── lib/
│   ├── guides.js         # 指南数据（硬编码）
│   ├── blog.js           # 博客数据（硬编码）
│   └── seo.js            # SEO工具函数
├── components/
│   ├── SEOHead.jsx       # SEO Head组件
│   ├── Navigation.jsx    # 导航组件
│   ├── Footer.jsx        # 页脚组件
│   └── AdSense.jsx       # AdSense组件
├── public/
│   ├── assets/
│   │   └── images/       # 图片资源（优化后）
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── ads.txt
├── scripts/
│   └── convert-images-sharp.js  # 图片转换脚本
├── next.config.js
├── package.json
└── tailwind.config.js
```

### 1.2 初始化 Next.js 项目

```bash
# 安装 Next.js 和相关依赖
npm install next@latest react@latest react-dom@latest
npm install sharp
npm install tailwindcss postcss autoprefixer
```

---

## 二、SEO优化 - SSR后端渲染

### 2.1 创建SEO Head组件

**文件：`components/SEOHead.jsx`**

```jsx
import Head from 'next/head';

export default function SEOHead({ 
    title, 
    description, 
    url, 
    image,
    keywords,
    canonical 
}) {
    const siteUrl = 'https://poe327.aithink.app';
    const fullUrl = canonical || `${siteUrl}${url}`;
    const ogImage = image || `${siteUrl}/assets/images/poe327-home (6).jpg`;
    
    return (
        <Head>
            {/* 基础SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            
            {/* Canonical URL - 重要！ */}
            <link rel="canonical" href={fullUrl} />
            
            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={ogImage} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            
            {/* 其他meta标签 */}
            <meta name="robots" content="index,follow" />
            <meta name="googlebot" content="index,follow" />
            <meta name="author" content="PoE 3.27 Guide" />
        </Head>
    );
}
```

### 2.2 创建硬编码数据文件

**文件：`lib/guides.js`**

```javascript
// 所有指南内容硬编码到JavaScript文件
const HARDCODED_GUIDES = {
    'breach-modernization': {
        slug: 'breach-modernization',
        title: 'PoE 3.27 Breach Modernization Complete Guide',
        description: 'In-depth analysis of the fully modernized Breach mechanics in PoE 3.27, including various variants, Unstable Breaches, and new reward systems.',
        keywords: 'PoE 3.27, Breach Modernization, Path of Exile 3.27, Breach mechanics',
        image: '/assets/images/poe327-guides (1).webp',
        category: 'mechanics',
        html: `
            <h1>PoE 3.27 Breach Modernization Complete Guide</h1>
            <p>In Path of Exile 3.27, the classic Breach league mechanic has been completely modernized...</p>
            <!-- 完整HTML内容 -->
        `
    },
    'genesis-tree': {
        slug: 'genesis-tree',
        title: 'PoE 3.27 Genesis Tree Ultimate Guide',
        description: 'Master the new Genesis Tree system in PoE 3.27, learn how to cultivate Graft items and gain powerful passive and active effects.',
        keywords: 'PoE 3.27, Genesis Tree, Graft system, Path of Exile 3.27',
        image: '/assets/images/poe327-guides (2).webp',
        category: 'progression',
        html: `
            <h1>PoE 3.27 Genesis Tree Ultimate Guide</h1>
            <p>Master the new Genesis Tree system in PoE 3.27...</p>
            <!-- 完整HTML内容 -->
        `
    },
    // ... 所有17个指南
};

export function getAllGuides() {
    return Object.values(HARDCODED_GUIDES);
}

export function getGuideBySlug(slug) {
    const guide = HARDCODED_GUIDES[slug];
    if (!guide) {
        return {
            slug: 'not-found',
            title: 'Guide Not Found',
            description: 'The requested guide could not be found.',
            html: '<p>Guide not found.</p>'
        };
    }
    return guide;
}

export function getGuidesByCategory(category) {
    return Object.values(HARDCODED_GUIDES).filter(guide => 
        guide.category === category || category === 'all'
    );
}
```

**文件：`lib/blog.js`**

```javascript
// 所有博客内容硬编码到JavaScript文件
const HARDCODED_BLOG_POSTS = {
    'poe-3-27-breach-modernization-keepers-of-the-flame': {
        slug: 'poe-3-27-breach-modernization-keepers-of-the-flame',
        title: 'PoE 3.27 "Keepers of the Flame": Breach Modernization & Complete Guide',
        description: 'In Path of Exile 3.27, the classic Breach league mechanic has been completely modernized. This guide breaks down Breach 2.0 into variant mechanics, Graft system, and essential gameplay strategies.',
        keywords: 'PoE 3.27, Breach Modernization, Keepers of the Flame',
        image: '/assets/images/poe327-blog2 (1).webp',
        date: '2024-10-31',
        category: 'GUIDE',
        html: `
            <h1>PoE 3.27 "Keepers of the Flame": Breach Modernization & Complete Guide</h1>
            <p>In Path of Exile 3.27, the classic Breach league mechanic has been completely modernized...</p>
            <!-- 完整HTML内容 -->
        `
    },
    // ... 所有17个博客文章
};

export function getAllBlogPosts() {
    return Object.values(HARDCODED_BLOG_POSTS).sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
}

export function getBlogPostBySlug(slug) {
    const post = HARDCODED_BLOG_POSTS[slug];
    if (!post) {
        return {
            slug: 'not-found',
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.',
            html: '<p>Post not found.</p>'
        };
    }
    return post;
}
```

### 2.3 创建SSR页面示例

**文件：`pages/index.jsx`**

```jsx
import SEOHead from '../components/SEOHead';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AdSense from '../components/AdSense';
import Head from 'next/head';
import Image from 'next/image';

// ✅ 使用 getServerSideProps 实现 SSR
export async function getServerSideProps() {
    // 动态导入避免客户端打包
    const { getAllGuides } = await import('../lib/guides');
    const { getAllBlogPosts } = await import('../lib/blog');
    
    const guides = getAllGuides();
    const blogPosts = getAllBlogPosts().slice(0, 6); // 首页显示6篇
    
    return {
        props: {
            guides,
            blogPosts
        }
    };
}

export default function HomePage({ guides, blogPosts }) {
    return (
        <>
            <SEOHead
                title='PoE 3.27 "Keepers of the Flame" - Path of Exile 3.27 Complete Guide'
                description='Explore all new content in Path of Exile 3.27 "Keepers of the Flame": Breach modernization, Genesis Tree system, dual-class builds, and revolutionary asynchronous trading. Complete PoE 3.27 guide and deep analysis.'
                url='/'
                keywords='PoE 3.27, Path of Exile 3.27, Keepers of the Flame, PoE guide'
                canonical='https://poe327.aithink.app/'
            />
            
            <Head>
                {/* JSON-LD 结构化数据 */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'PoE 3.27 Guide',
                            url: 'https://poe327.aithink.app',
                            description: 'Complete guides for Path of Exile 3.27'
                        })
                    }}
                />
            </Head>
            
            <Navigation />
            
            {/* Hero Section */}
            <section className="hero-section">
                <h1>Path of Exile 3.27</h1>
                <p>Complete Guides & Deep Analysis for PoE 3.27</p>
            </section>
            
            {/* 指南列表 */}
            <section className="guides-section">
                {guides.slice(0, 6).map(guide => (
                    <article key={guide.slug}>
                        <Image
                            src={guide.image}
                            alt={guide.title}
                            width={600}
                            height={400}
                        />
                        <h2>{guide.title}</h2>
                        <p>{guide.description}</p>
                        <a href={`/guides/${guide.slug}`}>View Guide</a>
                    </article>
                ))}
            </section>
            
            <AdSense />
            <Footer />
        </>
    );
}
```

**文件：`pages/guides/[slug].jsx`**

```jsx
import SEOHead from '../../components/SEOHead';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import AdSense from '../../components/AdSense';
import Head from 'next/head';
import Image from 'next/image';

// ✅ SSR模式 - 所有内容在服务器端渲染
export async function getServerSideProps({ params }) {
    try {
        const { slug } = params;
        const { getGuideBySlug, getAllGuides } = await import('../../lib/guides');
        
        const guide = getGuideBySlug(slug);
        const allGuides = getAllGuides();
        
        // 获取相关指南（同类别）
        const relatedGuides = allGuides
            .filter(g => g.category === guide.category && g.slug !== slug)
            .slice(0, 3);
        
        if (!guide || guide.slug === 'not-found') {
            return {
                notFound: true
            };
        }
        
        return {
            props: {
                guide,
                relatedGuides
            }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            notFound: true
        };
    }
}

export default function GuidePage({ guide, relatedGuides }) {
    return (
        <>
            <SEOHead
                title={`${guide.title} | PoE 3.27 Guide`}
                description={guide.description}
                url={`/guides/${guide.slug}`}
                image={guide.image}
                keywords={guide.keywords}
                canonical={`https://poe327.aithink.app/guides/${guide.slug}`}
            />
            
            <Head>
                {/* JSON-LD 结构化数据 */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Article',
                            headline: guide.title,
                            description: guide.description,
                            image: `https://poe327.aithink.app${guide.image}`,
                            author: {
                                '@type': 'Organization',
                                name: 'PoE 3.27 Guide'
                            }
                        })
                    }}
                />
            </Head>
            
            <Navigation />
            
            <main>
                <article>
                    <h1>{guide.title}</h1>
                    <Image
                        src={guide.image}
                        alt={guide.title}
                        width={1200}
                        height={675}
                        priority
                    />
                    {/* ✅ 内容直接渲染到HTML，不使用客户端加载 */}
                    <div 
                        className="guide-content"
                        dangerouslySetInnerHTML={{ __html: guide.html }}
                    />
                </article>
                
                {/* 相关指南 - 内链建设 */}
                {relatedGuides.length > 0 && (
                    <section className="related-guides">
                        <h2>Related PoE 3.27 Guides</h2>
                        {relatedGuides.map(related => (
                            <div key={related.slug}>
                                <a href={`/guides/${related.slug}`}>
                                    <h3>{related.title}</h3>
                                </a>
                                <p>{related.description}</p>
                            </div>
                        ))}
                    </section>
                )}
            </main>
            
            <AdSense />
            <Footer />
        </>
    );
}
```

---

## 三、图片优化

### 3.1 创建图片转换脚本

**文件：`scripts/convert-images-sharp.js`**

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(process.cwd(), 'public', 'assets', 'images');
const BACKUP_DIR = path.join(IMAGE_DIR, '_backup');

// 图片优化配置
const IMAGE_CONFIGS = {
    // Hero图片 - 大尺寸
    'poe327-home (6).jpg': { width: 1920, quality: 85 },
    'poe327-home (4).jpg': { width: 1920, quality: 85 },
    
    // 指南卡片图片 - 中等尺寸
    'poe327-guides (1).jpg': { width: 800, quality: 80 },
    'poe327-guides (2).jpg': { width: 800, quality: 80 },
    // ... 所有指南图片
    
    // 博客图片 - 中等尺寸
    'poe327-blog2 (1).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (2).jpg': { width: 800, quality: 80 },
    // ... 所有博客图片
    
    // Logo - 小尺寸，高质量
    'logo.png': { width: 128, height: 128, quality: 90 }
};

async function convertImage(filePath) {
    const fileName = path.basename(filePath);
    const ext = path.extname(fileName).toLowerCase();
    
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
        return;
    }
    
    // 创建备份
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    const backupPath = path.join(BACKUP_DIR, fileName);
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`📦 Backed up: ${fileName}`);
    }
    
    // 获取配置
    const config = IMAGE_CONFIGS[fileName] || { quality: 80 };
    const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    
    try {
        let sharpInstance = sharp(filePath);
        
        // 根据配置调整尺寸
        if (config.width || config.height) {
            sharpInstance = sharpInstance.resize(config.width, config.height, {
                withoutEnlargement: true,
                fit: 'cover'
            });
        }
        
        // 转换为WebP
        await sharpInstance
            .webp({ quality: config.quality || 80 })
            .toFile(outputPath);
        
        const originalSize = fs.statSync(filePath).size;
        const newSize = fs.statSync(outputPath).size;
        const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
        
        console.log(`✅ Converted: ${fileName} → ${path.basename(outputPath)} (${reduction}% smaller)`);
    } catch (error) {
        console.error(`❌ Error converting ${fileName}:`, error.message);
    }
}

async function processAllImages() {
    console.log('🖼️  Starting image conversion...\n');
    
    const files = fs.readdirSync(IMAGE_DIR);
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.png', '.jpg', '.jpeg'].includes(ext);
    });
    
    console.log(`Found ${imageFiles.length} images to convert\n`);
    
    for (const file of imageFiles) {
        const filePath = path.join(IMAGE_DIR, file);
        await convertImage(filePath);
    }
    
    console.log('\n✨ Image conversion complete!');
}

processAllImages();
```

### 3.2 更新 package.json

```json
{
  "scripts": {
    "convert-images": "node scripts/convert-images-sharp.js",
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "sharp": "^0.32.0"
  }
}
```

### 3.3 运行图片转换

```bash
npm run convert-images
```

### 3.4 更新所有图片引用

将所有 `.jpg` 和 `.png` 引用改为 `.webp`：

```jsx
// ✅ 使用 Next.js Image 组件和 WebP 格式
<Image
    src="/assets/images/poe327-guides (1).webp"
    alt="PoE 3.27 Guide"
    width={800}
    height={450}
    loading="lazy"
/>
```

---

## 四、内链建设

### 4.1 创建导航组件

**文件：`components/Navigation.jsx`**

```jsx
import Link from 'next/link';

export default function Navigation() {
    return (
        <nav className="navigation">
            <Link href="/" className="logo">
                <img src="/assets/images/logo.webp" alt="PoE 3.27 Guide" />
                <span>PoE 3.27</span>
            </Link>
            
            <div className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/guides">Guides</Link>
                <Link href="/blog">Blog</Link>
            </div>
        </nav>
    );
}
```

### 4.2 创建相关链接组件

**文件：`components/RelatedLinks.jsx`**

```jsx
import Link from 'next/link';

export default function RelatedLinks({ guides, type = 'guides' }) {
    if (!guides || guides.length === 0) return null;
    
    return (
        <section className="related-links">
            <h2>Related PoE 3.27 {type === 'guides' ? 'Guides' : 'Articles'}</h2>
            <div className="related-grid">
                {guides.map(item => (
                    <Link key={item.slug} href={`/${type}/${item.slug}`}>
                        <article>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
```

### 4.3 在页面中添加内链

- 首页：链接到热门指南和最新博客
- 指南详情页：链接到相关指南和对应博客文章
- 博客详情页：链接到相关博客和对应指南
- 页脚：添加所有重要页面的链接
- 面包屑导航：提升页面层次结构

---

## 五、Canonical URL设置

### 5.1 在SEOHead组件中实现

已在 `components/SEOHead.jsx` 中实现，每个页面必须传入正确的 `canonical` 参数：

```jsx
<SEOHead
    title="Page Title"
    description="Page description"
    url="/guides/breach-modernization"
    canonical="https://poe327.aithink.app/guides/breach-modernization" // 完整URL
/>
```

### 5.2 确保所有页面都有canonical

- 首页：`https://poe327.aithink.app/`
- 指南列表：`https://poe327.aithink.app/guides`
- 博客列表：`https://poe327.aithink.app/blog`
- 指南详情：`https://poe327.aithink.app/guides/[slug]`
- 博客详情：`https://poe327.aithink.app/blog/[slug]`
- 法律页面：`https://poe327.aithink.app/privacy-policy` 等

---

## 六、Google AdSense集成

### 6.1 创建AdSense组件

**文件：`components/AdSense.jsx`**

```jsx
import { useEffect } from 'react';
import Script from 'next/script';

const ADSENSE_CLIENT_ID = 'ca-pub-5822504482860674';

export default function AdSense() {
    useEffect(() => {
        // 初始化AdSense
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);
    
    return (
        <>
            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
        </>
    );
}
```

### 6.2 在_document.jsx中全局加载

**文件：`pages/_document.jsx`**

```jsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                {/* 字符编码 - 必须在最前面 */}
                <meta charSet="utf-8" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                
                {/* Favicon */}
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                
                {/* Google AdSense - 全局加载 */}
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5822504482860674"
                    crossOrigin="anonymous"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
```

### 6.3 在页面中添加广告位

```jsx
export default function Page() {
    return (
        <>
            <main>
                {/* 页面内容 */}
            </main>
            
            {/* 页面底部广告 */}
            <AdSense />
            
            {/* 或者使用内联广告 */}
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-5822504482860674"
                data-ad-slot="1234567890"
                data-ad-format="auto"
            />
        </>
    );
}
```

### 6.4 确保ads.txt文件存在

**文件：`public/ads.txt`**

```
google.com, pub-5822504482860674, DIRECT, f08c47fec0942fa0
```

---

## 七、移动端优化

### 7.1 更新next.config.js

**文件：`next.config.js`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
    },
    
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
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

### 7.2 更新_app.jsx

**文件：`pages/_app.jsx`**

```jsx
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta 
                    name="viewport" 
                    content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" 
                />
                {/* Tailwind CSS CDN */}
                <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
```

### 7.3 移动端样式优化

确保所有页面使用响应式设计：

```jsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* 使用Tailwind响应式类 */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 内容 */}
    </div>
</div>
```

---

## 八、实施步骤

### 阶段1：项目初始化（1-2天）

1. ✅ 创建 Next.js 项目结构
2. ✅ 安装依赖（Next.js, React, sharp, Tailwind）
3. ✅ 配置 `next.config.js` 和 `tailwind.config.js`
4. ✅ 创建基础组件（Navigation, Footer, SEOHead）

### 阶段2：内容迁移（3-5天）

1. ✅ 将所有HTML内容转换为硬编码JavaScript对象
   - 创建 `lib/guides.js` - 17个指南
   - 创建 `lib/blog.js` - 17个博客文章
2. ✅ 创建所有页面文件
   - `pages/index.jsx` - 首页
   - `pages/guides.jsx` - 指南列表
   - `pages/blog.jsx` - 博客列表
   - `pages/guides/[slug].jsx` - 指南详情
   - `pages/blog/[slug].jsx` - 博客详情
   - 法律页面

### 阶段3：图片优化（1天）

1. ✅ 运行图片转换脚本
2. ✅ 更新所有图片引用为 `.webp`
3. ✅ 使用 Next.js Image 组件

### 阶段4：SEO和内链（2-3天）

1. ✅ 确保所有页面使用 SSR
2. ✅ 添加 canonical URL
3. ✅ 实现内链结构
4. ✅ 更新 sitemap.xml
5. ✅ 更新 robots.txt

### 阶段5：AdSense集成（1天）

1. ✅ 创建 AdSense 组件
2. ✅ 在所有页面添加脚本
3. ✅ 配置 ads.txt

### 阶段6：测试和优化（2-3天）

1. ✅ 本地测试所有页面
2. ✅ 检查移动端显示
3. ✅ 性能测试
4. ✅ SEO检查
5. ✅ 部署到Vercel

---

## 九、验证清单

### 部署前检查

- [ ] 所有页面使用 `getServerSideProps`（SSR模式）
- [ ] 所有内容硬编码到JavaScript文件
- [ ] 所有图片转换为WebP格式
- [ ] 所有页面有canonical URL
- [ ] 所有页面添加AdSense脚本
- [ ] 内链结构完整
- [ ] sitemap.xml包含所有页面
- [ ] robots.txt配置正确
- [ ] 移动端显示正常
- [ ] 页面性能优化

### 部署后验证

- [ ] 访问网站，检查页面是否正常显示
- [ ] 查看页面源代码，确认内容在HTML中
- [ ] 检查 `https://poe327.aithink.app/robots.txt`
- [ ] 检查 `https://poe327.aithink.app/sitemap.xml`
- [ ] 使用Google Search Console测试页面抓取
- [ ] 使用PageSpeed Insights测试性能
- [ ] 检查移动端显示
- [ ] 验证AdSense是否正常显示

---

## 十、关键注意事项

### 1. 禁止使用文件系统

❌ **错误做法：**
```javascript
import fs from 'fs';
const html = fs.readFileSync('./guides/guide.html', 'utf8');
```

✅ **正确做法：**
```javascript
const HARDCODED_GUIDES = {
    'slug': {
        html: '<h1>Content</h1>'
    }
};
```

### 2. 必须使用SSR

❌ **错误做法：**
```javascript
export async function getStaticProps() { } // SSG
```

✅ **正确做法：**
```javascript
export async function getServerSideProps() { } // SSR
```

### 3. 内容必须直接渲染

❌ **错误做法：**
```javascript
const [content, setContent] = useState(null);
useEffect(() => { fetchContent(); }, []);
```

✅ **正确做法：**
```javascript
export default function Page({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: content.html }} />;
}
```

### 4. Canonical URL必须完整

✅ **正确做法：**
```jsx
<SEOHead
    canonical="https://poe327.aithink.app/guides/breach-modernization"
/>
```

---

## 十一、预期效果

### SEO优化
- ✅ 所有内容在HTML源码中可见
- ✅ Google爬虫能完整抓取
- ✅ 页面加载速度提升
- ✅ 移动端友好度提升

### 性能优化
- ✅ 图片文件大小减少80%+
- ✅ 页面加载时间减少50%+
- ✅ 移动端性能提升

### 用户体验
- ✅ 响应式设计
- ✅ 快速加载
- ✅ 良好的导航结构

### 广告收益
- ✅ AdSense正确集成
- ✅ 广告位置优化

---

## 十二、参考资源

- [Next.js SSR文档](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
- [Next.js Image优化](https://nextjs.org/docs/basic-features/image-optimization)
- [Google AdSense集成](https://support.google.com/adsense/answer/7183212)
- [Canonical URL指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [WebP图片格式](https://developers.google.com/speed/webp)

---

**文档版本：** 1.0  
**创建日期：** 2025-01-27  
**适用项目：** PoE 3.27 Guide Website  
**预计完成时间：** 10-15个工作日

