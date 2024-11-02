import React from 'react';
import {useNavigate} from "react-router-dom";

// This is the CrisisSupport component
const CrisisSupport = () => {
    const navigate = useNavigate();

    // Routes to crisis support page
    const handleCrisisSupportClick = () => {
        navigate('/crisis-support');
    };

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleCrisisSupportClick}>
                Get Crisis Support Now
            </button>
        </div>
    );
};

const styles = {
    // Edit button appearance
    container: {
      marginTop: '25px',
    },
    button: {
        padding: '4px 12px',
        fontSize: '14px',
        backgroundColor: '#ff3333',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default CrisisSupport;