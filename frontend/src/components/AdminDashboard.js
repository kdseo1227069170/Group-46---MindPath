import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './AdminDashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true); // Handle loading state
    const [error, setError] = useState(null); // Handle error state

    // Fetch data function
    const fetchDashboardData = async () => {
        setLoading(true); // Show loading spinner
        setError(null); // Reset any previous errors

        try {
            const token = localStorage.getItem('adminToken'); // Use stored token if needed
            const response = await axios.get('/api/admin/dashboard', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Add token if backend needs it
                },
            });
            setDashboardData(response.data); // Update with refreshed data
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    // Bar chart for Total Users and Searches
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

    // Line Chart for Searches Per Day
    const searchesPerDayData = {
        labels: dashboardData.searchesPerDay.map(search => search._id), // Dates
        datasets: [
            {
                label: 'Searches Per Day',
                data: dashboardData.searchesPerDay.map(search => search.totalSearches),
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Bar Chart for Popular Searches
    const popularSearchesData = {
        labels: dashboardData.popularSearches.map(search => search._id), // Search terms
        datasets: [
            {
                label: 'Popular Search Terms',
                data: dashboardData.popularSearches.map(search => search.count),
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>

            {/* Refresh Data Button */}
            <button onClick={fetchDashboardData} style={{ marginBottom: '20px' }}>
                Refresh Data
            </button>

            {/* Bar Chart for Total Users and Searches */}
            <div className="chart-container" style={{ marginBottom: '50px' }}>
                <h3>Total Users & Searches</h3>
                <Bar data={userAndSearchData} />
            </div>

            {/* Line Chart for Searches Per Day */}
            <div className="chart-container" style={{ marginBottom: '50px' }}>
                <h3>Searches Per Day</h3>
                <Line data={searchesPerDayData} />
            </div>

            {/* Bar Chart for Popular Searches */}
            <div className="chart-container">
                <h3>Popular Search Terms</h3>
                <Bar data={popularSearchesData} />
            </div>
        </div>
    );
};

export default AdminDashboard;