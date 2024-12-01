import React, { useEffect } from 'react';
import axios from 'axios';

const AuthProtectedRequest = () => {
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwtToken');
      
      try {
        const response = await axios.get('http://localhost:5000/api/protected-route', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Protected Data</h1>
      <p>Loading data...</p>
    </div>
  );
};

export default AuthProtectedRequest;
