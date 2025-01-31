import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const [isFormClosed, setIsFormClosed] = useState(false);
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex = /^\d{10}$/; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      if (!passwordRegex.test(value)) {
        setPasswordError('Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one digit, and one special character.');
      } else {
        setPasswordError('');
      }
    }
	
	if (name === 'phoneNumber') {
      if (!phoneRegex.test(value)) {
        setPhoneNumberError('Please enter a valid phone number (e.g., 1234567890)');
      } else {
        setPhoneNumberError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(response.data);
	  
      if (response.status === 201) {
        alert('Registration successful!');
		
	  
      // Get the QR code URL from the backend response
      setQrCodeUrl(response.data.qrCodeUrl); 

        // Clear form after success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
          phoneNumber: '',
        });
		setTimeout(() => {
		  setIsFormClosed(true);
		  if (onClose) {
			onClose();
		  }
		  navigate('/');  // Redirect to home page
		}, 60000);  // 60 seconds (1 minute)

        
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed!');
    }
  };

  if (isFormClosed) {
    return null; // Render nothing when the form is closed
  }

  return (
    <div className="registration-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
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
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={passwordError}>Register</button>
      </form>
	  
	  {/* Show QR Code after registration */}
    {qrCodeUrl && (
      <div className="qr-code-container">
        <h3>Scan this QR code with Google Authenticator:</h3>
        <img src={qrCodeUrl} alt="QR Code for Google Authenticator" />
      </div>
    )}
    </div>
  );
};

export default RegistrationForm;
