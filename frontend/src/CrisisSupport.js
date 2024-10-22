import React from 'react';

// This is the CrisisSupport component
const CrisisSupport = () => {
    // Routes to Canadian crisis page
    const handleCrisisSupportClick = () => {
        window.open('https://www.canada.ca/en/public-health/services/mental-health-services/mental-health-get-help.html', '_blank');
    };

    return (
        <div style={styles.container}>
            <h1>Need Immediate Crisis Support?</h1>
            <p>
                If you are in crisis and need urgent mental health support,
                click the button below to access emergency services in Canada.
            </p>
            <button style={styles.button} onClick={handleCrisisSupportClick}>
                Get Crisis Support Now
            </button>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        bottom: '0',
        right: '0',
        backgroundColor: '#c7c4c4',
        margin: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        zIndex: 1000,
        width: '250px',
        fontSize: '12px',
        textAlign: 'right',
        padding: '10px',
    },
    heading: {
        fontSize: '8px',
        marginBottom: '5px',
    },
    text: {
        fontSize: '6px',
        marginBottom: '10px',
    },
    button: {
        padding: '6px 12px',
        fontSize: '12px',
        backgroundColor: '#ff3333',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        alignSelf: 'flex-end',
    },
};

export default CrisisSupport;