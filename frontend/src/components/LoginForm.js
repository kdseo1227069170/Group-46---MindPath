import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '', 
    password: '',
  });

  const [isFormClosed, setIsFormClosed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); 
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
  
  // Clear form data when the component mounts
  useEffect(() => {
    setFormData({
      username: '',
      password: '',
    });
  }, []);
  
  const handleClose = () => {
	
	setIsFormClosed(true);
    if (onClose) {
      onClose(); // Maintain existing behavior
    }
    navigate('/'); // Redirect to main page
  };

  if (isFormClosed) {
    return null; // Render nothing when the form is closed
  }

  return (
    <div className="login-form-container">
	  <div className="login-form-header">
        <h2>Login</h2>
        <button className="close-button" onClick={handleClose}>X</button>
      </div>
      
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
		{errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error if any */}
      </form>
    </div>
  );
};

export default LoginForm;
