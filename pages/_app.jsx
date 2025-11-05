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
                {/* Google Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&display=swap" rel="stylesheet" />
            </Head>
            {/* Tailwind CSS CDN - 使用 Script 组件，在 beforeInteractive 阶段加载 */}
            <Script
                src="https://cdn.tailwindcss.com"
                strategy="beforeInteractive"
            />
            <Script
                id="tailwind-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            function configureTailwind() {
                                if (typeof window !== 'undefined' && window.tailwind) {
                                    window.tailwind.config = {
                                        theme: {
                                            extend: {
                                                colors: {
                                                    'primary-bg': '#0a0a0a',
                                                    'secondary-bg': '#252525',
                                                    'card-bg': '#2d2d2d',
                                                    'text-primary': '#ffffff',
                                                    'text-secondary': '#e0e0e0',
                                                    'text-muted': '#999999',
                                                    'accent-flame': '#ff6600',
                                                    'accent-flame-hover': '#ff8800',
                                                    'accent-gold': '#ffb84d',
                                                    'border-dark': '#404040'
                                                }
                                            }
                                        }
                                    };
                                    return true;
                                }
                                return false;
                            }
                            
                            if (configureTailwind()) {
                                // 配置成功
                            } else {
                                // Tailwind 还未加载，等待加载
                                var checkInterval = setInterval(function() {
                                    if (configureTailwind()) {
                                        clearInterval(checkInterval);
                                    }
                                }, 50);
                                
                                // 10秒后停止检查
                                setTimeout(function() {
                                    clearInterval(checkInterval);
                                }, 10000);
                            }
                        })();
                    `
                }}
            />
            <Component {...pageProps} />
        </>
    );
}

