import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import "../auth.form.scss";
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const navigate = useNavigate();
    const { loading, handleRegister } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await handleRegister({ username, email, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err);
        }
    };

    if (loading) {
        return (
            <main className="auth-page">
                <div className="form-container auth-progress">
                    <h1>Creating Account</h1>
                    <div className="bar-bg"><div className="bar-fill"></div></div>
                </div>
            </main>
        );
    }

    return (
        <main className="auth-page">
            <div className="form-container">
                <h1>Register</h1>
                {error && <p className="error-message" style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" placeholder='Enter username' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder='Enter email address' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder='Enter password' required />
                    </div>
                    <button className='button primary-button'>Register</button>
                </form>
                <p>Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    );
};

export default Register;