import React from 'react';

const CrisisSupportPage = () => {
    return (
        <div style={styles.pageContainer}>
            <h1>Mental Health Support</h1>
            <p>
                If you are in crisis, there are services available to help.
                This page offers information and resources for mental health support in Canada.
            </p>

            <section style={styles.section}>
                <h2>If you or someone you know is in crisis</h2>
                <p>If you're in immediate danger or need urgent medical support, call 9-1-1.</p>
                <p>If you or someome you know is thinking about suicide, call or text 9-8-8. Support is available
                    24/7.</p>
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
        padding: '80px 20px 20px',
    },
};

export default CrisisSupportPage;