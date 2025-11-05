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

export default function PrivacyPolicyPage() {
    const siteUrl = 'https://poe327.aithink.app';
    
    return (
        <>
            <SEOHead
                title="Privacy Policy - PoE 3.27 Guide | poe327.aithink.app"
                description="Privacy Policy for PoE 3.27 Guide - How we collect, use, and protect your information when using our Path of Exile 3.27 guides and content."
                url="/privacy-policy"
                keywords="privacy policy, PoE 3.27 guide, data protection, personal information, Path of Exile 3.27"
                canonical={`${siteUrl}/privacy-policy`}
            />
            <Navigation />
            
            {/* Main Content */}
            <main className="pt-16" style={{ backgroundColor: 'var(--primary-bg)' }}>
                {/* Hero Section */}
                <section className="py-16" style={{ backgroundColor: 'var(--primary-bg)' }}>
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 fade-in">
                            How we collect, use, and protect your information when using our PoE 3.27 guides and content
                        </p>
                        <p className="text-sm text-gray-500 fade-in">
                            Last updated: January 2025
                        </p>
                    </div>
                </section>

                {/* Privacy Policy Content */}
                <section className="py-16" style={{ backgroundColor: 'var(--primary-bg)' }}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="prose prose-lg" style={{ color: '#e0e0e0' }}>
                                <h1 style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #ff6600', paddingBottom: '0.5rem' }}>
                                    Privacy Policy for PoE 3.27 Guide
                                </h1>
                                
                                <p>
                                    At PoE 3.27 Guide, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Path of Exile 3.27 "Keepers of the Flame" guide website and related services.
                                </p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
                                
                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>1.1 Personal Information</h3>
                                <p>
                                    When you use our website to access guides, blog articles, and other content related to Path of Exile 3.27, we may collect the following types of personal information:
                                </p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Contact Information:</strong> Your email address if you choose to contact us or subscribe to updates</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Website Preferences:</strong> Your browsing preferences and content interests related to PoE 3.27 guides</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Communication Data:</strong> Information you provide when contacting us for support or inquiries</li>
                                </ul>

                                <h3 style={{ color: '#ffb84d', fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>1.2 Technical Information</h3>
                                <p>
                                    We automatically collect certain technical information when you visit our website:
                                </p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}>IP address and general location data</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Browser type and version</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Device information and operating system</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Pages visited and time spent on our site</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Referring website information</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Cookies and similar tracking technologies</li>
                                </ul>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
                                
                                <p>We use the collected information for the following purposes:</p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Content Delivery:</strong> To provide you with access to PoE 3.27 guides, blog articles, and related content</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Website Improvement:</strong> To analyze usage patterns and improve our website's functionality and content</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Communication:</strong> To respond to your inquiries and provide customer support</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Analytics:</strong> To understand how visitors use our site and optimize the user experience</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                                </ul>
                        
                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>3. Information Sharing and Disclosure</h2>
                                
                                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and providing our services (such as hosting, analytics, and email services)</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Legal Requirements:</strong> When required by law or to protect our rights and the rights of others</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Consent:</strong> When you have given us explicit consent to share your information</li>
                                </ul>
                        
                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>4. Data Security</h2>
                                
                                <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}>Encryption of data in transit (SSL/TLS)</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Regular security assessments and updates</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Access controls and authentication procedures</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Secure data storage and backup systems</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Employee training on data protection practices</li>
                                </ul>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>5. Data Retention</h2>
                                
                                <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:</p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}>Contact information is retained until you request deletion</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Technical logs are typically retained for 12 months</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Analytics data is aggregated and anonymized</li>
                                </ul>
                        
                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>6. Your Rights and Choices</h2>
                                
                                <p>You have the following rights regarding your personal information:</p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Access:</strong> Request access to your personal information</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Deletion:</strong> Request deletion of your personal information</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Opt-out:</strong> Unsubscribe from communications</li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
                                </ul>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>7. Cookies and Tracking Technologies</h2>
                                
                                <p>We use cookies and similar tracking technologies to enhance your experience on our website, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>8. Third-Party Services</h2>
                                
                                <p>Our website may use third-party services for analytics, hosting, and other functions. These services have their own privacy policies. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>9. International Data Transfers</h2>
                                
                                <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>10. Children's Privacy</h2>
                                
                                <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>11. Changes to This Privacy Policy</h2>
                                
                                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our website after such changes constitutes acceptance of the updated Privacy Policy.</p>

                                <h2 style={{ color: '#ff6600', fontSize: '2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>12. Contact Information</h2>
                                
                                <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
                                <ul style={{ color: '#e0e0e0', marginBottom: '1rem', paddingLeft: '2rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Email:</strong> <a href="mailto:support@poe327.aithink.app" style={{ color: '#ff6600', textDecoration: 'none', transition: 'color 0.3s ease' }} className="hover:text-orange-400">support@poe327.aithink.app</a></li>
                                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffffff', fontWeight: 600 }}>Website:</strong> <Link href="https://poe327.aithink.app" style={{ color: '#ff6600', textDecoration: 'none', transition: 'color 0.3s ease' }} className="hover:text-orange-400">https://poe327.aithink.app</Link></li>
                                </ul>

                                <blockquote style={{ borderLeft: '4px solid #ff6600', paddingLeft: '1rem', margin: '1.5rem 0', fontStyle: 'italic', color: '#e0e0e0' }}>
                                    <p><strong style={{ color: '#ffffff', fontWeight: 600 }}>Note:</strong> This Privacy Policy is designed to be transparent about our data practices. We are committed to protecting your privacy and ensuring that your personal information is handled responsibly and securely. PoE 3.27 Guide is a fan site and is not affiliated with Grinding Gear Games or Path of Exile.</p>
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

