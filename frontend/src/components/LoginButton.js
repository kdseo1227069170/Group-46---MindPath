// src/components/LoginButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); 
    };

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleLoginClick}>
                Login
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
        backgroundColor: '#007bff', 
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default LoginButton;
