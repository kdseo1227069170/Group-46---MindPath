import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '', 
    password: '',
    twoFACode: '', 
  });

  const [isFormClosed, setIsFormClosed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [is2FARequired, setIs2FARequired] = useState(false);  // Track if 2FA is required
  const [twoFAError, setTwoFAError] = useState('');  // Track 2FA error  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Attempt to log in with username and password
      const response = await axios.post('http://localhost:5000/api/auth/login', { 
		 username: formData.username,
         password: formData.password
      });
	  
	  console.log('Server Response:', response.data); 
      
      if (response.status === 200) {
        // Step 2: If 2FA is required, show the 2FA input field
        //if (response.data.is2FARequired){
		if (response.data.message === "2FA required") {
          setIs2FARequired(true);
          return;  // Wait for the user to input the 2FA code
        }
        
        // If login is successful, and no 2FA required
        localStorage.setItem('jwtToken', response.data.token);
        alert('Login successful!');
        //setFormData({ username: '', password: '', twoFACode: '' });
        //setIsFormClosed(true);
        //if (onClose) onClose();
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
	  
	  if (error.response) {
            console.error('Error Response Data:', error.response.data);
            console.error('Status Code:', error.response.status);
            console.error('Headers:', error.response.headers);

            setErrorMessage(`Login failed: ${error.response.data.message || "Unknown error"}`);
        } else {
            setErrorMessage('Login failed due to a network error.');
        }
      //setErrorMessage('Login failed!');
    }
  };

  const handle2FAVerify = async (e) => {
	
	e.preventDefault();
	
    try {
      // Step 3: Verify 2FA code entered by user
      //const response = await axios.post('http://localhost:5000/api/auth/verify2FA', {
	  const response = await axios.post('http://localhost:5000/api/auth/login', {

        username: formData.username,  
        password: formData.password,
        code: formData.twoFACode.trim(), 
      });
	  
	   console.log('2FA Verification Response:', response.data);

      if (response.status === 200) {
        // If 2FA is verified successfully, store the JWT token and proceed
        localStorage.setItem('jwtToken', response.data.token);
        alert('2FA verification successful!');
        //setFormData({ username: '', password: '', twoFACode: '' });
        //setIsFormClosed(true);
        //if (onClose) onClose();
        navigate('/');
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
	  
      setTwoFAError('Invalid 2FA code. Please try again.');
    }
  };

  // Clear form data when the component mounts
  useEffect(() => {
    setFormData({
      username: '',
      password: '',
      twoFACode: '',
    });
  }, []);
  
  const handleClose = () => {
    setIsFormClosed(true);
    if (onClose) {
      onClose();
    }
    navigate('/');
  };

  if (isFormClosed) {
    return null; // Render nothing when the form is closed
  }

  return (
    <div className="login-form-container">
      <div className="login-form-header">
        <h2>Login</h2>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
      
      <form onSubmit={is2FARequired ? handle2FAVerify : handleSubmit}> {/*{handleSubmit}> */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
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
        
        {is2FARequired && (
          <div className="two-fa-container">
            <label>Enter 2FA Code:</label>
            <input
              type="text"
              name="twoFACode"
              value={formData.twoFACode}
              onChange={handleChange}
              required
            />
            {twoFAError && <p className="error-message">{twoFAError}</p>}
          </div>
        )}

        <button type="submit">{is2FARequired ? 'Verify 2FA' : 'Login'}</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
