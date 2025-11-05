/**
 * 提取HTML文件内容并转换为硬编码JavaScript对象
 * 此脚本用于开发阶段，提取HTML内容后需要手动整理到lib/guides.js和lib/blog.js
 */

const fs = require('fs');
const path = require('path');

// 指南文件映射
const GUIDE_MAPPING = {
    'guide-breach-modernization.html': {
        slug: 'breach-modernization',
        category: 'mechanics',
        imageIndex: 1
    },
    'guide-genesis-tree.html': {
        slug: 'genesis-tree',
        category: 'progression',
        imageIndex: 2
    },
    'guide-asynchronous-trading.html': {
        slug: 'asynchronous-trading',
        category: 'economy',
        imageIndex: 3
    },
    'guide-class-balance-meta.html': {
        slug: 'class-balance-meta',
        category: 'build',
        imageIndex: 4
    },
    'guide-economy-forecast.html': {
        slug: 'economy-forecast',
        category: 'economy',
        imageIndex: 5
    },
    'guide-bloodline-ascendancies.html': {
        slug: 'bloodline-ascendancies',
        category: 'build',
        imageIndex: 6
    },
    'guide-new-skill-gems.html': {
        slug: 'new-skill-gems',
        category: 'build',
        imageIndex: 7
    },
    'guide-beginner-complete.html': {
        slug: 'beginner-complete',
        category: 'beginner',
        imageIndex: 8
    },
    'guide-new-unique-items.html': {
        slug: 'new-unique-items',
        category: 'build',
        imageIndex: 9
    },
    'guide-pinnacle-bosses.html': {
        slug: 'pinnacle-bosses',
        category: 'build',
        imageIndex: 10
    },
    'guide-graft-items-deep-dive.html': {
        slug: 'graft-items-deep-dive',
        category: 'progression',
        imageIndex: 11
    },
    'guide-advanced-crafting.html': {
        slug: 'advanced-crafting',
        category: 'economy',
        imageIndex: 12
    },
    'guide-umbral-flames-breachlord.html': {
        slug: 'umbral-flames-breachlord',
        category: 'mechanics',
        imageIndex: 13
    },
    'guide-quality-of-life.html': {
        slug: 'quality-of-life',
        category: 'mechanics',
        imageIndex: 14
    },
    'guide-map-strategy-atlas.html': {
        slug: 'map-strategy-atlas',
        category: 'progression',
        imageIndex: 15
    },
    'guide-trading-advanced.html': {
        slug: 'trading-advanced',
        category: 'economy',
        imageIndex: 16
    },
    'guide-currency-investment.html': {
        slug: 'currency-investment',
        category: 'economy',
        imageIndex: 17
    }
};

function extractContentFromHTML(htmlContent) {
    // 提取title
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s*\|\s*poe327\.aithink\.app.*/i, '').trim() : '';
    
    // 提取description
    const descMatch = htmlContent.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1] : '';
    
    // 提取keywords
    const keywordsMatch = htmlContent.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);
    const keywords = keywordsMatch ? keywordsMatch[1] : '';
    
    // 提取article内容（在<article>标签内）
    const articleMatch = htmlContent.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    let htmlContentBody = '';
    if (articleMatch) {
        htmlContentBody = articleMatch[1]
            // 替换相对路径为绝对路径
            .replace(/src=["']assets\//g, 'src="/assets/')
            .replace(/href=["']guide-/g, 'href="/guides/')
            .replace(/href=["']blog\//g, 'href="/blog/')
            .replace(/href=["']index\.html/g, 'href="/')
            .replace(/href=["']guides\.html/g, 'href="/guides"')
            .replace(/href=["']blog\.html/g, 'href="/blog"')
            // 移除script标签
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            // 移除style标签（保留内联style）
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    }
    
    return {
        title,
        description,
        keywords,
        html: htmlContentBody
    };
}

function processGuideFile(fileName) {
    const filePath = path.join(process.cwd(), fileName);
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${fileName}`);
        return null;
    }
    
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const extracted = extractContentFromHTML(htmlContent);
    const mapping = GUIDE_MAPPING[fileName];
    
    if (!mapping) {
        console.log(`⚠️  No mapping found for: ${fileName}`);
        return null;
    }
    
    return {
        slug: mapping.slug,
        title: extracted.title || `Guide ${mapping.slug}`,
        description: extracted.description,
        keywords: extracted.keywords,
        image: `/assets/images/poe327-guides (${mapping.imageIndex}).webp`,
        category: mapping.category,
        html: extracted.html
    };
}

// 处理所有指南文件
console.log('📚 Extracting guide content...\n');
const guides = [];
for (const fileName of Object.keys(GUIDE_MAPPING)) {
    const guide = processGuideFile(fileName);
    if (guide) {
        guides.push(guide);
        console.log(`✅ Extracted: ${guide.slug}`);
    }
}

console.log(`\n✨ Extracted ${guides.length} guides`);
console.log('\n📝 Next steps:');
console.log('1. Review the extracted content');
console.log('2. Manually add to lib/guides.js');
console.log('3. Ensure all HTML paths are correct');
console.log('4. Test the guides in Next.js pages');

