import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();
    const SESSION_TIMEOUT = 1 * 60 * 1000;
	const inactivityTimeout = useRef(null);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                alert('You are already logged out.');
                return;
            }

            const response = await axios.post('http://localhost:5000/api/auth/logout', 
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
            );

            if (response.status === 200) {
                localStorage.removeItem('jwtToken');
                onLogout();
                alert('Logged out successfully.');
                navigate('/'); // Redirect to login page
            } else {
                //const errorData = await response.json();
                alert(`Logout failed!`); 
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('Something went wrong during logout.');
        }
    };

    useEffect(() => {
        // Handle inactivity-based logout
        const handleInactivityLogout = () => {
            alert('You have been logged out due to inactivity.');
            handleLogout(); // Call the logout function when inactive timeout is reached
        };

        const resetInactivityTimer = () => {
            if (inactivityTimeout.current) {
                clearTimeout(inactivityTimeout.current); // Clear existing timeout if any
            }
            inactivityTimeout.current = setTimeout(handleInactivityLogout, SESSION_TIMEOUT); // Set inactivity timeout
        };

        // Add event listeners to reset inactivity timeout on user interaction
        window.addEventListener('mousemove', resetInactivityTimer);
        window.addEventListener('keypress', resetInactivityTimer);
        window.addEventListener('scroll', resetInactivityTimer);

        resetInactivityTimer(); // Initialize inactivity timer

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('mousemove', resetInactivityTimer);
            window.removeEventListener('keypress', resetInactivityTimer);
            window.removeEventListener('scroll', resetInactivityTimer);
            if (inactivityTimeout) {
                clearTimeout(inactivityTimeout.current); // Clear the timeout on cleanup
            }
        };
    }, [handleLogout, SESSION_TIMEOUT]); // Only handleLogout is required as a dependency

    // Handle logout when browser window/tab is closed
    useEffect(() => {
        const handleBeforeUnload = () => {
            // You can perform actions like cleaning up session data before unload
            localStorage.removeItem('jwtToken'); // Optional, remove token on browser close
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // Empty dependency array for cleanup on mount/unmount

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleLogout}>
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
        color: '#ffffff',  // Changed to white for better contrast
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default LogoutButton;
