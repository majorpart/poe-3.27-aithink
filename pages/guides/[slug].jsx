import Head from 'next/head';
import SEOHead from '../../components/SEOHead';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import AdSense from '../../components/AdSense';
import Link from 'next/link';
import Image from 'next/image';

export async function getServerSideProps(context) {
    const { slug } = context.params;
    
    try {
        const { getGuideBySlug, getAllGuides } = await import('../../lib/guides');
        const guide = getGuideBySlug(slug);
        const allGuides = getAllGuides();
        
        // 获取相关指南（同类别，排除当前）
        const relatedGuides = allGuides
            .filter(g => g.category === guide.category && g.slug !== slug)
            .slice(0, 3);
        
        return {
            props: {
                guide,
                relatedGuides
            }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            notFound: true
        };
    }
}

export default function GuidePage({ guide, relatedGuides }) {
    const siteUrl = 'https://poe327.aithink.app';
    const canonicalUrl = `${siteUrl}/guides/${guide.slug}`;
    
    return (
        <>
            <SEOHead
                title={`${guide.title} | PoE 3.27 Guide`}
                description={guide.description}
                url={`/guides/${guide.slug}`}
                keywords={guide.keywords}
                canonical={canonicalUrl}
                image={guide.image}
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Article',
                            headline: guide.title,
                            description: guide.description,
                            image: `${siteUrl}${guide.image}`,
                            author: {
                                '@type': 'Organization',
                                name: 'PoE 3.27 Guide'
                            },
                            publisher: {
                                '@type': 'Organization',
                                name: 'PoE 3.27 Guide',
                                logo: {
                                    '@type': 'ImageObject',
                                    url: `${siteUrl}/assets/images/logo.webp`
                                }
                            },
                            datePublished: new Date().toISOString(),
                            dateModified: new Date().toISOString()
                        })
                    }}
                />
            </Head>
            <Navigation />
            
            {/* Breadcrumb Navigation */}
            <section className="pt-20 pb-4" style={{ backgroundColor: 'var(--primary-bg)', borderBottom: '1px solid var(--border-dark)' }}>
                <div className="max-w-4xl mx-auto px-4">
                    <nav className="text-sm text-gray-400">
                        <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                        <span className="mx-2 text-gray-600">/</span>
                        <Link href="/guides" className="hover:text-orange-400 transition-colors">Guides</Link>
                        <span className="mx-2 text-gray-600">/</span>
                        <span className="text-gray-300">{guide.title}</span>
                    </nav>
                </div>
            </section>

            {/* Hero Section */}
            <section className="pt-12 pb-12" style={{ backgroundColor: 'var(--primary-bg)' }}>
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="mb-6">
                        <span className="text-xs text-orange-400 font-semibold px-3 py-1 rounded" style={{ backgroundColor: 'rgba(255, 102, 0, 0.1)' }}>
                            #{guide.category}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
                        <span className="text-white">{guide.title}</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {guide.description}
                    </p>
                </div>
            </section>

            {/* Guide Content */}
            <article className="max-w-4xl mx-auto px-4 pb-16">
                <div 
                    className="prose prose-invert max-w-none" 
                    style={{ color: '#e0e0e0' }}
                    dangerouslySetInnerHTML={{ __html: guide.html }}
                />
            </article>

            {/* Related Guides Section */}
            {relatedGuides.length > 0 && (
                <section className="py-12 border-t" style={{ backgroundColor: 'var(--primary-bg)', borderColor: 'var(--border-dark)' }}>
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-2xl font-bold text-white mb-6">Related Guides</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {relatedGuides.map((related) => (
                                <Link 
                                    key={related.slug}
                                    href={`/guides/${related.slug}`}
                                    className="block p-4 rounded-lg border hover:border-orange-500 transition-all"
                                    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-dark)' }}
                                >
                                    <h3 className="text-lg font-semibold text-white mb-2">{related.title}</h3>
                                    <p className="text-sm text-gray-400">{related.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Navigation Footer */}
            <section className="py-12 border-t" style={{ backgroundColor: 'var(--primary-bg)', borderColor: 'var(--border-dark)' }}>
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Link href="/guides" className="inline-flex items-center text-orange-400 hover:text-orange-500 transition-colors mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to Guides
                    </Link>
                </div>
            </section>

            <AdSense />
            <Footer />
        </>
    );
}

