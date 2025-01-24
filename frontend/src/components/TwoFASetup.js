import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';

const TwoFASetup = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const enableTwoFA = async () => {
      try {
        const response = await axios.post('/api/auth/enable2FA', { userId: 'yourUserId' });  // Replace 'yourUserId' with the actual user ID
        setQrCodeUrl(response.data.otpauthUrl);  // Store the QR code URL from the response
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
          <QRCode value={qrCodeUrl} size={256} />
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TwoFASetup;
