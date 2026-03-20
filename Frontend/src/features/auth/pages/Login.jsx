import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router'; // 🔥 Added useLocation
import "../auth.form.scss";
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { handleLogin, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // 🔥 Added to read the URL
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // 🔥 NEW: Check for GitHub token in the URL when the page loads
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlToken = params.get("token");

        if (urlToken) {
            // 1. Save the token to localStorage (how React knows you're logged in)
            localStorage.setItem("token", urlToken);

            // 2. Force a hard reload to the dashboard so your auth context updates
            window.location.href = "/dashboard";
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await handleLogin({ email, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err.toString());
        }
    };

    const handleGithubLogin = () => {
        window.location.href = "http://localhost:3000/api/auth/github";
    };

    if (loading) {
        return (
            <main className="auth-page">
                <div className="form-container auth-progress">
                    <h1>Authenticating</h1>
                    <div className="bar-bg"><div className="bar-fill"></div></div>
                </div>
            </main>
        );
    }

    return (
        <main className="auth-page">
            <div className="form-container">
                <h1>Login</h1>
                {error && <p className="error-message" style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder='Enter email address' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder='Enter password' required />
                    </div>
                    <button type="submit" className='button primary-button'>Login</button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color, #2a3348)' }}></div>
                    <span style={{ margin: '0 10px', color: 'var(--text-muted, #7d8590)', fontSize: '0.85rem', fontWeight: '600' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color, #2a3348)' }}></div>
                </div>

                <button
                    type="button"
                    onClick={handleGithubLogin}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '0.75rem',
                        backgroundColor: '#24292e', color: 'white', border: '1px solid #2a3348', borderRadius: '0.5rem',
                        fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s', marginBottom: '1rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2f363d'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#24292e'}
                >
                    <svg height="20" width="20" viewBox="0 0 16 16" fill="white">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                    Continue with GitHub
                </button>

                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    );
};

export default Login;