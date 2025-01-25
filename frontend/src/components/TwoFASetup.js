import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';

const TwoFASetup = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const enableTwoFA = async () => {
      try {
        // Replace 'userId' dynamically with actual logged-in user information
        const userId = 'REPLACE_WITH_USER_ID'; // Replace with the actual user ID dynamically
        const response = await axios.post('/api/auth/enable2FA', { userId });
        setQrCodeUrl(response.data.otpauthUrl); // Store the QR code URL from the response
      } catch (err) {
        setError('Failed to enable 2FA');
      }
    };

    enableTwoFA(); // Call the function inside useEffect
  }, []); // Empty dependency array ensures it runs once on component mount

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
