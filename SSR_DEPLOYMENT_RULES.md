# Next.js SSR 部署规则总结

## 基于今天改造和 Vercel 部署问题的经验总结

### 核心原则

1. **所有页面必须使用 SSR（Server-Side Rendering）模式**
   - 使用 `getServerSideProps` 而不是 `getStaticProps` 或客户端渲染
   - 确保所有内容在服务器端渲染，直接写入 HTML
   - 禁止使用客户端渲染（CSR）来加载主要内容

2. **禁止在 SSR 中使用文件系统（fs）模块**
   - Vercel 的 serverless 环境不支持文件系统访问
   - 所有动态内容必须硬编码到 JavaScript 文件中
   - 使用硬编码对象（如 `HARDCODED_POST_METADATA`）存储内容

3. **内容必须硬编码到 JavaScript 文件**
   - Blog posts、Examples、Legal 内容等都应硬编码
   - 使用模板字符串（template literals）存储 HTML 内容
   - 避免运行时读取外部 HTML 文件

---

## 具体规则

### 1. 页面实现规则

#### ✅ 正确做法

```javascript
// pages/blog/[slug].jsx
export async function getServerSideProps({ params }) {
    const { slug } = params;
    // 动态导入避免客户端打包
    const { getPostHtmlBySlug } = await import('../../lib/posts');
    const { title, description, html } = getPostHtmlBySlug(slug);
    
    return { 
        props: { 
            slug, 
            title, 
            description, 
            html 
        } 
    };
}

export default function BlogPost({ slug, title, description, html }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
}
```

#### ❌ 错误做法

```javascript
// 错误：使用 getStaticProps（SSG）
export async function getStaticProps({ params }) {
    // ...
}

// 错误：使用 fs 模块读取文件
import fs from 'fs';
const html = fs.readFileSync(`./posts/${slug}.html`, 'utf8');
```

### 2. 数据源实现规则

#### ✅ 正确做法：硬编码内容

```javascript
// lib/posts.js
const HARDCODED_POST_METADATA = {
    'post-slug': {
        title: 'Post Title',
        description: 'Post description',
        html: `
            <h1>Post Title</h1>
            <p>Post content here...</p>
        `
    }
};

export function getPostHtmlBySlug(slug) {
    const hardcoded = HARDCODED_POST_METADATA[slug];
    if (!hardcoded) {
        return {
            title: 'Post not found',
            description: '',
            html: '<p>Post not found.</p>'
        };
    }
    return {
        title: hardcoded.title,
        description: hardcoded.description,
        html: hardcoded.html
    };
}
```

#### ❌ 错误做法：文件系统读取

```javascript
// 错误：使用 fs 模块
import fs from 'fs';
import path from 'path';

export function getPostHtmlBySlug(slug) {
    const filePath = path.join(process.cwd(), `posts/${slug}.html`);
    const html = fs.readFileSync(filePath, 'utf8');
    return { html };
}
```

### 3. 动态导入规则

#### ✅ 正确做法：在 getServerSideProps 中动态导入

```javascript
export async function getServerSideProps({ params }) {
    // 动态导入避免客户端打包 server-only 代码
    const { getPostHtmlBySlug } = await import('../../lib/posts');
    const data = getPostHtmlBySlug(params.slug);
    return { props: { data } };
}
```

#### ❌ 错误做法：在组件顶层直接导入

```javascript
// 错误：直接导入可能导致客户端打包
import { getPostHtmlBySlug } from '../../lib/posts';

export default function Page() {
    // ...
}
```

### 4. 错误处理规则

#### ✅ 正确做法：提供降级方案

```javascript
export async function getServerSideProps({ params }) {
    try {
        const { getPostHtmlBySlug } = await import('../../lib/posts');
        const data = getPostHtmlBySlug(params.slug);
        return { props: { data } };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return { 
            props: { 
                data: {
                    title: 'Error',
                    description: '',
                    html: '<p>Content not available.</p>'
                }
            } 
        };
    }
}
```

### 5. 内容渲染规则

#### ✅ 正确做法：使用 dangerouslySetInnerHTML

```javascript
export default function Page({ content }) {
    return (
        <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content.html }}
        />
    );
}
```

#### ✅ 正确做法：确保所有内容在 HTML 源码中可见

```javascript
// 所有内容必须通过 props 传递，不使用客户端状态
export default function Page({ title, description, html }) {
    // ✅ 正确：内容直接渲染
    return (
        <>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </>
    );
    
    // ❌ 错误：使用客户端状态加载内容
    // const [content, setContent] = useState(null);
    // useEffect(() => { fetchContent(); }, []);
}
```

### 6. 图片和资源规则

#### ✅ 正确做法：使用 Next.js Image 组件

```javascript
import Image from 'next/image';

export default function Page({ image }) {
    return (
        <Image
            src={image}
            alt="Description"
            width={800}
            height={450}
            priority
            className="w-full h-full object-cover"
        />
    );
}
```

#### ✅ 正确做法：图片路径使用绝对路径

```javascript
// ✅ 正确
image: '/assets/images/image.jpg'

// ❌ 错误：相对路径可能在不同环境中失效
image: './assets/images/image.jpg'
```

---

## Vercel 部署特殊规则

### 1. Serverless 环境限制

- **禁止使用文件系统操作**：`fs.readFileSync()`, `fs.readdirSync()` 等
- **禁止使用同步文件操作**：所有同步操作在 serverless 中不可靠
- **使用硬编码数据**：所有内容必须编译到 JavaScript bundle 中

### 2. 环境变量规则

- **使用环境变量**：敏感信息通过 `process.env` 访问
- **在 Vercel 中配置**：在 Vercel Dashboard 中设置环境变量
- **不要硬编码敏感信息**：API keys、数据库连接等

### 3. API 路由规则

- **放在 `pages/api/` 目录**：所有 API 路由必须在这里
- **使用 Serverless Functions**：Vercel 会自动识别为 serverless functions
- **不要使用 Express**：Vercel 不运行 `server.js`，只运行 `api/*.js`

---

## 页面完整性检查清单

### 每个页面必须包含：

1. ✅ **SEO Head 组件**：包含 title、description、canonical URL
2. ✅ **结构化数据**：JSON-LD schema markup
3. ✅ **完整内容**：所有内容通过 SSR 渲染，不使用客户端加载
4. ✅ **图片优化**：使用 Next.js Image 组件，包含 alt 文本
5. ✅ **响应式设计**：确保移动端友好
6. ✅ **错误处理**：提供降级方案，避免 404 或空白页面

### 页面结构示例：

```javascript
export default function Page({ data }) {
    return (
        <>
            <SEOHead
                title={data.title}
                description={data.description}
                url={`/page/${data.slug}`}
                image={data.image}
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Article',
                            headline: data.title,
                            description: data.description
                        })
                    }}
                />
            </Head>
            <main>
                <h1>{data.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: data.html }} />
            </main>
        </>
    );
}
```

---

## 常见问题和解决方案

### 问题 1：页面显示 404 错误

**原因**：使用文件系统读取内容，在 Vercel serverless 环境中不可靠

**解决方案**：
- 将所有内容硬编码到 JavaScript 文件中
- 使用硬编码对象存储所有动态内容

### 问题 2：页面内容为空

**原因**：使用客户端渲染加载内容

**解决方案**：
- 使用 `getServerSideProps` 在服务器端获取所有内容
- 确保所有内容通过 props 传递到组件

### 问题 3：图片不显示

**原因**：图片路径错误或未使用 Next.js Image 组件

**解决方案**：
- 使用绝对路径（以 `/` 开头）
- 使用 Next.js Image 组件进行优化

### 问题 4：样式丢失

**原因**：CSS 未正确加载或 Tailwind 未正确配置

**解决方案**：
- 确保 Tailwind 在 `_app.jsx` 中正确加载
- 检查 `tailwind.config.js` 配置
- 使用 CDN 或正确的 Tailwind 配置

---

## 验证步骤

### 部署前检查：

1. ✅ 所有页面使用 `getServerSideProps`
2. ✅ 所有数据源使用硬编码，不使用文件系统
3. ✅ 所有内容通过 props 传递，不使用客户端状态
4. ✅ 所有图片使用 Next.js Image 组件
5. ✅ 所有页面包含 SEO Head 和结构化数据

### 部署后验证：

1. ✅ 查看页面源码，确认所有内容在 HTML 中
2. ✅ 使用 Google Search Console 测试页面抓取
3. ✅ 检查移动端显示是否正常
4. ✅ 确认所有链接正常工作

---

## 总结

**核心原则**：
- **SSR 优先**：所有页面使用 SSR 模式
- **硬编码数据**：避免文件系统依赖
- **内容完整**：确保所有内容在 HTML 源码中可见
- **错误处理**：提供降级方案，避免空白页面

**关键规则**：
1. 禁止在 SSR 中使用 `fs` 模块
2. 所有动态内容必须硬编码到 JavaScript 文件
3. 使用 `getServerSideProps` 而不是 `getStaticProps`
4. 确保所有内容通过 props 传递，不使用客户端状态

遵循这些规则可以确保网站在 Vercel 的 serverless 环境中正常工作，并且所有内容都能被搜索引擎正确抓取。

