import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/landing.scss';

const LandingPage = () => {
    const [isLightMode, setIsLightMode] = useState(false);
    // 🔥 Add state for the modals
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        if (document.body.classList.contains('light-mode')) {
            setIsLightMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isLightMode) {
            document.body.classList.remove('light-mode');
            setIsLightMode(false);
        } else {
            document.body.classList.add('light-mode');
            setIsLightMode(true);
        }
    };

    // 🔥 Modal Content Data
    const modalContent = {
        privacy: {
            title: "Privacy Policy",
            body: "At InterviewAI, your privacy is our priority. We only use your resume and job description data to generate your custom interview strategy. We do not sell your personal information to third parties. Uploaded files are processed securely and discarded after your session."
        },
        terms: {
            title: "Terms of Service",
            body: "By using InterviewAI, you agree to utilize our platform for personal career development. The AI-generated strategies are for preparational purposes and do not guarantee employment. Please do not upload sensitive or classified company information into the job description field."
        },
        help: {
            title: "Help Center",
            body: "Need help getting started? \n\n1. Ensure your resume is in PDF or DOCX format (Max 5MB).\n2. Paste the full job description into the text area.\n3. Click 'Generate' and wait roughly 30 seconds for the AI to analyze your match.\n\nIf you experience quota errors, please wait a few minutes and try again."
        }
    };

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="landing-nav">
                <Link to="/" className="nav-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src="/icon.png" alt="InterviewAI Logo" className="brand-icon" />
                    <span>InterviewAI</span>
                </Link>

                <div className="nav-actions">
                    <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
                        {isLightMode ? '🌙' : '☀️'}
                    </button>

                    <div className="nav-links">
                        <Link to="/login" className="nav-login-btn">Login</Link>
                        <Link to="/register" className="nav-signup-btn">Free Account</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-content">
                    <h1>AI Interview Strategy Builder (Fast, Easy, & Free)</h1>
                    <p>
                        Land your next job with the ultimate AI interview prep tool. Work from your computer
                        to generate tailored behavioral questions, technical screening answers, and a day-by-day
                        preparation plan based on your exact resume and job description.
                    </p>

                    <div className="hero-ctas">
                        <Link to="/register" className="cta-btn secondary">
                            Import your resume
                        </Link>
                        <Link to="/register" className="cta-btn primary">
                            Create my strategy
                        </Link>
                    </div>

                    <div className="hero-trust-badge">
                        <span className="sparkle-icon">✨</span>
                        <p><strong>Let AI do the work!</strong> Describe your role, and we'll generate tailored content for your interview.</p>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="mockup-card">
                        <div className="mockup-header">
                            <div className="mockup-score-circle">85%</div>
                            <div className="mockup-title">
                                <h3>Senior System Engineer</h3>
                                <p>TechCorp • Remote</p>
                            </div>
                        </div>
                        <div className="mockup-body">
                            <div className="mockup-section">
                                <p className="section-label">Analyzed Skills</p>
                                <div className="mockup-tags">
                                    <span className="tag matched">React</span>
                                    <span className="tag matched">Node.js</span>
                                    <span className="tag gap">System Design</span>
                                </div>
                            </div>
                            <div className="mockup-section">
                                <p className="section-label">Top Behavioral Question</p>
                                <div className="mockup-question">
                                    <p>"Tell me about a time you had to optimize a complex application. What was the impact?"</p>
                                </div>
                            </div>
                        </div>
                        <div className="floating-badge">
                            ⚡ Get hired 2x faster
                        </div>
                    </div>
                </div>
            </header>

            {/* Social Proof */}
            <section className="social-proof">
                <p>Our customers have been hired by:</p>
                <div className="brand-logos">
                    <span className="brand">amazon</span>
                    <span className="brand">Microsoft</span>
                    <span className="brand">Google</span>
                    <span className="brand">Accenture</span>
                    <span className="brand">TCS</span>
                </div>
            </section>

            {/* Tailored experience */}
            <section className="tailored-section">
                <div className="section-container">
                    <h2>AI-Powered, Tailored Strategy</h2>
                    <p className="section-sub">
                        Your preparation is only as good as the analysis. We don't use generic question banks.
                        Our AI analyzes the <strong>exact</strong> Job Description, Resume, and Self-Description.
                    </p>
                    <div className="tailored-grid">
                        <div className="tailored-item">
                            <span className="icon">🎯</span>
                            <h4>Unique Behavioral Prep</h4>
                            <p>Get situation-specific behavioral questions tailored to your experience and the role's competencies.</p>
                        </div>
                        <div className="tailored-item">
                            <span className="icon">🛠️</span>
                            <h4>Role-Specific Technical Qs</h4>
                            <p>Master technical screenings with questions focused precisely on the tech stack and tools required.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Benefits */}
            <section className="benefits-section">
                <div className="section-container">
                    <h2>Why Choose InterviewAI?</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <span className="icon">📅</span>
                            <h4>DAY BY DAY PREP PLAN</h4>
                            <p>Receive a structured 1-7 day plan so you always know what to focus on next.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">⚠️</span>
                            <h4>SKILL GAP ANALYSIS</h4>
                            <p>AI instantly highlights missing skills, enabling you to address gaps proactively.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">👍</span>
                            <h4>CONFIDENCE BOOST</h4>
                            <p>Enter your interview feeling prepared, knowing you have a strategy for any question.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="final-cta">
                <Link to="/register" className="final-cta-btn">
                    Create My Interview Strategy Now
                </Link>
            </section>

            {/* Footer */}
            <footer className='landing-footer'>
                <div className="footer-links">
                    {/* 🔥 Updated these links to open the modals */}
                    <button onClick={() => setActiveModal('privacy')} className="footer-btn">Privacy Policy</button>
                    <button onClick={() => setActiveModal('terms')} className="footer-btn">Terms of Service</button>
                    <button onClick={() => setActiveModal('help')} className="footer-btn">Help Center</button>
                </div>
                <p className="text-sm text-gray-400 mt-8 text-center">
                    © 2026 InterviewAI. Designed & Developed by <a href="https://www.linkedin.com/in/kusal-dey-b938a0241" target="_blank" rel="noopener noreferrer" className="hover:text-white underline transition-colors">Kusal Dev</a>.
                </p>
            </footer>

            {/* 🔥 The Modal Component */}
            {activeModal && (
                <div className="info-modal-overlay" onClick={() => setActiveModal(null)}>
                    <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{modalContent[activeModal].title}</h3>
                            <button className="close-btn" onClick={() => setActiveModal(null)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            {modalContent[activeModal].body.split('\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button className="cta-btn primary" onClick={() => setActiveModal(null)}>Got it</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default LandingPage;