// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        // Handle logout functionality here
        localStorage.removeItem('jwtToken'); // Clear token from localStorage
        onLogout(); // Update state to reflect the user has logged out
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleLogoutClick}>
                Log Out
            </button>
        </div>
    );
};

const styles = {
    container: {
        marginTop: '25px',
    },
    button: {
        padding: '4px 12px',
        fontSize: '14px',
        backgroundColor: '#ff4444',  // Red color for logout button
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default LogoutButton;
