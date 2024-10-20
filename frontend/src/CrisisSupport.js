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
        textAlign: 'center',
        padding: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#ff3333',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default CrisisSupport;