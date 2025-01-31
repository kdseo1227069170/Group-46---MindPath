import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const TwoFASetup = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const enableTwoFA = async () => {
      try {
        // Get userId from the decoded JWT token
        const token = localStorage.getItem('token');  // Or wherever you store the JWT
        if (!token) {
          setError('User not logged in');
          return;
        }
        const decoded = jwt_decode(token);  // Decode the JWT to get the user info
        const userId = decoded.userId;  
		
		
        const response = await axios.post('/api/auth/enable2FA', { userId });
        setQrCodeUrl(response.data.otpauthUrl); 
      } catch (err) {
        setError('Failed to enable 2FA');
      }
    };

    enableTwoFA(); 
  }, []); 

  return (
    <div>
      <h2>Enable 2FA</h2>
      {qrCodeUrl ? (
        <div>
          <h3>Scan this QR code with Google Authenticator:</h3>
          <img src={qrCodeUrl} alt="QR Code for Google Authenticator" />
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TwoFASetup;
