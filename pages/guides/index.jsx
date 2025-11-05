import SEOHead from '../../components/SEOHead';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import AdSense from '../../components/AdSense';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export async function getServerSideProps(context) {
    try {
        const { getAllGuides } = await import('../../lib/guides');
        const guides = getAllGuides();
        
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

export default function GuidesPage({ guides }) {
    const siteUrl = 'https://poe327.aithink.app';
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const categories = [
        { id: 'all', name: 'All Guides' },
        { id: 'mechanics', name: 'Core Mechanics' },
        { id: 'build', name: 'Build & Strategy' },
        { id: 'economy', name: 'Economy & Trading' },
        { id: 'progression', name: 'Long-term Progression' },
        { id: 'beginner', name: 'Beginner Guides' }
    ];
    
    const filteredGuides = selectedCategory === 'all' 
        ? guides 
        : guides.filter(guide => {
            const guideCategories = guide.category.toLowerCase().split(/\s+/);
            return guideCategories.includes(selectedCategory);
        });
    
    return (
        <>
            <SEOHead
                title="Complete PoE 3.27 Guide Center - Path of Exile 3.27 Guides"
                description="Explore comprehensive PoE 3.27 guides: from beginner tutorials to advanced strategies for Path of Exile 3.27. Master all aspects of PoE 3.27 with our detailed guides."
                url="/guides"
                keywords="PoE 3.27 guides, Path of Exile 3.27 guide, PoE guide, PoE 3.27 strategies, Keepers of the Flame guide"
                canonical={`${siteUrl}/guides`}
            />
            <Navigation />
            
            {/* Hero Section */}
            <section className="pt-32 pb-16 relative" style={{ backgroundImage: "url('/assets/images/poe327-home%20(4).webp')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div className="max-w-7xl mx-auto px-4 text-center fade-in relative z-10">
                    <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
                        <span className="text-white" style={{ fontFamily: 'Cinzel, serif' }}>PoE 3.27</span>
                        <br />
                        <span className="gradient-text">"Keepers of the Flame"</span>
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Complete PoE 3.27 Guide Center</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Explore comprehensive PoE 3.27 guides: from beginner tutorials to advanced strategies for Path of Exile 3.27. Master all aspects of PoE 3.27 with our detailed guides.
                    </p>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="py-8 border-b" style={{ borderColor: 'var(--border-dark)', backgroundColor: 'var(--secondary-bg)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                                    selectedCategory === category.id
                                        ? 'text-white'
                                        : 'text-gray-300'
                                }`}
                                style={
                                    selectedCategory === category.id
                                        ? { background: 'linear-gradient(45deg, #ff6600, #ff8800)' }
                                        : { backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-dark)' }
                                }
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guides Grid */}
            <section className="py-12" style={{ backgroundColor: 'var(--primary-bg)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGuides.map((guide) => (
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
                                                <span className="text-xs text-orange-400 font-semibold px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255, 102, 0, 0.1)' }}>#{guide.category}</span>
                                            </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{guide.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{guide.description}</p>
                                </div>
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

