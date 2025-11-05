import SEOHead from '../../components/SEOHead';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import AdSense from '../../components/AdSense';
import Link from 'next/link';
import Image from 'next/image';

export async function getServerSideProps(context) {
    try {
        const { getAllBlogPosts } = await import('../../lib/blog');
        const posts = getAllBlogPosts();
        
        return {
            props: {
                posts
            }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                posts: []
            }
        };
    }
}

export default function BlogPage({ posts }) {
    const siteUrl = 'https://poe327.aithink.app';
    
    return (
        <>
            <SEOHead
                title="PoE 3.27 Blog - Latest Articles & Analysis | Path of Exile 3.27"
                description='Explore all deep content and guides for PoE 3.27. Discover comprehensive PoE 3.27 articles covering Path of Exile 3.27 "Keepers of the Flame" - your ultimate PoE 3.27 resource.'
                url="/blog"
                keywords="PoE 3.27 blog, Path of Exile 3.27 articles, PoE 3.27 analysis, Keepers of the Flame blog"
                canonical={`${siteUrl}/blog`}
            />
            <Navigation />
            
            {/* Hero Section */}
            <section className="pt-32 pb-16" style={{ backgroundColor: '#0a0a0a' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
                            <span className="text-white" style={{ fontFamily: 'Cinzel, serif' }}>PoE 3.27</span>
                            <br />
                            <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #ff6600 0%, #ff8800 50%, #ffb84d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Blog Articles</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8">
                            Explore all deep content and guides for PoE 3.27. Discover comprehensive PoE 3.27 articles covering Path of Exile 3.27 "Keepers of the Flame" - your ultimate PoE 3.27 resource.
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="py-16" style={{ backgroundColor: 'var(--primary-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link 
                                key={post.slug} 
                                href={`/blog/${post.slug}`}
                                className="block"
                            >
                                <article className="rounded-lg p-6 fade-in hover:transform hover:scale-105 transition-all duration-300 cursor-pointer" style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040' }}>
                                    <div className="mb-4">
                                        <div className="w-full aspect-video rounded-lg mb-4 overflow-hidden">
                                            <Image 
                                                src={post.image || `/assets/images/poe327-blog2%20(1).webp`}
                                                alt={post.title}
                                                width={800}
                                                height={450}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs text-orange-400 font-semibold px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255, 102, 0, 0.1)' }}>#GUIDE</span>
                                            <span className="text-sm text-gray-400">{post.date}</span>
                                        </div>
                                        <h2 className="text-xl font-semibold text-white mb-3">{post.title}</h2>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                            {post.description}
                                        </p>
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                                <Image 
                                                    src="/assets/images/logo.png" 
                                                    alt="PoE 3.27 Guide Team Author" 
                                                    width={32}
                                                    height={32}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm text-white font-medium">PoE 3.27 Expert</p>
                                                <p className="text-xs text-gray-400">PoE 3.27 Guide</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <AdSense />
            <Footer />
        </>
    );
}

