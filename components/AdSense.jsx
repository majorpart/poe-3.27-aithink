import { useEffect, useRef } from 'react';

export default function AdSense() {
    const initialized = useRef(false);
    
    useEffect(() => {
        // 初始化AdSense（脚本已在 _document.jsx 中全局加载）
        // 使用 ref 避免重复初始化
        if (initialized.current) return;
        
        try {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                window.adsbygoogle = window.adsbygoogle || [];
                window.adsbygoogle.push({});
                initialized.current = true;
            }
        } catch (err) {
            // 静默处理 TagError（重复初始化错误）
            if (err.name !== 'TagError') {
                console.error('AdSense error:', err);
            }
        }
    }, []);
    
    return null; // 脚本已在 _document.jsx 中加载，这里只初始化
}

