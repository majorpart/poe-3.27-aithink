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
                
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

