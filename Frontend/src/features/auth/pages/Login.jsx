import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import "../auth.form.scss";
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { handleLogin, loading, setLoading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // 🔥 Track errors

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await handleLogin({ email, password });
            navigate('/dashboard');
        } catch (err) {
            // 🔥 This ensures you render a string (like "Invalid Password") 
            // instead of the whole Error Object which crashes React.
            setError(err.toString());
        }
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
                    <button className='button primary-button'>Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    );
};

export default Login;