import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';

const TwoFASetup = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const enableTwoFA = async () => {
      try {        
        const userId = 'REPLACE_WITH_USER_ID'; 
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
