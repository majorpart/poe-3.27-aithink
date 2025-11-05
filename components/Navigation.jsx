import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navigation() {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const isActive = (path) => {
        if (path === '/') {
            return router.pathname === '/';
        }
        return router.pathname.startsWith(path);
    };
    
    return (
        <nav className="fixed top-0 w-full z-50 border-b" style={{ backgroundColor: 'var(--secondary-bg)', borderColor: 'var(--border-dark)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-16 relative">
                    {/* Logo */}
                    <div className="absolute left-0 flex items-center">
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

                    {/* Navigation Links - Centered */}
                    <div className="hidden md:flex space-x-8">
                        <Link 
                            href="/" 
                            className={`transition-colors ${isActive('/') && !isActive('/guides') && !isActive('/blog') ? 'text-orange-500 font-semibold' : 'text-gray-300 hover:text-orange-500'}`}
                            style={{ fontFamily: 'Cinzel, serif' }}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/guides" 
                            className={`transition-colors ${isActive('/guides') ? 'text-orange-500 font-semibold' : 'text-gray-300 hover:text-orange-500'}`}
                            style={{ fontFamily: 'Cinzel, serif' }}
                        >
                            Guides
                        </Link>
                        <Link 
                            href="/blog" 
                            className={`transition-colors ${isActive('/blog') ? 'text-orange-500 font-semibold' : 'text-gray-300 hover:text-orange-500'}`}
                            style={{ fontFamily: 'Cinzel, serif' }}
                        >
                            Blog
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden absolute right-0">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-300 hover:text-orange-500"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-2">
                            <Link 
                                href="/" 
                                className={`transition-colors py-2 ${isActive('/') && !isActive('/guides') && !isActive('/blog') ? 'text-orange-500 font-semibold' : 'text-gray-300 hover:text-orange-500'}`}
                                style={{ fontFamily: 'Cinzel, serif' }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/guides" 
                                className={`transition-colors py-2 ${isActive('/guides') ? 'text-orange-500 font-semibold' : 'text-gray-300 hover:text-orange-500'}`}
                                style={{ fontFamily: 'Cinzel, serif' }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Guides
                            </Link>
                            <Link 
                                href="/blog" 
                                className={`transition-colors py-2 ${isActive('/blog') ? 'text-orange-500 font-semibold' : 'text-gray-300 hover:text-orange-500'}`}
                                style={{ fontFamily: 'Cinzel, serif' }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Blog
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

