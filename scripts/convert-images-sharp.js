/**
 * 图片优化脚本 - 使用 Sharp 库转换图片为 WebP 格式并压缩
 * 运行: npm run convert-images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(process.cwd(), 'assets', 'images');
const BACKUP_DIR = path.join(IMAGE_DIR, '_backup');

// 图片优化配置
const IMAGE_CONFIGS = {
    // Hero图片 - 大尺寸
    'poe327-home (6).jpg': { width: 1920, quality: 85 },
    'poe327-home (4).jpg': { width: 1920, quality: 85 },
    
    // 指南卡片图片 - 中等尺寸
    'poe327-guides (1).jpg': { width: 800, quality: 80 },
    'poe327-guides (2).jpg': { width: 800, quality: 80 },
    'poe327-guides (3).jpg': { width: 800, quality: 80 },
    'poe327-guides (4).jpg': { width: 800, quality: 80 },
    'poe327-guides (5).jpg': { width: 800, quality: 80 },
    'poe327-guides (6).jpg': { width: 800, quality: 80 },
    'poe327-guides (7).jpg': { width: 800, quality: 80 },
    'poe327-guides (8).jpg': { width: 800, quality: 80 },
    'poe327-guides (9).jpg': { width: 800, quality: 80 },
    'poe327-guides (10).jpg': { width: 800, quality: 80 },
    'poe327-guides (11).jpg': { width: 800, quality: 80 },
    'poe327-guides (12).jpg': { width: 800, quality: 80 },
    'poe327-guides (13).jpg': { width: 800, quality: 80 },
    'poe327-guides (14).jpg': { width: 800, quality: 80 },
    'poe327-guides (15).jpg': { width: 800, quality: 80 },
    'poe327-guides (16).jpg': { width: 800, quality: 80 },
    'poe327-guides (17).jpg': { width: 800, quality: 80 },
    
    // 博客图片 - 中等尺寸
    'poe327-blog2 (1).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (2).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (3).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (4).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (5).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (6).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (7).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (8).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (9).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (10).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (11).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (12).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (13).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (14).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (15).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (16).jpg': { width: 800, quality: 80 },
    'poe327-blog2 (17).jpg': { width: 800, quality: 80 },
    
    // 博客指南图片 - 中等尺寸
    'poe327-blog-guides (1).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (2).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (3).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (4).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (5).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (6).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (7).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (8).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (9).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (10).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (11).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (12).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (13).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (14).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (15).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (16).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (17).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (18).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (19).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (20).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (21).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (22).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (23).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (24).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (25).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (26).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (27).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (28).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (29).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (30).jpg': { width: 800, quality: 80 },
    'poe327-blog-guides (31).jpg': { width: 800, quality: 80 },
    
    // 博客图片 - 中等尺寸
    'poe327-blog (2).jpg': { width: 800, quality: 80 },
    'poe327-blog (3).jpg': { width: 800, quality: 80 },
    'poe327-blog (4).jpg': { width: 800, quality: 80 },
    'poe327-blog (6).jpg': { width: 800, quality: 80 },
    'poe327-blog (7).jpg': { width: 800, quality: 80 },
    'poe327-blog (8).jpg': { width: 800, quality: 80 },
    'poe327-blog (9).jpg': { width: 800, quality: 80 },
    'poe327-blog (10).jpg': { width: 800, quality: 80 },
    'poe327-blog (11).jpg': { width: 800, quality: 80 },
    'poe327-blog (12).jpg': { width: 800, quality: 80 },
    'poe327-blog (13).jpg': { width: 800, quality: 80 },
    'poe327-blog (14).jpg': { width: 800, quality: 80 },
    'poe327-blog (15).jpg': { width: 800, quality: 80 },
    'poe327-blog (16).jpg': { width: 800, quality: 80 },
    'poe327-blog (17).jpg': { width: 800, quality: 80 },
    'poe327-blog (18).jpg': { width: 800, quality: 80 },
    'poe327-blog (19).jpg': { width: 800, quality: 80 },
    'poe327-blog (20).jpg': { width: 800, quality: 80 },
    
    // 首页图片 - 大尺寸
    'poe327-home (1).jpg': { width: 1920, quality: 85 },
    'poe327-home (2).jpg': { width: 1920, quality: 85 },
    'poe327-home (3).jpg': { width: 1920, quality: 85 },
    'poe327-home (5).jpg': { width: 1920, quality: 85 },
    
    // Logo - 小尺寸，高质量
    'logo.png': { width: 128, height: 128, quality: 90 }
};

// 默认配置（未指定的图片）
const DEFAULT_CONFIG = {
    width: 800,
    quality: 80
};

async function convertImage(filePath) {
    const fileName = path.basename(filePath);
    const ext = path.extname(fileName).toLowerCase();
    
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
        return { skipped: true, fileName };
    }
    
    const baseName = path.basename(fileName, ext);
    const config = IMAGE_CONFIGS[fileName] || DEFAULT_CONFIG;
    
    try {
        // 创建备份目录
        if (!fs.existsSync(BACKUP_DIR)) {
            fs.mkdirSync(BACKUP_DIR, { recursive: true });
        }
        
        // 备份原文件
        const backupPath = path.join(BACKUP_DIR, fileName);
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(filePath, backupPath);
        }
        
        // 读取图片信息
        const image = sharp(filePath);
        const metadata = await image.metadata();
        
        // 计算输出尺寸
        let outputWidth = config.width;
        let outputHeight = config.height;
        
        if (config.width && !config.height) {
            // 保持宽高比
            const aspectRatio = metadata.height / metadata.width;
            outputHeight = Math.round(outputWidth * aspectRatio);
        } else if (config.height && !config.width) {
            const aspectRatio = metadata.width / metadata.height;
            outputWidth = Math.round(outputHeight * aspectRatio);
        }
        
        // 输出路径
        const outputPath = path.join(IMAGE_DIR, `${baseName}.webp`);
        
        // 转换并压缩
        await image
            .resize(outputWidth, outputHeight, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ 
                quality: config.quality,
                effort: 6 
            })
            .toFile(outputPath);
        
        // 获取文件大小
        const originalSize = fs.statSync(filePath).size;
        const newSize = fs.statSync(outputPath).size;
        const saved = ((originalSize - newSize) / originalSize * 100).toFixed(2);
        
        return {
            success: true,
            fileName,
            originalSize: (originalSize / 1024).toFixed(2) + ' KB',
            newSize: (newSize / 1024).toFixed(2) + ' KB',
            saved: saved + '%',
            dimensions: `${metadata.width}x${metadata.height} → ${outputWidth}x${outputHeight}`
        };
    } catch (error) {
        return {
            success: false,
            fileName,
            error: error.message
        };
    }
}

async function processAllImages() {
    console.log('🖼️  Starting image conversion...\n');
    
    if (!fs.existsSync(IMAGE_DIR)) {
        console.error(`❌ Image directory not found: ${IMAGE_DIR}`);
        return;
    }
    
    // 读取所有图片文件
    const files = fs.readdirSync(IMAGE_DIR)
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.png', '.jpg', '.jpeg'].includes(ext);
        })
        .map(file => path.join(IMAGE_DIR, file));
    
    if (files.length === 0) {
        console.log('⚠️  No images found to convert');
        return;
    }
    
    console.log(`📦 Found ${files.length} images to process\n`);
    
    const results = [];
    for (const file of files) {
        const result = await convertImage(file);
        results.push(result);
        
        if (result.success) {
            console.log(`✅ ${result.fileName}`);
            console.log(`   ${result.dimensions}`);
            console.log(`   ${result.originalSize} → ${result.newSize} (saved ${result.saved})\n`);
        } else if (result.skipped) {
            console.log(`⏭️  Skipped: ${result.fileName} (unsupported format)\n`);
        } else {
            console.log(`❌ Error: ${result.fileName} - ${result.error}\n`);
        }
    }
    
    // 统计
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success && !r.skipped).length;
    const skipped = results.filter(r => r.skipped).length;
    
    console.log('📊 Summary:');
    console.log(`   ✅ Successfully converted: ${successful}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    
    if (successful > 0) {
        console.log('\n✨ Image conversion complete!');
        console.log(`📁 WebP images saved to: ${IMAGE_DIR}`);
        console.log(`💾 Original images backed up to: ${BACKUP_DIR}`);
    }
}

// 运行
processAllImages().catch(console.error);

