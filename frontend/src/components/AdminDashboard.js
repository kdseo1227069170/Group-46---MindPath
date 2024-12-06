import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './AdminDashboard.css';
import axios from 'axios';
const isTestMode = true; //test mode toggle for placeholder data

//Commented out and replaced with a placeholder Feedback form to make a testing environment:
/*const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios
            .get('/api/feedback')
            .then((response) => setFeedbacks(response.data))
            .catch((error) => console.error('Error fetching feedback:', error));
    }, []);

    return (
        <div>
            <h3>User Feedback</h3>
            <ul>
                {feedbacks.map((fb, index) => (
                    <li key={index}>
                        <strong>Rating:</strong> {fb.rating} <br />
                        <strong>Comments:</strong> {fb.comments} <br />
                        <strong>Submitted At:</strong> {new Date(fb.submittedAt).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};*/

//Testing environment with placeholder Feedback form
const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fakeFeedbacks = [
            {
                rating: 5,
                comments: "This app is fantastic! It's really helping me manage my mental health.",
                submittedAt: new Date().toISOString(),
            },
            {
                rating: 4,
                comments: "Great app, but I'd love more features for tracking my progress.",
                submittedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            },
            {
                rating: 3,
                comments: "It's okay, but it could use some improvements in navigation.",
                submittedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            },
        ];
        setFeedbacks(fakeFeedbacks);
    }, []);

    return (
        <div>
            <h3>User Feedback</h3>
            <ul>
                {feedbacks.map((fb, index) => (
                    <li key={index}>
                        <strong>Rating:</strong> {fb.rating} <br />
                        <strong>Comments:</strong> {fb.comments} <br />
                        <strong>Submitted At:</strong> {new Date(fb.submittedAt).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Testing with hardcoded, injected website stats
/*    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('adminToken');
            // Making the API call
            const response = await axios.get('/api/admin/dashboard');
            //{headers: {
            //        'Content-Type': 'application/json',
            //        Authorization: `Bearer ${token}`,
            //    },
            //});

            // Set the dashboard data
            setDashboardData(response.data);

            // Handle cases where data is missing or undefined
            if (!response.data || response.data.totalUsers === undefined) {
                setError('No data available to display.');
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false); // Stop the loading state
        }
    };*/

    const fetchDashboardData = async () => {
        if (isTestMode) {
            const data = {
                totalUsers: 2,
                totalSearches: 10,
                searchesPerDay: [
                    { _id: '2024-11-10', totalSearches: 4 },
                    { _id: '2024-11-11', totalSearches: 6 },
                ],
                popularSearches: [
                    { _id: 'mental health', count: 5 },
                    { _id: 'therapy', count: 3 },
                ],
                activeUsers: 2,
            };
            setDashboardData(data);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('/api/admin/dashboard');
            setDashboardData(response.data);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    const userAndSearchData = {
        labels: ['Total Users', 'Total Searches'],
        datasets: [
            {
                label: 'Dashboard Stats',
                data: [dashboardData.totalUsers, dashboardData.totalSearches],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const searchesPerDayData = {
        labels: dashboardData.searchesPerDay.map((search) => search._id),
        datasets: [
            {
                label: 'Searches Per Day',
                data: dashboardData.searchesPerDay.map((search) => search.totalSearches),
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const popularSearchesData = {
        labels: dashboardData.popularSearches.map((search) => search._id),
        datasets: [
            {
                label: 'Popular Search Terms',
                data: dashboardData.popularSearches.map((search) => search.count),
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={fetchDashboardData} style={{ marginBottom: '20px' }}>
                Refresh Data
            </button>
            <div className="chart-container" style={{ marginBottom: '50px' }}>
                <h3>Total Users & Searches</h3>
                <Bar data={userAndSearchData} />
            </div>
            <div className="chart-container" style={{ marginBottom: '50px' }}>
                <h3>Searches Per Day</h3>
                <Line data={searchesPerDayData} />
            </div>
            <div className="chart-container">
                <h3>Popular Search Terms</h3>
                <Bar data={popularSearchesData} />
            </div>
            <FeedbackList />
        </div>
    );
};

export default AdminDashboard;
