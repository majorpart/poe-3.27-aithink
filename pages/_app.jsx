import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['600','700'], display: 'swap' });

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta 
                    name="viewport" 
                    content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" 
                />
                {/* 为 FundingChoices 预连接，减少握手延迟 */}
                <link rel="preconnect" href="https://fundingchoicesmessages.google.com" />
            </Head>
            {/* Tailwind 已在 _document.jsx 中提前加载 */}
            <div className={cinzel.className}>
                <Component {...pageProps} />
            </div>
        </>
    );
}

