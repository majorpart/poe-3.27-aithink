import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer-section border-t" style={{ backgroundColor: 'var(--primary-bg)', borderColor: 'var(--border-dark)' }}>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Logo and Site Info */}
                    <div>
                        <div className="flex items-center mb-4">
                            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                                <Image 
                                    src="/assets/images/logo.webp" 
                                    alt="PoE 3.27 Guide Logo" 
                                    width={48} 
                                    height={48} 
                                    className="mr-3"
                                />
                                <span className="text-xl font-bold text-orange-500" style={{ fontFamily: 'Cinzel, serif' }}>PoE 3.27</span>
                            </Link>
                        </div>
                        <p className="text-gray-400 mb-4 text-sm">PoE 3.27 "Keepers of the Flame" Complete Guides & Deep Analysis</p>
                        <p className="text-gray-500 text-xs">poe327.aithink.app</p>
                    </div>

                    {/* Quick Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Navigation</h3>
                        <div className="space-y-2">
                            <Link href="/" className="block text-gray-400 hover:text-orange-400 transition-colors">Home</Link>
                            <Link href="/guides" className="block text-gray-400 hover:text-orange-400 transition-colors">Guides</Link>
                            <Link href="/blog" className="block text-gray-400 hover:text-orange-400 transition-colors">Blog</Link>
                        </div>
                    </div>

                    {/* PoE Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">PoE Resources</h3>
                        <div className="space-y-2">
                            <a 
                                href="https://www.pathofexile.com/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block text-gray-400 hover:text-orange-400 transition-colors"
                            >
                                Path of Exile Official Site
                            </a>
                            <a 
                                href="https://www.pathofexile.com/forum" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block text-gray-400 hover:text-orange-400 transition-colors"
                            >
                                Official Forums
                            </a>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
                        <div className="space-y-2">
                            <Link href="/privacy-policy" className="block text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</Link>
                            <Link href="/terms-and-conditions" className="block text-gray-400 hover:text-orange-400 transition-colors">Terms and Conditions</Link>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: 'var(--border-dark)' }}>
                    <p className="text-gray-500 text-sm">© 2025 PoE 3.27 Guide. All rights reserved.</p>
                    <p className="text-gray-600 text-xs mt-2">This is a fan site, not official. Path of Exile is a trademark of Grinding Gear Games.</p>
                </div>
            </div>
        </footer>
    );
}

