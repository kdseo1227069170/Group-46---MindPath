import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '', // use username instead of email
    password: '',
  });

  const [isFormClosed, setIsFormClosed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(response.data);
      if (response.status === 200) {
		// Store the JWT token in localStorage
        localStorage.setItem('jwtToken', response.data.token);
		
        alert('Login successful!');
        // Clear form after success
        setFormData({
          username: '',
          password: '',
        });
        setIsFormClosed(true);
        if (onClose) {
          onClose();
        }
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed!');
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
          <label>Username:</label>
          <input
            type="text"
            name="username"  // ensure username is used here
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
