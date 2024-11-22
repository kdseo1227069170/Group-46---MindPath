import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import './LoginForm.css';

const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
	
    const [isFormClosed, setIsFormClosed] = useState(false);
    const navigate = useNavigate();  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                // On successful login
                alert('Login successful!');
                localStorage.setItem('authToken', response.data.token);  // Store the token

                // Clear form data after login
                setEmail('');
                setPassword('');
                setIsFormClosed(true);
				if (onClose) {
				  onClose();
				}
				navigate('/');
            }
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    if (isFormClosed) {
        return null; // Render nothing when the form is closed
    }

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
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default LoginForm;
