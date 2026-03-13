import React, { useState, useRef, useEffect } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth.js'

const Home = () => {
    // --- AUTH STATE ---
    const { user, handleLogout } = useAuth()
    const [showDropdown, setShowDropdown] = useState(false)

    // --- INTERVIEW STATE ---
    const { loading, generateReport, reports, handleDeleteReport } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")

    const [resumeFile, setResumeFile] = useState(null)
    const [isDragging, setIsDragging] = useState(false)

    const resumeInputRef = useRef()
    const navigate = useNavigate()

    // --- THEME STATE ---
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
            document.body.classList.add('light-mode');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    };

    const loadingSteps = [
        "Analyzing job requirements...",
        "Scanning your profile...",
        "Cross-referencing skills...",
        "Generating behavioral questions...",
        "Drafting preparation plan...",
        "Finalizing your strategy..."
    ];

    // 🔥 ADD THIS: State to track which step we are on
    const [loadingStep, setLoadingStep] = useState(0);

    // 🔥 ADD THIS: Effect to cycle through the steps while loading is true
    useEffect(() => {
        let interval;
        if (loading) {
            interval = setInterval(() => {
                setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
            }, 3500); // Changes text every 3.5 seconds
        } else {
            setLoadingStep(0); // Reset when done
        }
        return () => clearInterval(interval);
    }, [loading]);

    // --- HANDLERS ---
    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setResumeFile(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0])
        }
    }

    const handleGenerateReport = async () => {
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data && data._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <div className="loader-container">
                    {/* Cool Animated Spinner */}
                    <div className="ai-spinner">
                        <div className="inner-circle"></div>
                    </div>
                    <h2>Building Your Strategy</h2>
                    {/* Cycling Text */}
                    <p className="loading-step-text">{loadingSteps[loadingStep]}</p>
                </div>
            </main>
        )
    }

    return (
        <div className='home-page'>

            {/* --- TOP NAVIGATION BAR --- */}
            <nav className="top-navbar">
                <div
                    className="nav-brand"
                    onClick={() => navigate('/')} // 🔥 Changed to '/'
                    style={{ cursor: 'pointer' }}
                    title="Go to Landing Page"
                >
                    <img src="/icon.png" alt="Logo" className="brand-icon" />
                    InterviewAI
                </div>

                {/* 🔥 Wrapped the toggle button and user profile inside nav-actions */}
                <div className="nav-actions">

                    {/* Theme Toggle Button */}
                    <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        )}
                    </button>

                    {/* User Profile */}
                    {user && (
                        <div className="nav-user"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <div className="nav-avatar">
                                {user.username?.charAt(0).toUpperCase()}
                            </div>

                            {showDropdown && (
                                <div className="nav-dropdown">
                                    <div className="nav-dropdown-header">
                                        <div className="dropdown-avatar">
                                            {user.username?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="dropdown-user-details">
                                            <strong>{user.username}</strong>
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <button onClick={onLogout} className="nav-logout-btn">
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {/* Page Header */}
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>

                            <label
                                className='dropzone'
                                htmlFor='resume'
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                style={{
                                    borderColor: resumeFile || isDragging ? "#22c55e" : "",
                                    backgroundColor: resumeFile || isDragging ? "rgba(34, 197, 94, 0.05)" : ""
                                }}
                            >
                                <span className='dropzone__icon'>
                                    {resumeFile ? (
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    )}
                                </span>
                                <p className='dropzone__title'>
                                    {resumeFile ? resumeFile.name : "Click to upload or drag & drop"}
                                </p>
                                <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                <input
                                    ref={resumeInputRef}
                                    onChange={handleFileChange}
                                    hidden
                                    type='file'
                                    id='resume'
                                    name='resume'
                                    accept='.pdf,.docx'
                                />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='generate-btn'
                        disabled={loading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        {loading ? "Analyzing..." : "Generate My Interview Strategy"}
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            <section className='recent-reports'>
                <h2>My Recent Interview Plans</h2>

                {reports && reports.length > 0 ? (
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <div className="report-content">
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                                </div>

                                <button
                                    className="delete-report-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm("Are you sure you want to delete this plan?")) {
                                            handleDeleteReport(report._id);
                                        }
                                    }}
                                    title="Delete Plan"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <h3>No Interview Plans Yet</h3>
                        <p>Paste a job description and upload your resume above to generate your first winning strategy!</p>
                    </div>
                )}
            </section>

            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home