import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

function LoginForm({ closeLoginForm }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle success (store token, close the form, etc.)
                alert('Login successful!');
                localStorage.setItem('authToken', data.token);
                closeLoginForm();  // Close the login form on success
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('Failed to login. Please try again later.');
        }
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <button onClick={closeLoginForm}>Close</button>
        </div>
    );
}

export default LoginForm;
