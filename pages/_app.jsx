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
                {/* 为 FundingChoices 预连接，减少握手延迟 */}
                <link rel="preconnect" href="https://fundingchoicesmessages.google.com" />
            </Head>
            {/* Tailwind 配置需先于 CDN 脚本注入 */}
            <Script
                id="tailwind-config"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.tailwind = window.tailwind || {};
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
                    `
                }}
            />
            {/* Tailwind CSS CDN */}
            <Script
                src="https://cdn.tailwindcss.com"
                strategy="beforeInteractive"
            />
            <Component {...pageProps} />
        </>
    );
}

