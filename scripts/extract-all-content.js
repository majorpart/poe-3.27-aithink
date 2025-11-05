/**
 * 批量提取所有HTML文件内容并生成JavaScript数据文件
 * 运行: node scripts/extract-all-content.js
 */

const fs = require('fs');
const path = require('path');

// 指南配置
const GUIDE_CONFIG = [
    { file: 'guide-breach-modernization.html', slug: 'breach-modernization', category: 'mechanics', img: 1 },
    { file: 'guide-genesis-tree.html', slug: 'genesis-tree', category: 'progression', img: 2 },
    { file: 'guide-asynchronous-trading.html', slug: 'asynchronous-trading', category: 'economy', img: 3 },
    { file: 'guide-class-balance-meta.html', slug: 'class-balance-meta', category: 'build', img: 4 },
    { file: 'guide-economy-forecast.html', slug: 'economy-forecast', category: 'economy', img: 5 },
    { file: 'guide-bloodline-ascendancies.html', slug: 'bloodline-ascendancies', category: 'build', img: 6 },
    { file: 'guide-new-skill-gems.html', slug: 'new-skill-gems', category: 'build', img: 7 },
    { file: 'guide-beginner-complete.html', slug: 'beginner-complete', category: 'beginner', img: 8 },
    { file: 'guide-new-unique-items.html', slug: 'new-unique-items', category: 'build', img: 9 },
    { file: 'guide-pinnacle-bosses.html', slug: 'pinnacle-bosses', category: 'build', img: 10 },
    { file: 'guide-graft-items-deep-dive.html', slug: 'graft-items-deep-dive', category: 'progression', img: 11 },
    { file: 'guide-advanced-crafting.html', slug: 'advanced-crafting', category: 'economy', img: 12 },
    { file: 'guide-umbral-flames-breachlord.html', slug: 'umbral-flames-breachlord', category: 'mechanics', img: 13 },
    { file: 'guide-quality-of-life.html', slug: 'quality-of-life', category: 'mechanics', img: 14 },
    { file: 'guide-map-strategy-atlas.html', slug: 'map-strategy-atlas', category: 'progression', img: 15 },
    { file: 'guide-trading-advanced.html', slug: 'trading-advanced', category: 'economy', img: 16 },
    { file: 'guide-currency-investment.html', slug: 'currency-investment', category: 'economy', img: 17 }
];

// 博客配置
const BLOG_CONFIG = [
    { file: 'blog/poe-3-27-breach-modernization-keepers-of-the-flame.html', slug: 'poe-3-27-breach-modernization-keepers-of-the-flame', date: '2024-10-31', img: 1 },
    { file: 'blog/poe-3-27-async-trade-merchant-tabs.html', slug: 'poe-3-27-async-trade-merchant-tabs', date: '2024-10-31', img: 2 },
    { file: 'blog/poe-3-27-class-balance-and-meta-shifts.html', slug: 'poe-3-27-class-balance-and-meta-shifts', date: '2024-10-31', img: 3 },
    { file: 'blog/poe-3-27-economy-currency-crafting-market.html', slug: 'poe-3-27-economy-currency-crafting-market', date: '2024-10-31', img: 4 },
    { file: 'blog/poe-3-27-genesis-tree-long-term-growth.html', slug: 'poe-3-27-genesis-tree-long-term-growth', date: '2024-10-31', img: 5 },
    { file: 'blog/poe-3-27-bloodline-ascendancies.html', slug: 'poe-3-27-bloodline-ascendancies', date: '2025-01-27', img: 6 },
    { file: 'blog/poe-3-27-new-skill-gems.html', slug: 'poe-3-27-new-skill-gems', date: '2025-01-27', img: 7 },
    { file: 'blog/poe-3-27-beginner-complete.html', slug: 'poe-3-27-beginner-complete', date: '2025-01-27', img: 8 },
    { file: 'blog/poe-3-27-new-unique-items.html', slug: 'poe-3-27-new-unique-items', date: '2025-01-27', img: 9 },
    { file: 'blog/poe-3-27-pinnacle-bosses.html', slug: 'poe-3-27-pinnacle-bosses', date: '2025-01-27', img: 10 },
    { file: 'blog/poe-3-27-graft-items-deep-dive.html', slug: 'poe-3-27-graft-items-deep-dive', date: '2025-01-27', img: 11 },
    { file: 'blog/poe-3-27-advanced-crafting.html', slug: 'poe-3-27-advanced-crafting', date: '2025-01-27', img: 12 },
    { file: 'blog/poe-3-27-umbral-flames-breachlord.html', slug: 'poe-3-27-umbral-flames-breachlord', date: '2025-01-27', img: 13 },
    { file: 'blog/poe-3-27-quality-of-life.html', slug: 'poe-3-27-quality-of-life', date: '2025-01-27', img: 14 },
    { file: 'blog/poe-3-27-map-strategy-atlas.html', slug: 'poe-3-27-map-strategy-atlas', date: '2025-01-27', img: 15 },
    { file: 'blog/poe-3-27-trading-advanced.html', slug: 'poe-3-27-trading-advanced', date: '2025-01-27', img: 16 },
    { file: 'blog/poe-3-27-currency-investment.html', slug: 'poe-3-27-currency-investment', date: '2025-01-27', img: 17 }
];

function extractMeta(htmlContent) {
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s*\|\s*poe327\.aithink\.app.*/i, '').trim() : '';
    
    const descMatch = htmlContent.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1] : '';
    
    const keywordsMatch = htmlContent.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);
    const keywords = keywordsMatch ? keywordsMatch[1] : '';
    
    return { title, description, keywords };
}

function extractArticleContent(htmlContent) {
    // 提取<article>标签内的内容
    const articleMatch = htmlContent.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (!articleMatch) return '';
    
    let content = articleMatch[1]
        // 替换图片路径
        .replace(/src=["']assets\//g, 'src="/assets/')
        .replace(/src=["']\.\.\/assets\//g, 'src="/assets/')
        // 替换图片格式为WebP
        .replace(/\.jpg["']/g, '.webp"')
        .replace(/\.jpeg["']/g, '.webp"')
        .replace(/\.png["']/g, '.webp"')
        // 编码图片路径中的空格（URL编码）- 处理所有包含空格的路径
        .replace(/src="([^"]*\.webp)"/g, (match, path) => {
            return `src="${path.replace(/\s/g, '%20')}"`;
        })
        .replace(/src='([^']*\.webp)'/g, (match, path) => {
            return `src='${path.replace(/\s/g, '%20')}'`;
        })
        // 替换链接路径为Next.js路由
        .replace(/href=["']guide-([^"']+)\.html["']/g, 'href="/guides/$1"')
        .replace(/href=["']blog\/poe-3-27-([^"']+)\.html["']/g, 'href="/blog/poe-3-27-$1"')
        .replace(/href=["']index\.html["']/g, 'href="/"')
        .replace(/href=["']guides\.html["']/g, 'href="/guides"')
        .replace(/href=["']blog\.html["']/g, 'href="/blog"')
        // 移除script和style标签
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    return content;
}

function processGuides() {
    const guides = [];
    
    for (const config of GUIDE_CONFIG) {
        const filePath = path.join(process.cwd(), config.file);
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Guide not found: ${config.file}`);
            continue;
        }
        
        const html = fs.readFileSync(filePath, 'utf8');
        const meta = extractMeta(html);
        const content = extractArticleContent(html);
        
        guides.push({
            slug: config.slug,
            title: meta.title || `Guide ${config.slug}`,
            description: meta.description,
            keywords: meta.keywords,
            image: `/assets/images/poe327-guides%20(${config.img}).webp`,
            category: config.category,
            html: content
        });
        
        console.log(`✅ Extracted guide: ${config.slug}`);
    }
    
    return guides;
}

function processBlogs() {
    const blogs = [];
    
    for (const config of BLOG_CONFIG) {
        const filePath = path.join(process.cwd(), config.file);
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Blog not found: ${config.file}`);
            continue;
        }
        
        const html = fs.readFileSync(filePath, 'utf8');
        const meta = extractMeta(html);
        const content = extractArticleContent(html);
        
        blogs.push({
            slug: config.slug,
            title: meta.title || `Blog ${config.slug}`,
            description: meta.description,
            keywords: meta.keywords,
            image: `/assets/images/poe327-blog2%20(${config.img}).webp`,
            date: config.date,
            category: 'GUIDE',
            html: content
        });
        
        console.log(`✅ Extracted blog: ${config.slug}`);
    }
    
    return blogs;
}

// 生成JavaScript文件内容
function generateGuidesFile(guides) {
    let content = `// 所有指南内容硬编码到JavaScript文件\n`;
    content += `// 此文件由 scripts/extract-all-content.js 自动生成\n\n`;
    content += `const HARDCODED_GUIDES = {\n`;
    
    for (const guide of guides) {
        const escapedHtml = guide.html
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\${/g, '\\${');
        
        content += `    '${guide.slug}': {\n`;
        content += `        slug: '${guide.slug}',\n`;
        content += `        title: ${JSON.stringify(guide.title)},\n`;
        content += `        description: ${JSON.stringify(guide.description)},\n`;
        content += `        keywords: ${JSON.stringify(guide.keywords)},\n`;
        content += `        image: '${guide.image}',\n`;
        content += `        category: '${guide.category}',\n`;
        content += `        html: \`${escapedHtml}\`\n`;
        content += `    },\n`;
    }
    
    content += `};\n\n`;
    content += `export function getAllGuides() {\n`;
    content += `    return Object.values(HARDCODED_GUIDES);\n`;
    content += `}\n\n`;
    content += `export function getGuideBySlug(slug) {\n`;
    content += `    const guide = HARDCODED_GUIDES[slug];\n`;
    content += `    if (!guide) {\n`;
    content += `        return {\n`;
    content += `            slug: 'not-found',\n`;
    content += `            title: 'Guide Not Found',\n`;
    content += `            description: 'The requested guide could not be found.',\n`;
    content += `            html: '<p>Guide not found.</p>'\n`;
    content += `        };\n`;
    content += `    }\n`;
    content += `    return guide;\n`;
    content += `}\n\n`;
    content += `export function getGuidesByCategory(category) {\n`;
    content += `    return Object.values(HARDCODED_GUIDES).filter(guide => \n`;
    content += `        guide.category === category || category === 'all'\n`;
    content += `    );\n`;
    content += `}\n`;
    
    return content;
}

function generateBlogFile(blogs) {
    let content = `// 所有博客内容硬编码到JavaScript文件\n`;
    content += `// 此文件由 scripts/extract-all-content.js 自动生成\n\n`;
    content += `const HARDCODED_BLOG_POSTS = {\n`;
    
    for (const blog of blogs) {
        const escapedHtml = blog.html
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\${/g, '\\${');
        
        content += `    '${blog.slug}': {\n`;
        content += `        slug: '${blog.slug}',\n`;
        content += `        title: ${JSON.stringify(blog.title)},\n`;
        content += `        description: ${JSON.stringify(blog.description)},\n`;
        content += `        keywords: ${JSON.stringify(blog.keywords)},\n`;
        content += `        image: '${blog.image}',\n`;
        content += `        date: '${blog.date}',\n`;
        content += `        category: '${blog.category}',\n`;
        content += `        html: \`${escapedHtml}\`\n`;
        content += `    },\n`;
    }
    
    content += `};\n\n`;
    content += `export function getAllBlogPosts() {\n`;
    content += `    return Object.values(HARDCODED_BLOG_POSTS).sort((a, b) => \n`;
    content += `        new Date(b.date) - new Date(a.date)\n`;
    content += `    );\n`;
    content += `}\n\n`;
    content += `export function getBlogPostBySlug(slug) {\n`;
    content += `    const post = HARDCODED_BLOG_POSTS[slug];\n`;
    content += `    if (!post) {\n`;
    content += `        return {\n`;
    content += `            slug: 'not-found',\n`;
    content += `            title: 'Post Not Found',\n`;
    content += `            description: 'The requested blog post could not be found.',\n`;
    content += `            html: '<p>Post not found.</p>'\n`;
    content += `        };\n`;
    content += `    }\n`;
    content += `    return post;\n`;
    content += `}\n`;
    
    return content;
}

// 主函数
console.log('🚀 Starting content extraction...\n');

console.log('📚 Extracting guides...');
const guides = processGuides();
const guidesContent = generateGuidesFile(guides);

console.log('\n📝 Extracting blog posts...');
const blogs = processBlogs();
const blogsContent = generateBlogFile(blogs);

// 写入文件
const guidesPath = path.join(process.cwd(), 'lib', 'guides.js');
const blogsPath = path.join(process.cwd(), 'lib', 'blog.js');

fs.writeFileSync(guidesPath, guidesContent, 'utf8');
fs.writeFileSync(blogsPath, blogsContent, 'utf8');

console.log(`\n✨ Successfully extracted:`);
console.log(`   - ${guides.length} guides → lib/guides.js`);
console.log(`   - ${blogs.length} blog posts → lib/blog.js`);
console.log('\n📝 Next steps:');
console.log('   1. Review the generated files');
console.log('   2. Test the content in Next.js pages');
console.log('   3. Adjust HTML paths if needed');

