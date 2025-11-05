import Head from 'next/head';

export default function SEOHead({ 
    title, 
    description, 
    url, 
    image,
    keywords,
    canonical 
}) {
    const siteUrl = 'https://poe327.aithink.app';
    const fullUrl = canonical || `${siteUrl}${url}`;
    const ogImage = image || `${siteUrl}/assets/images/poe327-home%20(6).webp`;
    
    return (
        <Head>
            {/* 基础SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            
            {/* Canonical URL - 重要！ */}
            <link rel="canonical" href={fullUrl} />
            
            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={ogImage} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            
            {/* 其他meta标签 */}
            <meta name="robots" content="index,follow" />
            <meta name="googlebot" content="index,follow" />
            <meta name="bingbot" content="index,follow" />
            <meta name="author" content="PoE 3.27 Guide" />
            <meta name="publisher" content="PoE 3.27 Guide" />
        </Head>
    );
}

