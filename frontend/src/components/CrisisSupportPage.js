import React from 'react';

const CrisisSupportPage = () => {
    return (
        <div style={styles.pageContainer}>
            <h1>Get Help with Mental Health Services</h1>
            <p>
                If you are in crisis, there are services available to help.
                This page offers information and resources for mental health support in Canada.
            </p>

            <section>
                <h2>Immediate Crisis Support</h2>
                <p>For immediate assistance, consider contacting:</p>
                <ul>
                    <li>Emergency: <strong>Call 911</strong></li>
                    <li>
                        Talk Suicide Cananda: Call <strong>1-833-456-4566</strong> (24/7)
                        or text <strong>45645</strong> (4pm to Midnight ET)
                    </li>
                    <li>
                        Kids Help Phone (youth support): Call <strong>1-800-668-6868</strong>
                        or text <strong>CONNECT</strong> to <strong>686868</strong>
                    </li>
                </ul>
            </section>

            <section>
                <h2>Additional Support Resources</h2>
                <p>
                    Find a variety of mental health support services in your area or explore more
                    options by visiting local community centers or contacting family doctors.
                </p>
            </section>
        </div>
    );
};

const styles = {
    pageContainer: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
    }
};

export default CrisisSupportPage;