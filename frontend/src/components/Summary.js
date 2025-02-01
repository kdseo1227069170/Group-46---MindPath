import React from "react";
import './Summary.css';

const Summary = () => {
    return (
        <div className="summary-container">
            <h2>My Mental Health Journey</h2>

            <div className="summary-section">
                <h3>Past Appointments</h3>
                <p>Review your past sessions with here.</p>
            </div>

            <div className="summary-section">
                <h3>Medication History</h3>
                <p>Track you prescribed medications here.</p>
            </div>

            <div className="summary-section">
                <h3>Progress Notes</h3>
                <p>Monitor your improvement through recorded progress.</p>
            </div>

        </div>
    );
};

export default Summary;