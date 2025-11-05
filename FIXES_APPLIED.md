# 错误修复报告

## 修复日期：2025-11-05

## 发现的问题

根据控制台错误和页面显示异常，发现以下问题：

1. **静态资源路径错误** - 404 错误
   - 图片文件在 `assets/images/`，但 Next.js 需要 `public/assets/images/`
   - favicon.ico 未在 public 目录
   - logo.png 未在 public 目录

2. **AdSense 重复初始化错误**
   - `_document.jsx` 中加载脚本
   - `AdSense.jsx` 组件中又加载脚本并初始化
   - 导致重复初始化错误

3. **图片路径编码问题**
   - 文件名包含空格，需要 URL 编码（%20）

## 已应用的修复

### 1. 静态资源路径修复 ✅

- ✅ 创建 `public/assets/images/` 目录
- ✅ 复制所有 WebP 图片到 `public/assets/images/`
- ✅ 复制 logo.png 到 `public/assets/images/`
- ✅ 复制 logo.webp 到 `public/assets/images/`
- ✅ 复制 favicon.ico 到 `public/favicon.ico`

**验证：**
- 90 个 WebP 文件已复制到 public 目录
- logo.png 和 logo.webp 已复制
- favicon.ico 已复制

### 2. AdSense 重复初始化修复 ✅

**修改文件：`components/AdSense.jsx`**

- ✅ 移除 Script 组件（脚本已在 `_document.jsx` 中全局加载）
- ✅ 添加 useRef 避免重复初始化
- ✅ 添加错误处理，静默处理 TagError（重复初始化错误）
- ✅ 组件只返回 null，不渲染任何内容

**修改前：**
```jsx
// 错误：重复加载脚本
<Script src="..." />
useEffect(() => { window.adsbygoogle.push({}); });
```

**修改后：**
```jsx
// 正确：只初始化，不加载脚本
const initialized = useRef(false);
useEffect(() => {
    if (initialized.current) return;
    window.adsbygoogle.push({});
    initialized.current = true;
});
return null;
```

### 3. 图片路径编码修复 ✅

**修改文件：**
- ✅ `pages/index.jsx` - 背景图片路径编码空格为 `%20`
- ✅ `components/SEOHead.jsx` - 默认图片路径编码空格为 `%20`

**修改前：**
```jsx
url('/assets/images/poe327-home (6).webp')
```

**修改后：**
```jsx
url('/assets/images/poe327-home%20(6).webp')
```

## 验证清单

### ✅ 已修复

- [x] 所有图片文件已复制到 `public/assets/images/`
- [x] logo.png 和 logo.webp 已复制到 `public/assets/images/`
- [x] favicon.ico 已复制到 `public/favicon.ico`
- [x] AdSense 重复初始化问题已修复
- [x] 图片路径编码问题已修复（首页背景图片）
- [x] SEOHead 默认图片路径已编码

### ⚠️ 需要检查

- [ ] 检查 lib/guides.js 和 lib/blog.js 中的图片路径是否需要编码
- [ ] 如果 HTML 内容中的图片路径包含空格，可能需要编码

## 下一步

1. **重启开发服务器**（如果还在运行）
   ```bash
   # 停止当前服务器（Ctrl+C）
   npm run dev
   ```

2. **验证修复**
   - 刷新浏览器页面
   - 检查控制台是否还有错误
   - 检查图片是否正常显示
   - 检查 AdSense 是否正常加载

3. **如果仍有问题**
   - 检查 lib/guides.js 和 lib/blog.js 中的 HTML 内容
   - 确保所有图片路径中的空格都进行了 URL 编码

