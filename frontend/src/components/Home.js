// src/components/Home.js
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a data fetch with a 3-second delay
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <h1>Welcome to MindPath</h1>
            <p>Navigate through the various tabs to seek the help you need, today.</p>
        </div>
    );
};

export default Home;
