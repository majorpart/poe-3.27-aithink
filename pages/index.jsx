import SEOHead from '../components/SEOHead';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AdSense from '../components/AdSense';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export async function getServerSideProps(context) {
    try {
        const { getAllGuides } = await import('../lib/guides');
        const guides = getAllGuides().slice(0, 5); // 显示前5个指南
        
        return {
            props: {
                guides
            }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                guides: []
            }
        };
    }
}

export default function Home({ guides }) {
    const siteUrl = 'https://poe327.aithink.app';
    
    return (
        <>
            {/* 预加载首屏大图，优化 LCP */}
            <Head>
                <link
                    rel="preload"
                    as="image"
                    href="/assets/images/poe327-home%20(6).webp"
                    imagesrcset="/assets/images/poe327-home%20(6).webp 1200w"
                    fetchpriority="high"
                />
            </Head>
            <SEOHead
                title='PoE 3.27 Keepers of the Flame - Complete Guide'
                description='Complete PoE 3.27 guides: Breach modernization, Genesis Tree, dual-class builds, asynchronous trading. Master Path of Exile 3.27 Keepers of the Flame.'
                url="/"
                keywords="PoE 3.27, Path of Exile 3.27, Keepers of the Flame, PoE guide, Breach, Genesis Tree"
                canonical={`${siteUrl}/`}
            />
            <Navigation />
            
            {/* Hero Section */}
            <section className="pt-32 hero-section relative" style={{ minHeight: '600px' }}>
                {/* 首屏大图使用 Next/Image 优先加载，替代 CSS 背景图 */}
                <div className="absolute inset-0 -z-10">
                    <Image 
                        src="/assets/images/poe327-home%20(6).webp"
                        alt="PoE 3.27 Hero"
                        fill
                        priority
                        fetchPriority="high"
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-32 h-32 border-2 border-orange-500 border-opacity-20 rounded-full"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 border-2 border-orange-400 border-opacity-15 rounded-full"></div>
                    <div className="absolute bottom-32 left-32 w-20 h-20 border-2 border-orange-500 border-opacity-20 rounded-full"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 border-2 border-orange-400 border-opacity-15 rounded-full"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 text-center fade-in relative z-10 py-20">
                    <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
                        <span className="text-white">Path of Exile</span>
                        <br />
                        <span className="gradient-text">3.27</span>
                    </h1>
                    <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
                        "Keepers of the Flame"
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 text-spacing max-w-3xl mx-auto">
                        Complete Guides & Deep Analysis for PoE 3.27
                    </p>
                    <p className="text-lg text-gray-300 opacity-90 max-w-2xl mx-auto mb-10">
                        Discover everything you need to know about PoE 3.27: explore the redesigned Breach mechanics, Genesis Tree system, dual-class builds, and revolutionary asynchronous trading in Path of Exile 3.27
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/guides" className="px-8 py-4 rounded-lg font-semibold text-white text-lg hover:shadow-lg transition-all duration-300" style={{ background: 'linear-gradient(45deg, #ff6600, #ff8800)' }}>
                            View All Guides
                        </Link>
                        <Link href="/blog" className="px-8 py-4 border-2 border-orange-500 text-orange-400 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
                            Browse Articles
                        </Link>
                    </div>
                </div>
            </section>

            {/* What is Path of Exile? Section */}
            <section id="what-is-poe" className="py-20" style={{ backgroundColor: 'var(--primary-bg)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-5xl mx-auto text-center mb-16">
                        <h2 className="section-title text-4xl md:text-5xl font-bold mb-6 text-white">What is Path of Exile?</h2>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Path of Exile is a dark fantasy hardcore action role-playing game (ARPG), widely regarded as the spiritual successor to Diablo 2. PoE 3.27 brings exciting new content and mechanics to this beloved game.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                            Driven by loot hunting, players defeat monsters for better gear, challenge harder maps, and enjoy character progression with the thrill of discovering ultra-rare items. With PoE 3.27, new systems like the Genesis Tree and asynchronous trading enhance the gameplay experience.
                        </p>
                    </div>

                    {/* Core Positioning Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
                        <div className="card rounded-lg p-6 text-center">
                            <div className="text-4xl mb-4">⚔️</div>
                            <h3 className="text-xl font-semibold text-white mb-3">Dark Fantasy Hardcore ARPG</h3>
                            <p className="text-gray-400">Dark aesthetic, complex narrative, and deep hardcore gameplay experience</p>
                        </div>
                        <div className="card rounded-lg p-6 text-center">
                            <div className="text-4xl mb-4">💎</div>
                            <h3 className="text-xl font-semibold text-white mb-3">Diablo 2 Spiritual Successor</h3>
                            <p className="text-gray-400">Inherits D2's deep item system and loot-driven gameplay, elevated to new complexity</p>
                        </div>
                        <div className="card rounded-lg p-6 text-center">
                            <div className="text-4xl mb-4">🗺️</div>
                            <h3 className="text-xl font-semibold text-white mb-3">Map-Driven Gameplay</h3>
                            <p className="text-gray-400">Defeat monsters for gear → Challenge harder maps → Discover ultra-rare items</p>
                        </div>
                    </div>

                    {/* Four Core Features */}
                    <div className="max-w-6xl mx-auto">
                        <h3 className="text-3xl font-bold text-center mb-12 text-white">Core Features</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* 1. Massive Passive Skill Tree */}
                            <div className="card rounded-lg p-8">
                                <div className="flex items-start space-x-4">
                                    <div className="text-5xl">🌳</div>
                                    <div>
                                        <h4 className="text-2xl font-semibold text-white mb-4">Massive Passive Skill Tree</h4>
                                        <ul className="space-y-2 text-gray-300">
                                            <li>• Over 1,000 nodes in a constellation-style skill tree</li>
                                            <li>• Each class starts differently but can reach any node</li>
                                            <li>• Near-infinite possibilities</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Skill Gem System */}
                            <div className="card rounded-lg p-8">
                                <div className="flex items-start space-x-4">
                                    <div className="text-5xl">💎</div>
                                    <div>
                                        <h4 className="text-2xl font-semibold text-white mb-4">Skill Gem System</h4>
                                        <ul className="space-y-2 text-gray-300">
                                            <li>• Skills are not class-bound, obtained through skill gems</li>
                                            <li>• Modify skill behavior with support gems</li>
                                            <li>• Examples: Fireball becomes multiple projectiles, auto-aim, poison effects</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Massive Item & Currency System */}
                            <div className="card rounded-lg p-8">
                                <div className="flex items-start space-x-4">
                                    <div className="text-5xl">💰</div>
                                    <div>
                                        <h4 className="text-2xl font-semibold text-white mb-4">Massive Item & Currency System</h4>
                                        <ul className="space-y-2 text-gray-300">
                                            <li>• No gold—all currency is functional orbs</li>
                                            <li>• Extremely rich equipment affixes</li>
                                            <li>• Ultimate goal: Obtain or craft "mirror-tier" equipment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 4. League System (Seasons) */}
                            <div className="card rounded-lg p-8">
                                <div className="flex items-start space-x-4">
                                    <div className="text-5xl">🔥</div>
                                    <div>
                                        <h4 className="text-2xl font-semibold text-white mb-4">League System (Seasons)</h4>
                                        <ul className="space-y-2 text-gray-300">
                                            <li>• New league every 3-4 months</li>
                                            <li>• Fresh mechanics, content, and rewards</li>
                                            <li>• <span className="text-orange-500 font-semibold">PoE 3.27 is such a new league</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PoE 3.27 Unique Features Section */}
            <section id="poe-327-features" className="py-20" style={{ backgroundColor: 'var(--secondary-bg)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    {/* Version Overview Banner */}
                    <div className="text-center mb-16">
                        <h2 className="section-title text-4xl md:text-5xl font-bold mb-4 text-white">PoE 3.27 "Keepers of the Flame"</h2>
                        <p className="text-xl text-orange-400 mb-2">Release Date: October 31, 2024 (PC)</p>
                        <p className="text-lg text-gray-400">PoE 3.27 is a comprehensive, highly free-form loot-driven ARPG update that brings exciting new features and mechanics</p>
                    </div>

                    {/* Core New Content */}
                    <div className="max-w-6xl mx-auto mb-16">
                        <h3 className="text-3xl font-bold text-center mb-12 text-white">Core New Content</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* New Challenge League */}
                            <div className="card rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                    <div className="text-4xl mr-4">🔥</div>
                                    <h4 className="text-2xl font-semibold text-white">New Challenge League</h4>
                                </div>
                                <ul className="space-y-3 text-gray-300">
                                    <li>• <strong className="text-orange-400">Keepers of the Flame League</strong>: Fight Breachlords, protect Ailith, use "Umbral Flames" to cleanse Breach corruption</li>
                                    <li>• <strong className="text-orange-400">Genesis Tree & Grafts</strong>: Cultivate the "Genesis Tree" in the monastery to earn rewards and new Graft items, providing new passive bonuses and active skills</li>
                                </ul>
                            </div>

                            {/* New Skills & Items */}
                            <div className="card rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                    <div className="text-4xl mr-4">⚡</div>
                                    <h4 className="text-2xl font-semibold text-white">New Skills & Items</h4>
                                </div>
                                <ul className="space-y-3 text-gray-300">
                                    <li>• New skill gems (Conflagration, Thunderstorm, Somatic Shell, etc.)</li>
                                    <li>• Over 20 new unique items</li>
                                    <li>• New wand and ring base types</li>
                                    <li>• 5 new divination cards</li>
                                </ul>
                            </div>

                            {/* Endgame Expansion */}
                            <div className="card rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                    <div className="text-4xl mr-4">👑</div>
                                    <h4 className="text-2xl font-semibold text-white">Endgame Expansion</h4>
                                </div>
                                <ul className="space-y-3 text-gray-300">
                                    <li>• <strong className="text-orange-400">Bloodline Ascendancies</strong>: Unlock a second ascendancy class by defeating specific endgame bosses, combining with your original class for more build possibilities</li>
                                    <li>• <strong className="text-orange-400">New Pinnacle Bosses</strong>: Three new Pinnacle Atlas Memory Bosses</li>
                                </ul>
                            </div>

                            {/* Major Quality Improvements */}
                            <div className="card rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                    <div className="text-4xl mr-4">✨</div>
                                    <h4 className="text-2xl font-semibold text-white">Major Quality Improvements</h4>
                                </div>
                                <ul className="space-y-3 text-gray-300">
                                    <li>• <strong className="text-orange-400">Asynchronous Trading</strong>: Through specific stash tabs, other players can directly purchase your listed items, completing trades even when you're offline</li>
                                    <li>• <strong className="text-orange-400">Identify All</strong>: Town NPCs can identify all items in your inventory with one click for free, no Scroll of Wisdom needed</li>
                                    <li>• <strong className="text-orange-400">Passive Reset</strong>: Use currency to completely reset your character's passive skill tree or Atlas passive tree with one click</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Display */}
                    <div className="max-w-5xl mx-auto">
                        <h3 className="text-3xl font-bold text-center mb-12 text-white">PoE 3.27 vs Previous Versions</h3>
                        <div className="card rounded-lg p-8 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b" style={{ borderColor: 'var(--border-dark)' }}>
                                        <th className="pb-4 pr-6 text-white font-semibold">Feature</th>
                                        <th className="pb-4 pr-6 text-orange-400 font-semibold">PoE 3.27</th>
                                        <th className="pb-4 text-gray-400 font-semibold">Previous Versions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300">
                                    <tr className="border-b" style={{ borderColor: 'var(--border-dark)' }}>
                                        <td className="py-4 pr-6 font-medium">Breach Mechanics</td>
                                        <td className="py-4 pr-6">Fully modernized with multiple variants</td>
                                        <td className="py-4">Classic Breach</td>
                                    </tr>
                                    <tr className="border-b" style={{ borderColor: 'var(--border-dark)' }}>
                                        <td className="py-4 pr-6 font-medium">Graft System</td>
                                        <td className="py-4 pr-6">New long-term progression system</td>
                                        <td className="py-4">None</td>
                                    </tr>
                                    <tr className="border-b" style={{ borderColor: 'var(--border-dark)' }}>
                                        <td className="py-4 pr-6 font-medium">Trading Method</td>
                                        <td className="py-4 pr-6">Asynchronous trading</td>
                                        <td className="py-4">Online trading required</td>
                                    </tr>
                                    <tr className="border-b" style={{ borderColor: 'var(--border-dark)' }}>
                                        <td className="py-4 pr-6 font-medium">Item Identification</td>
                                        <td className="py-4 pr-6">Identify all with one click</td>
                                        <td className="py-4">Requires scrolls for each item</td>
                                    </tr>
                                    <tr className="border-b" style={{ borderColor: 'var(--border-dark)' }}>
                                        <td className="py-4 pr-6 font-medium">Class System</td>
                                        <td className="py-4 pr-6">Dual-class Ascendancy</td>
                                        <td className="py-4">Single class</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 pr-6 font-medium">Genesis Tree</td>
                                        <td className="py-4 pr-6">Brand new long-term progression</td>
                                        <td className="py-4">None</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Content Section */}
            <section id="latest-content" className="py-20" style={{ backgroundColor: 'var(--primary-bg)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-6 text-white">Latest PoE 3.27 Content & Updates</h2>
                    <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
                        Explore complete guides for PoE 3.27, from Breach modernization to Genesis Tree system, from build strategies to economic analysis. Our comprehensive PoE 3.27 guides cover all aspects of the new expansion.
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {guides.map((guide) => (
                            <Link 
                                key={guide.slug} 
                                href={`/guides/${guide.slug}`}
                                className="card rounded-lg overflow-hidden block hover:scale-105 transition-transform duration-300"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <Image 
                                        src={guide.image || `/assets/images/poe327-guides%20(1).webp`}
                                        alt={guide.title}
                                        width={800}
                                        height={450}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-orange-400 font-semibold">#{guide.category}</span>
                        </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{guide.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{guide.description}</p>
                                </div>
                            </Link>
                        ))}
                        
                        {/* View All Guides Special Card */}
                        <Link 
                            href="/guides" 
                            className="card rounded-lg overflow-hidden block hover:scale-105 transition-transform duration-300 border-2 border-dashed" 
                            style={{ borderColor: 'var(--accent-flame)' }}
                        >
                            <div className="p-12 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                                <div className="text-5xl mb-4">📚</div>
                                <h3 className="text-2xl font-semibold text-white mb-3">View All PoE 3.27 Guides</h3>
                                <p className="text-gray-400 mb-6">Explore more PoE 3.27 deep content and comprehensive guides</p>
                                <span className="text-orange-400 font-semibold">Enter PoE 3.27 Guide Center →</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="py-20" style={{ background: 'linear-gradient(135deg, rgba(255, 102, 0, 0.1) 0%, rgba(255, 136, 0, 0.1) 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="section-title text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Dive Deep into PoE 3.27?</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        From beginner guides to advanced strategies, from core mechanics to economic analysis, all the PoE 3.27 guides you need are here. Master every aspect of Path of Exile 3.27 with our comprehensive resources.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/guides" className="px-10 py-5 rounded-lg font-semibold text-white text-lg hover:shadow-lg transition-all duration-300" style={{ background: 'linear-gradient(45deg, #ff6600, #ff8800)' }}>
                            View All Guides
                        </Link>
                        <Link href="/blog" className="px-10 py-5 border-2 border-orange-500 text-orange-400 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
                            Browse Blog Articles
                        </Link>
                    </div>
                </div>
            </section>

            <AdSense />
            <Footer />
        </>
    );
}

