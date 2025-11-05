import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function AdSense() {
    const initialized = useRef(false);
    
    useEffect(() => {
        // 初始化 AdSense（使用 afterInteractive 加载脚本后再 push）
        if (initialized.current) return;
        
        try {
            if (typeof window !== 'undefined' && window.adsbygoogle && !window.__adsbygoogle_inited) {
                window.adsbygoogle = window.adsbygoogle || [];
                window.adsbygoogle.push({});
                initialized.current = true;
                window.__adsbygoogle_inited = true;
            }
        } catch (err) {
            // 静默处理 TagError（重复初始化错误）
            if (err.name !== 'TagError') {
                console.error('AdSense error:', err);
            }
        }
    }, []);
    
    return (
        <>
            <Script
                id="adsbygoogle-loader"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5822504482860674"
                async
                crossOrigin="anonymous"
                strategy="afterInteractive"
                onLoad={() => {
                    try {
                        if (typeof window !== 'undefined') {
                            window.adsbygoogle = window.adsbygoogle || [];
                            if (!window.__adsbygoogle_inited) {
                                window.adsbygoogle.push({});
                                window.__adsbygoogle_inited = true;
                            }
                        }
                    } catch {}
                }}
            />
        </>
    );
}

