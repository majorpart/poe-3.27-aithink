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
        const { getBlogPostBySlug, getAllBlogPosts } = await import('../../lib/blog');
        const post = getBlogPostBySlug(slug);
        const allPosts = getAllBlogPosts();
        
        // 获取相关文章（排除当前）
        const relatedPosts = allPosts
            .filter(p => p.slug !== slug)
            .slice(0, 3);
        
        // 获取对应的 guide slug（用于 Read Full Guide 链接）
        let guideSlug = null;
        try {
            const { getAllGuides } = await import('../../lib/guides');
            const guides = getAllGuides();
            // 尝试从 blog slug 映射到 guide slug
            const blogToGuideMap = {
                'poe-3-27-async-trade-merchant-tabs': 'asynchronous-trading',
                'poe-3-27-breach-modernization-keepers-of-the-flame': 'breach-modernization',
                'poe-3-27-class-balance-and-meta-shifts': 'class-balance-meta',
                'poe-3-27-economy-currency-crafting-market': 'economy-forecast',
                'poe-3-27-genesis-tree-long-term-growth': 'genesis-tree',
                'poe-3-27-bloodline-ascendancies': 'bloodline-ascendancies',
                'poe-3-27-new-skill-gems': 'new-skill-gems',
                'poe-3-27-beginner-complete': 'beginner-complete',
                'poe-3-27-new-unique-items': 'new-unique-items',
                'poe-3-27-pinnacle-bosses': 'pinnacle-bosses',
                'poe-3-27-graft-items-deep-dive': 'graft-items-deep-dive',
                'poe-3-27-advanced-crafting': 'advanced-crafting',
                'poe-3-27-umbral-flames-breachlord': 'umbral-flames-breachlord',
                'poe-3-27-quality-of-life': 'quality-of-life',
                'poe-3-27-map-strategy-atlas': 'map-strategy-atlas',
                'poe-3-27-trading-advanced': 'trading-advanced',
                'poe-3-27-currency-investment': 'currency-investment'
            };
            guideSlug = blogToGuideMap[slug] || null;
        } catch (err) {
            // 如果无法获取 guides，忽略错误
        }
        
        return {
            props: {
                post,
                relatedPosts,
                guideSlug
            }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            notFound: true
        };
    }
}

export default function BlogPostPage({ post, relatedPosts, guideSlug }) {
    const siteUrl = 'https://poe327.aithink.app';
    const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
    
    return (
        <>
            <SEOHead
                title={`${post.title} | PoE 3.27 Blog`}
                description={post.description}
                url={`/blog/${post.slug}`}
                keywords={post.keywords}
                canonical={canonicalUrl}
                image={post.image}
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BlogPosting',
                            headline: post.title,
                            description: post.description,
                            image: `${siteUrl}${post.image}`,
                            author: {
                                '@type': 'Person',
                                name: 'PoE 3.27 Expert'
                            },
                            publisher: {
                                '@type': 'Organization',
                                name: 'PoE 3.27 Guide',
                                logo: {
                                    '@type': 'ImageObject',
                                    url: `${siteUrl}/assets/images/logo.webp`
                                }
                            },
                            datePublished: post.date,
                            dateModified: post.date
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
                        <Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link>
                        <span className="mx-2 text-gray-600">/</span>
                        <span className="text-gray-300">{post.title}</span>
                    </nav>
                </div>
            </section>

            {/* Article Header */}
            <section className="pt-12 pb-8" style={{ backgroundColor: 'var(--primary-bg)' }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <span className="text-xs text-orange-400 font-semibold px-3 py-1 rounded" style={{ backgroundColor: 'rgba(255, 102, 0, 0.1)' }}>#GUIDE</span>
                            <span className="text-sm text-gray-400">{post.date}</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                <Image 
                                    src="/assets/images/logo.png" 
                                    alt="Author" 
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm text-white font-medium">PoE Expert</p>
                                <p className="text-xs text-gray-400">PoE 3.27 Guide Team</p>
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                        {post.title}
                    </h1>
                </div>
            </section>

            {/* Hero Image */}
            <section className="pb-8" style={{ backgroundColor: 'var(--primary-bg)' }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-full aspect-video rounded-lg overflow-hidden">
                        <Image 
                            src={post.image || `/assets/images/poe327-blog2%20(1).webp`}
                            alt={post.title}
                            width={1200}
                            height={675}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="py-12" style={{ backgroundColor: 'var(--primary-bg)' }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div 
                        className="prose prose-lg max-w-none" 
                        style={{ color: '#e0e0e0' }}
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                </div>
            </article>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
                <section className="py-12 border-t" style={{ backgroundColor: 'var(--primary-bg)', borderColor: 'var(--border-dark)' }}>
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {relatedPosts.map((related) => (
                                <Link 
                                    key={related.slug}
                                    href={`/blog/${related.slug}`}
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
                    <Link href="/blog" className="inline-flex items-center text-orange-400 hover:text-orange-500 transition-colors mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to Blog
                    </Link>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        {guideSlug && (
                            <Link href={`/guides/${guideSlug}`} className="px-6 py-3 rounded-lg border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition-all">
                                Read Full Guide
                            </Link>
                        )}
                        <Link href="/guides" className="px-6 py-3 rounded-lg border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition-all">
                            View All Guides
                        </Link>
                    </div>
                </div>
            </section>

            <AdSense />
            <Footer />
        </>
    );
}

