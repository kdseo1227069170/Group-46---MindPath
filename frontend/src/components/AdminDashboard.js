import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);

    // Fetch the data from the backend
    useEffect(() => {
        fetch('/api/admin/dashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Might need token for admin access
            }
        })
            .then(res => res.json())
            .then(data => setDashboardData(data))
            .catch(err => console.error('Error fetching dashboard data:', err));
    }, []);

    // For handling loading state:
    if (!dashboardData) {
        return <div>Loading...</div>;
    }

    // Bar chart to display total users and # of total searches
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

    // Line Chart to display how many searches per day
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

    // Bar Chart to display popular search terms
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
