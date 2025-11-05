import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                {/* 字符编码 - 必须在最前面 */}
                <meta charSet="utf-8" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                
                {/* Favicon */}
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" href="/assets/images/logo.png" />
                <link rel="apple-touch-icon" href="/assets/images/logo.png" />
                
                {/* Theme Color */}
                <meta name="theme-color" content="#0a0a0a" />
                <meta name="msapplication-TileColor" content="#0a0a0a" />

                {/* Tailwind CDN 在文档级 Head 提前加载，减少首屏未样式闪烁 */}
                <script
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
                <script src="https://cdn.tailwindcss.com"></script>

            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

