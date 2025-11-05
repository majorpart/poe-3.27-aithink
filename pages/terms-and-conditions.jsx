import SEOHead from '../components/SEOHead';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AdSense from '../components/AdSense';
import Link from 'next/link';

export async function getServerSideProps(context) {
    return {
        props: {}
    };
}

export default function TermsAndConditionsPage() {
    const siteUrl = 'https://poe327.aithink.app';
    
    return (
        <>
            <SEOHead
                title="Terms and Conditions - PoE 3.27 Guide | poe327.aithink.app"
                description="Terms and Conditions for PoE 3.27 Guide - Read our terms of service and usage policies for our Path of Exile 3.27 guide website."
                url="/terms-and-conditions"
                keywords="terms and conditions, PoE 3.27 guide, terms of service, usage policies, Path of Exile 3.27"
                canonical={`${siteUrl}/terms-and-conditions`}
            />
            <Navigation />
            
            {/* Main Content */}
            <main className="pt-16" style={{ backgroundColor: 'var(--primary-bg)' }}>
                {/* Hero Section */}
                <section className="py-16" style={{ backgroundColor: 'var(--primary-bg)' }}>
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                            Terms and Conditions
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 fade-in">
                            Terms of service and usage policies for our Path of Exile 3.27 guide website
                        </p>
                        <p className="text-sm text-gray-500 fade-in">
                            Last updated: January 2025
                        </p>
                    </div>
                </section>

                {/* Terms and Conditions Content */}
                <section className="py-16" style={{ backgroundColor: 'var(--primary-bg)' }}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="prose prose-lg" style={{ color: '#e0e0e0' }}>
                                <h1 style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #ff6600', paddingBottom: '0.5rem' }}>
                                    Terms and Conditions for PoE 3.27 Guide
                                </h1>
                                
                                <p>
                                    Welcome to PoE 3.27 Guide. These Terms and Conditions ("Terms") govern your use of our website providing guides, articles, and content related to Path of Exile 3.27 "Keepers of the Flame" ("Service") operated by PoE 3.27 Guide ("we," "us," or "our"). By accessing or using our Service, you agree to be bound by these Terms.
                                </p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
                                
                                <p>By accessing and using this Service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this Service.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>2. Description of Service</h2>
                                
                                <p>PoE 3.27 Guide is an online fan website that provides guides, articles, and educational content related to Path of Exile 3.27 "Keepers of the Flame". Our Service includes:</p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}>Comprehensive guides for PoE 3.27 mechanics and features</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Blog articles analyzing game systems and strategies</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Information about Breach modernization, Genesis Tree, Graft system, and other new content</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Build guides and class balance analysis</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Economic forecasts and trading system guides</li>
                                </ul>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>3. Disclaimer</h2>
                                
                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>3.1 Fan Site</h3>
                                <p>PoE 3.27 Guide is an independent fan website and is not affiliated with, endorsed by, or associated with Grinding Gear Games or Path of Exile. This website is created by fans, for fans, and all content is provided for informational and educational purposes only.</p>

                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>3.2 Game Information</h3>
                                <p>The information provided on this website is based on publicly available information, game mechanics analysis, and community knowledge. While we strive for accuracy, game mechanics may change, and we cannot guarantee that all information is up-to-date or completely accurate.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>4. Acceptable Use</h2>
                                
                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>4.1 Permitted Uses</h3>
                                <p>You may use our Service to:</p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}>Read and access guides and articles for your personal use</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Share links to our content with others</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Use information for personal gameplay improvement</li>
                                </ul>

                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>4.2 Prohibited Uses</h3>
                                <p>You agree not to use our Service for:</p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}>Any unlawful purpose or in violation of any laws</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Attempting to gain unauthorized access to our systems</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Interfering with or disrupting the Service</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Using automated systems (bots, scrapers) to access the Service without permission</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Copying, reproducing, or redistributing our content for commercial purposes without authorization</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Using our content to create competing services</li>
                                </ul>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>5. Intellectual Property Rights</h2>
                                
                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>5.1 Our Content</h3>
                                <p>The Service and its original content, features, and functionality are owned by PoE 3.27 Guide and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>

                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>5.2 Path of Exile Content</h3>
                                <p>Path of Exile, including all game content, names, logos, and trademarks, is the property of Grinding Gear Games. We use such content under fair use for educational and informational purposes. All rights to Path of Exile belong to Grinding Gear Games.</p>

                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>5.3 User Content</h3>
                                <p>If you submit content to our Service (such as comments or feedback), you grant us a non-exclusive, royalty-free, worldwide license to use, modify, and display such content for the purpose of providing and improving our Service.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>6. Privacy and Data Protection</h2>
                                
                                <p>Your privacy is important to us. Our collection and use of personal information is governed by our <Link href="/privacy-policy" style={{ color: '#ff6600', textDecoration: 'none', transition: 'color 0.3s ease' }} className="hover:text-orange-400">Privacy Policy</Link>, which is incorporated into these Terms by reference.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>7. Disclaimers and Limitations of Liability</h2>
                                
                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>7.1 Service Availability</h3>
                                <p>We strive to maintain the availability of our Service, but we do not guarantee uninterrupted access. The Service is provided "as is" and "as available" without warranties of any kind.</p>

                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>7.2 Content Accuracy</h3>
                                <p>While we strive to provide accurate and helpful information, we cannot guarantee the accuracy, completeness, or suitability of all content for your specific needs. Game mechanics and information may change, and strategies may not work for all players or situations.</p>

                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>7.3 Limitation of Liability</h3>
                                <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of the Service.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>8. Indemnification</h2>
                                
                                <p>You agree to indemnify and hold harmless PoE 3.27 Guide and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising out of or relating to your use of the Service or violation of these Terms.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>9. Modifications to Service</h2>
                                
                                <p>We reserve the right to modify, suspend, or discontinue the Service, or any part thereof, at any time with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>10. Changes to Terms</h2>
                                
                                <p>We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>11. Termination</h2>
                                
                                <p>We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>12. Governing Law</h2>
                                
                                <p>These Terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>13. Dispute Resolution</h2>
                                
                                <p>Any disputes arising out of or relating to these Terms or the Service shall be resolved through good faith negotiation. If a resolution cannot be reached, disputes may be resolved through appropriate legal channels.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>14. Severability</h2>
                                
                                <p>If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>15. Entire Agreement</h2>
                                
                                <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and PoE 3.27 Guide regarding the use of the Service.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>16. Contact Information</h2>
                                
                                <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Email:</strong> <a href="mailto:support@poe327.aithink.app" style={{ color: '#ff6600', textDecoration: 'none', transition: 'color 0.3s ease' }} className="hover:text-orange-400">support@poe327.aithink.app</a></li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Website:</strong> <Link href="https://poe327.aithink.app" style={{ color: '#ff6600', textDecoration: 'none', transition: 'color 0.3s ease' }} className="hover:text-orange-400">https://poe327.aithink.app</Link></li>
                                </ul>

                                <blockquote style={{ borderLeft: '4px solid #ff6600', paddingLeft: '1rem', margin: '1.5rem 0', fontStyle: 'italic', color: '#e0e0e0' }}>
                                    <p><strong style={{ color: '#ffffff', fontWeight: 600 }}>Important Notice:</strong> These Terms and Conditions are designed to protect both you and us while ensuring a positive experience with our PoE 3.27 Guide website. Please read them carefully and contact us if you have any questions. Remember, this is a fan site and is not affiliated with Grinding Gear Games or Path of Exile.</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <AdSense />
            <Footer />
        </>
    );
}

